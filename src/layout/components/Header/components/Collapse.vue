<template>
  <div class="widget-wrapper" @click="appStore.collapsedChange">
    <SvgIcon color="var(--el-text-color-regular)" :icon="icon" size="24px" />
  </div>
</template>

<script setup>
import SvgIcon from '@/components/SvgIcon/index.vue'
import useAppStore from '@/stores/modules/app'

defineOptions({ name: 'AppCollapse' })

const collapsed = inject('collapsed')

const appStore = useAppStore()
const icon = computed(() => collapsed.value ? 'collapse-off' : 'collapse-on')
</script>
