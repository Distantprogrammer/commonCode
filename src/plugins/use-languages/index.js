import { createI18n } from 'vue-i18n'
import zhCN from './modules/zh-CN'
import enUS from './modules/en-US'
import useAppStore from '@/stores/modules/app'

const i18n = () => {

  const appStore = useAppStore()
  
  return createI18n({
    legacy: false,
    locale: appStore.language,
    messages: {
      'zh-CN': zhCN,
      'en-US': enUS
    }
  })
}

export default i18n