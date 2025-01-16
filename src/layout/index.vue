<template>
  <div class="app-wrapper app-vertical">
    <el-container>
      <el-aside :class="{ 'aside-collapsed': collapsed }">
        <Aside />
      </el-aside>
      <el-container>
        <div class="bg-img" :style="{'background-image':`url(${bgImg})`}">
          <!-- <img :src="bgImg" alt=""> -->
        </div>
        <el-header v-if="showHeader" :class="{ 'has-tags-view': showTagsView }">
          <Header />
        </el-header>
        <Main :class="{ 'show-tags-view': showTagsView }" />
        <el-footer v-if="showFooter"><a href="https://beian.miit.gov.cn">湘ICP备2022020176号-1</a></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import useLayoutStore from '@/stores/modules/layout'
import useAppStore from '@/stores/modules/app'
import Aside from './components/Aside/index.vue'
import Header from './components/Header/index.vue'
import Main from './components/Main/index.vue'
import { start } from "qiankun";
import { useRequire } from '@/hooks/useRequire.js'

defineOptions({ name: 'AppLayoutWrapper' })

const layoutStore = useLayoutStore()
const showHeader = computed(() => layoutStore.showHeader)
const showFooter = computed(() => layoutStore.showFooter)
const showLogo = computed(() => layoutStore.showLogo)
const showTagsView = computed(() => layoutStore.showTagsView)
// const bgImg = ref(useRequire('@/assets/images/container_bg.jpg'))
// console.log(bgImg);
const appStore = useAppStore()
const collapsed = computed(() => appStore.collapsed)
onMounted(() => {
  start({prefetch: 'none'})
})
//provide子组件里将会使用到的数据，为了能更好的追踪数据流向，不要在非layout目录inject这些数据
provide('showLogo', showLogo)
provide('showHeader', showHeader)
provide('showTagsView', showTagsView)
provide('collapsed', collapsed)
</script>

<style lang="scss" scoped>
@use '@/assets/styles/layout.scss';
</style>
