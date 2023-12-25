<template>
  <div class="widget-wrapper">
    <el-dropdown @command="handleSizeChange" size="default">
      <span class="el-dropdown-link">
        <SvgIcon color="var(--el-text-color-regular)" icon="element-size" size="24px" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="large" :disabled="size === 'large'">{{ $t('element_size.large') }}</el-dropdown-item>
          <el-dropdown-item command="default" :disabled="size === 'default'">{{ $t('element_size.default') }}</el-dropdown-item>
          <el-dropdown-item command="small" :disabled="size === 'small'">{{ $t('element_size.small') }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import useAppStore from '@/stores/modules/app'
import SvgIcon from '@/components/SvgIcon/index.vue'

defineOptions({ name: 'AppElementSize' })

const { t }  = useI18n()
const appStore = useAppStore()
const size = computed(() => appStore.size)

const handleSizeChange = command => {
  appStore.sizeChange(command)
}
</script>
