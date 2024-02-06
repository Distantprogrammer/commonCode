<template>
  <div class="page-wrapper flex-vertical">
    <div class="app-container fill">
      <canvas v-if="url" :ref="canvasId" :id="canvasId"></canvas>
    </div>
  </div>
</template>
<script setup>
defineOptions({ name: 'PagePdfPreviewCanvas' })
import { nextTick, onMounted, ref, watch } from 'vue'
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
const { pageNum, scale, url, canvasId } = props
const emit = defineEmits(['getTotal'])

let pdfDoc = null,
  pageRendering = false,
  pageNumPending = null,
  canvas = null,
  ctx = null,
  total = null;

onMounted(() => {
  if (!url) {
    return
  }
  canvas = document.querySelector('#' + canvasId.value)
  ctx = canvas.getContext('2d');
  pdfjsLib.getDocument(url.value).promise.then((pdfDoc_) => {
    pdfDoc = pdfDoc_
    total = pdfDoc.numPages
    emit('getTotal', pdfDoc.numPages)
    nextTick(() => {
      renderPage(pageNum)
    })
  })
})

function renderPage (num) {
  pageRendering = true;
  pdfDoc.getPage(num).then(function (page) {
    const viewport = page.getViewport(scale);
    canvas.height = viewport.height
    canvas.width = viewport.width

    const renderContext = {
      canvasContext: ctx,
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

function queueRenderPage (num) {
  if (pageRendering) {
    pageNumPending = num;
  } else {
    if (1 <= num <= total) {
      renderPage(num);
    }
  }
}

watch(() => [pageNum, scale],
  () => {
    queueRenderPage(pageNum)
  }, {
  deep: true
})
</script>

