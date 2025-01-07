import store from './store.js'
console.log(import.meta.env);
const microApps = [
  {
    name: 'sub-react',
    entry: import.meta.env.VITE_APP_SUB_REACT,
    activeRule: '/sub-react'
  },
  {
    name: 'sub-html',
    entry: import.meta.env.VITE_APP_SUB_HTML,
    activeRule: '/sub-html'
  },
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
