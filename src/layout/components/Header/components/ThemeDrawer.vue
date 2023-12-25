<template>
  <el-drawer v-model="value" :title="$t('drawer.skin')" :size="390" append-to-body>
    <div class="flex jc-between ai-center">
      <el-text size="default">{{ $t('layout_setting.show_logo') }}</el-text>
      <el-switch v-model="layoutStore.showLogo"></el-switch>
    </div>
    <div class="flex jc-between ai-center">
      <el-text size="default">{{ $t('layout_setting.show_tags_view') }}</el-text>
      <el-switch v-model="layoutStore.showTagsView"></el-switch>
    </div>
    <div class="flex jc-between ai-center">
      <el-text size="default">{{ $t('layout_setting.show_footer') }}</el-text>
      <el-switch v-model="layoutStore.showFooter"></el-switch>
    </div>
  </el-drawer>
</template> 

<script setup>
import useLayoutStore from '@/stores/modules/layout'

defineOptions({ name: 'AppThemeDrawer' })

const layoutStore = useLayoutStore()

const props = defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  }
})
</script>

<style lang="scss" scoped>
.flex {
  padding: 5px 0;
}
</style>
