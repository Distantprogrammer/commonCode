import 'virtual:svg-icons-register'
import './assets/styles/index.scss'

import { createApp } from 'vue'
import App from './App.vue'
import microApps from './micro-app'
import './permission'
import { createPinia } from 'pinia'
import store from './stores'
import router from './router'
import ElementPlus,{ ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'
import useIcons from './plugins/use-icons'
import i18n from './plugins/use-languages'
const app = createApp(App)
app.use(ElementPlus)
app.use(store)
app.use(router)
app.use(i18n())
app.use(createPinia())

useIcons(app)
app.mount('#app')

// 引入微服务
import { registerMicroApps,addGlobalUncaughtErrorHandler } from 'qiankun'
// 定义loader方法，loading改变时，将变量赋值给App.vue的data中的isLoading
addGlobalUncaughtErrorHandler((err, isMain, isMicro) => {
  ElMessage.error('子应用加载错误')
});
function loader(loading) {
  if (app && app.$children) {
    // app.$children[0] 是App.vue，此时直接改动App.vue的isLoading
    app.$children[0].isLoading = loading
  }
}
console.log(microApps)
// 接入微服务
// 给子应用配置加上loader方法
const apps = microApps.map(item => {
  return {
    ...item,
    loader
  }
})
registerMicroApps(apps, {
  beforeLoad: subApp => {
    console.log('before load subApp.name====>>>>>', subApp.name)
  },
  beforeMount: [
    subApp => {
      console.log('[LifeCycle] before mount %c%s', 'color: green;', subApp.name)
    }
  ],
  afterMount: [
    subApp => {
      console.log('[LifeCycle] after mount %c%s', 'color: green;', subApp.name)
    }
  ],
  afterUnmount: [
    subApp => {
      console.log('[LifeCycle] after unmount %c%s', 'color: green;', subApp.name)
    }
  ]
})
// setDefaultMountApp('/sub-monaco-editor')
// start()
