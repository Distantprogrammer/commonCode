<script setup>
import { ref } from 'vue'
import FileCatalog from './FileCatalog/index.vue'
import MonacoEditor from './MonacoEditor/index.vue'
const props = defineProps({
  treeData: {
    type: Object,
    default: () => []
  }
})
function handleFileSelect(file) {}
</script>

<template>
  <div class="home">
    <div class="file_catalog">
      <FileCatalog @file-select="handleFileSelect" :tree-data="props.treeData" />
    </div>
    <div class="monaco_editor">
      <MonacoEditor />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  display: flex;
  width: 100%;
  height: 100%;
}
.file_catalog {
  display: flex;
}
.monaco_editor {
  flex: 1;
  height: 100%;
}
</style>
