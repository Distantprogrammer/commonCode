<template>
  <div class="header-wrapper">
    <div class="tool-wrapper__left">
      <Collapse class="mr20" />
      <Breadcrumb />
    </div>
    <div class="tool-wrapper__right">
      <Welcome />
      <el-divider direction="vertical"></el-divider>
      <ThemeMode class="mr15" />
      <Translate class="mr15" />
      <ElementSize class="mr15" />
      <Skin class="mr15" />
      <Fullscreen />
      <el-divider direction="vertical"></el-divider>
      <Clean class="mr15" />
      <Logout />
    </div>
  </div>
  <TagsView v-if="showTagsView" />
</template>

<script setup>
import Collapse from './components/Collapse.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import TagsView from './components/TagsView.vue'
import Fullscreen from './components/Fullscreen.vue'
import ThemeMode from './components/ThemeMode.vue'
import Translate from './components/Translate.vue'
import Skin from './components/Skin.vue'
import ElementSize from './components/ElementSize.vue'
import Logout from './components/Logout.vue'
import Clean from './components/Clean.vue'
import Welcome from './components/Welcome.vue'

defineOptions({ name: 'AppLayoutHeader '})

const showTagsView = inject('showTagsView')
</script>

<style lang="scss" scoped>
.tool-wrapper__left, .tool-wrapper__right {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.el-divider {
  margin: 0 15px;
}

</style>
