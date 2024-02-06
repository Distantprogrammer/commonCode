<template>
  <div class="page-wrapper flex-vertical">
    <div class="app-container fill">
      官方封装的hmtl。功能完善
      <iframe :src="'/lib/pdfjs-2.0.943-dist/web/viewer.html?file='+ fileUrl" frameborder="0" width="100%" height="100%"></iframe>
    </div>
  </div>
</template>
<script setup>
defineOptions({ name: 'PagePdfPreviewIframe' })
import { ref } from 'vue'
const fileUrl = ref(new URL('../lib//JavaScript高级程序设计第4版.pdf', import.meta.url).href)

</script>


