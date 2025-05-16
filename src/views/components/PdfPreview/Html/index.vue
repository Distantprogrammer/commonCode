<template>
  <div class="page-wrapper flex-vertical">
    <div class="app-container fill">
      此文件采用的iframe来展示，html请查看源代码
      <iframe :src="iframeUrl" frameborder="0" width="100%" height="100%"></iframe>
    </div>
  </div>
</template>
<script setup>
defineOptions({ name: 'PagePdfPreviewHtml' })
import { ref } from 'vue'
const iframeUrl = new URL('./index.html', import.meta.url).href
</script>

