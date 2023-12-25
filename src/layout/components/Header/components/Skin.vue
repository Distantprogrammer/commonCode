<template>
  <div class="widget-wrapper" @click="visible = true">
    <SvgIcon color="var(--el-text-color-regular)" icon="skin" size="24px" />
    <ThemeDrawer v-model="visible" />
  </div>

</template>

<script setup>
import SvgIcon from '@/components/SvgIcon/index.vue'
import ThemeDrawer from './ThemeDrawer.vue'

defineOptions({ name: 'AppSkin' })

const visible = ref(false)
</script>
