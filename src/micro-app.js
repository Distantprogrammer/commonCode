import store from './store.js'
const microApps = [
  {
    name: 'sub-react',
    entry: import.meta.env.VITE_APP_SUB_REACT,
    activeRule: '/subapp/sub-react'
  },
  {
    name: 'sub-vue3',
    entry: import.meta.env.VITE_APP_SUB_VUE3,
    activeRule: '/subapp/sub-vue3'
  },
  {
    name: 'sub-html',
    entry: import.meta.env.VITE_APP_SUB_HTML,
    activeRule: '/sub-html'
  },
  // {
  //   name: 'sub-monaco-editor',
  //   entry: import.meta.env.VITE_APP_SUB_MONACOEDITOR,
  //   activeRule: '/sub-monaco-editor'
  // },
  // {
  //   name: 'sub-vue-ts-canvans',
  //   entry: import.meta.env.VITE_APP_SUB_VUE_TS_CANVANS,
  //   activeRule: '/sub-vue-ts-canvans'
  // }
]

const apps = microApps.map(item => {
  return {
    ...item,
    container: '#subapp-viewport', // 子应用挂载的div
    props: {
      routerBase: item.activeRule, // 下发基础路由
      getGlobalState: store.getGlobalState // 下发getGlobalState方法
    }
  }
})

export default apps
