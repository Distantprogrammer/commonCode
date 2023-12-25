<template>
  <el-config-provider :size="size" :locale="zhCn">
    <RouterView />
  </el-config-provider>
</template>

<script setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import useAppStore from './stores/modules/app'

defineOptions({ name: 'App' })

const appStore = useAppStore()
const size = computed(() => appStore.size)
</script>
