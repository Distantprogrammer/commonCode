<template>
  <el-main style="position: relative;">
    <div class="view-source-btn">
      <!-- <ViewSource></ViewSource> -->
      <el-button class="btn" >查看代码</el-button>
    </div>
    <router-view v-slot="{ Component, route }">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive :include="keepAliveStore.keepAliveName">
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
</template>

<script setup>
import useKeepAliveStore from '@/stores/modules/keep-alive'
import ViewSource from '@/components/ViewSource/index.vue'

defineOptions({ name: 'AppLayoutMain' })

const keepAliveStore = useKeepAliveStore()
</script>
<style lang="scss" scoped>
.view-source-btn{
  position: absolute;
  top: 15px;
  right: 15px;
  .btn{
    background: transparent;
    color: #000;
    font-weight: 800;
  }
}
</style>
