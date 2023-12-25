<template>
  <div class="app-wrapper app-vertical">
    <el-container>
      <el-aside :class="{ 'aside-collapsed': collapsed }">
        <Aside />
      </el-aside>
      <el-container>
        <el-header v-if="showHeader" :class="{ 'has-tags-view': showTagsView }">
          <Header />
        </el-header>
        <Main />
        <el-footer v-if="showFooter">2023 ©️ BASE VUE PROJECT USE VITE.</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import useLayoutStore from '@/stores/modules/layout'
import useAppStore from '@/stores/modules/app'
import Aside from './components/Aside/index.vue'
import Header from './components/Header/index.vue'
import Main from './components/Main/index.vue'

defineOptions({ name: 'AppLayoutWrapper' })

const layoutStore = useLayoutStore()
const showHeader = computed(() => layoutStore.showHeader)
const showFooter = computed(() => layoutStore.showFooter)
const showLogo = computed(() => layoutStore.showLogo)
const showTagsView = computed(() => layoutStore.showTagsView)

const appStore = useAppStore()
const collapsed = computed(() => appStore.collapsed)

//provide子组件里将会使用到的数据，为了能更好的追踪数据流向，不要在非layout目录inject这些数据
provide('showLogo', showLogo)
provide('showHeader', showHeader)
provide('showTagsView', showTagsView)
provide('collapsed', collapsed)
</script>

<style lang="scss" scoped>
@import '@/assets/styles/layout.scss';
</style>
