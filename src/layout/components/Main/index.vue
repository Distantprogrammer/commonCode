<template>
  <el-main style="position: relative;" class="main_content" :class="{ 'is_scroll': isScroll }">
    <router-view v-slot="{ Component, route }">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive :include="keepAliveStore.keepAliveName">
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
    <div style="transform: translateY(-8%) scale(0.84);overflow: hidden;">
      <div id="subapp-viewport"></div>
    </div>
  </el-main>
</template>

<script setup>
import useKeepAliveStore from '@/stores/modules/keep-alive'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
defineOptions({ name: 'AppLayoutMain' })

const keepAliveStore = useKeepAliveStore()
const isScroll = computed(() => {
  return !(route?.meta?.overflow === 'hidden')
})
</script>
<style lang="scss" scoped>
.main_content {
  overflow: hidden;
  &.is_scroll {
    overflow-y: auto;
  }
}
</style>
