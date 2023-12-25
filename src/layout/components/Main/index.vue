<template>
  <el-main>
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

defineOptions({ name: 'AppLayoutMain' })

const keepAliveStore = useKeepAliveStore()
</script>
