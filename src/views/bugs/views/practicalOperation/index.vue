<template>
  <div class="page-wrapper flex-vertical">
    <div class="app-container fill"> 
      <p style="white-space:pre-wrap;" class="test" :title="title">这是test                               百度哈哈镜  </p>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'practicalOperation' })
const title = '这是test                               百度哈哈镜  '
</script>
<style lang="scss" scoped>
.test {
  white-space:pre-wrap;
}
</style>
