<template>
  <div class="page-wrapper flex-vertical">
    <div class="app-container fill">
      <canvas v-if="url" :ref="canvasId" :id="canvasId"></canvas>
    </div>
  </div>
</template>
<script setup>
defineOptions({ name: 'PagePdfPreviewCanvas' })
import { nextTick, onMounted, ref, toRefs, watch, toRaw } from 'vue'
const { pdfjsLib } = globalThis;
pdfjsLib.GlobalWorkerOptions.workerSrc = '/lib/pdfjs-2.0.943-dist/build/pdf.worker.js';
// pdfjsLib.GlobalWorkerOptions.workerSrc = '/lib/pdfjs-4.0.379/build/pdf.worker.mjs';

const props = defineProps({
  url: {
    type: String,
    default: ''
  },
  canvasId: {
    type: String,
    default: 'the-canvas'
  },
  pageNum: {
    type: Number,
    default: 1
  },
  scale: {
    type: Number,
    default: 1
  }
})
const { pageNum, scale, url, canvasId } = toRefs(props)
const emit = defineEmits(['getTotal'])

const pdfDoc = ref()
const canvas = ref()
const ctx = ref()
const total = ref()

let pageRendering = false,
  pageNumPending = null;

onMounted(() => {
  if (!url.value) {
    return
  }
  canvas.value = document.querySelector('#' + canvasId.value)
  ctx.value = canvas.value.getContext('2d');
  pdfjsLib.getDocument(url.value).promise.then((pdfDoc_) => {
    pdfDoc.value = pdfDoc_
    total.value = pdfDoc.value.numPages
    emit('getTotal', pdfDoc.value.numPages)
    nextTick(() => {
      renderPage(pageNum.value)
    })
  })
})

// 使用pdfDoc原型上的方法需要使用toRaw返回其原始对象
const renderPage = (num) => {
  pageRendering = true;
  toRaw(pdfDoc.value).getPage(num).then(function (page) {
    const viewport = page.getViewport(scale.value);
    // const viewport = page.getViewport({scale:scale.value});
    canvas.value.height = viewport.height
    canvas.value.width = viewport.width

    const renderContext = {
      canvasContext: ctx.value,
      viewport: viewport
    };
    const renderTask = page.render(renderContext);

    renderTask.promise.then(function () {
      pageRendering = false;
      if (pageNumPending !== null) {
        // New page rendering is pending
        renderPage(pageNumPending);
        pageNumPending = null;
      }
    });
  });
}

// 获取文字
function getPageText () {
  return new Promise(function (resolve, reject) {
    toRaw(pdfDoc.value).getPage(pageNum.value).then(function (pdfPage) {
      pdfPage.getTextContent().then(function (textContent) {
        let textItems = textContent.items;
        let finalString = '';
        for (let i = 0; i < textItems.length; i++) {
          let item = textItems[i];
          finalString += item.str + ' ';
        }
        resolve({ finalString, textContent });
      });
    });
  });
}
// 获取图片
function getPageImg () {
  return new Promise(function (resolve, reject) {
    toRaw(pdfDoc.value).getPage(pageNum.value).then(async (pdfPage) => {
      const operators = await pdfPage.getOperatorList();
      const rawImgOperator = operators.fnArray.reduce((acc, curr, i) => {
        if ([pdfjsLib.OPS.paintImageXObject, pdfjsLib.OPS.paintJpegXObject].includes(curr)) {
          acc.push(operators.argsArray[i][0]);
        }
        return acc;
      }, []);
      console.log(rawImgOperator);
      if (rawImgOperator.length === 0) {
        reject('暂无图片')
      }

      const arrApi = rawImgOperator.map((imageName) => {
        return new Promise((resolve2, reject2) => {
          pdfPage.objs.get(imageName, async (image) => {
            const resizeScale = 1 / 4;
            const width = image.width * resizeScale;
            const height = image.height * resizeScale;
            resolve2({
              src: image.src, width, height
            })
            // 2版本无下面的属性
            // const bmp = image.bitmap;
            // const resizeScale = 1 / 4;
            // const width = bmp.width * resizeScale;
            // const height = bmp.height * resizeScale;
            // const canvas = new OffscreenCanvas(width, height);
            // const ctx = canvas.getContext('bitmaprenderer');
            // ctx.transferFromImageBitmap(bmp);
            // const blob = await canvas.convertToBlob();
            // const img = document.body.appendChild(new Image());
            // img.width = width;
            // img.height = height;
            // img.src = URL.createObjectURL(blob);
            // resolve2({
            //   src: URL.createObjectURL(blob), width, height
            // })
          })
        })
      })
      Promise.all(arrApi).then((res) => {
        resolve(res)
      })
      // for (const imageName of rawImgOperator) {
      //   pdfPage.objs.get(imageName, async (image) => {
      //     const resizeScale = 1 / 4;
      //     const width = image.width * resizeScale;
      //     const height = image.height * resizeScale;
      //     resolve({
      //       src: image.src, width, height
      //     })
      //     // 2版本无下面的属性
      //     // const bmp = image.bitmap;
      //     // const resizeScale = 1/4;
      //     // const width = bmp.width * resizeScale;
      //     // const height = bmp.height * resizeScale;
      //     // const canvas = new OffscreenCanvas(width, height);
      //     // const ctx = canvas.getContext('bitmaprenderer');
      //     // ctx.transferFromImageBitmap(bmp);
      //     // const blob = await canvas.convertToBlob();
      //     // const img = document.body.appendChild(new Image());
      //     // img.width = width;
      //     // img.height = height;
      //     // img.src = URL.createObjectURL(blob);
      //     // resolve({
      //     //   src: URL.createObjectURL(blob), width, height
      //     // })

      //   });
      // }
    });
  });
}
const queueRenderPage = (num) => {
  if (pageRendering) {
    pageNumPending = num;
  } else {
    if (1 <= num <= total.value) {
      renderPage(num);
    }
  }
}

watch(() => props,
  () => {
    queueRenderPage(pageNum.value)
  }, {
  deep: true
})
defineExpose({
  getPageText,
  getPageImg
})
</script>

