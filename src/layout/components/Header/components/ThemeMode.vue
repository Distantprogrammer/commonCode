<template>
  <div class="widget-wrapper" @click="toggleDark()">
    <SvgIcon color="var(--el-text-color-regular)" :icon="icon" size="24px" />
  </div>
</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core'
import SvgIcon from '@/components/SvgIcon/index.vue'

defineOptions({ name: 'AppThemeModeSwitch' })

const isDark = useDark()
const toggleDark = useToggle(isDark)

const icon = computed(() => isDark.value ? 'night-mode' : 'daytime-mode')
</script>
