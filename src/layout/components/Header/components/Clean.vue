<template>
  <div class="widget-wrapper" @click="clean">
    <SvgIcon color="var(--el-text-color-regular)" icon="clean" size="24px" />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import SvgIcon from '@/components/SvgIcon/index.vue'

defineOptions({ name: 'AppClean' })

const { t } = useI18n()

const clean = () => {
  ElMessageBox.confirm(
    t('message_box.clean'),
    t('common.tips'),
    {
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
      buttonSize: 'default'
    }
  )
  .then(() => {
    localStorage.removeItem('keep-alive')
    localStorage.removeItem('tags-view')
    localStorage.removeItem('layout')
    localStorage.removeItem('app')
    location.reload()
  })
  .catch(() => {})
}
</script>
