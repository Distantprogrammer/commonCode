<template>
  <el-scrollbar>
    <el-main style="position: relative;" class="main_content">
      <div class="view-source-btn">
        <!-- <ViewSource></ViewSource> -->
        <!-- <el-button class="btn">查看代码</el-button> -->
      </div>
      <router-view v-slot="{ Component, route }">
        <transition appear name="fade-transform" mode="out-in">
          <keep-alive :include="keepAliveStore.keepAliveName">
            <component :is="Component" :key="route.path" />
          </keep-alive>
        </transition>
      </router-view>
      <div>
        <div id="subapp-viewport"></div>
      </div>
    </el-main>
  </el-scrollbar>
</template>

<script setup>
import useKeepAliveStore from '@/stores/modules/keep-alive'
import ViewSource from '@/components/ViewSource/index.vue'
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

.view-source-btn {
  position: absolute;
  top: 15px;
  right: 15px;

  .btn {
    background: transparent;
    color: #000;
    font-weight: 800;
  }
}
</style>
