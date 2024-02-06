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
    console.log(pageNum.value);
    toRaw(pdfDoc.value).getPage(pageNum.value).then(function (pdfPage) {
      pdfPage.getTextContent().then(function (textContent) {
        let textItems = textContent.items;
        let finalString = '';
        for (let i = 0; i < textItems.length; i++) {
          let item = textItems[i];
          finalString += item.str + ' ';
        }
        resolve({finalString,textContent});
      });
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
  getPageText
})
</script>

