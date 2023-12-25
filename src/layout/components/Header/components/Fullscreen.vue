<template>
  <div class="widget-wrapper" @click="toggle">
    <SvgIcon color="var(--el-text-color-regular)" :icon="icon" size="24px" />
  </div>
</template>

<script setup>
import { useFullscreen } from '@vueuse/core'
import SvgIcon from '@/components/SvgIcon/index.vue'

defineOptions({ name: 'AppFullscreenSwitch' })

const { isFullscreen, toggle } = useFullscreen()

const icon = computed(() => isFullscreen.value ? 'fullscreen-exit' : 'fullscreen')
</script>
