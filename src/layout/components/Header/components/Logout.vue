<template>
  <div class="widget-wrapper" @click="logout">
    <SvgIcon color="var(--el-text-color-regular)" icon="logout" size="24px" />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { removeToken } from '@/utils/cookie'

defineOptions({ name: 'AppLogout' })

const router = useRouter()
const { t } = useI18n()

const logout = () => {
  ElMessageBox.confirm(
    t('message_box.logout'),
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
    removeToken()
    location.reload()
    router.replace('/login')
  })
  .catch(() => {})
}
</script>
