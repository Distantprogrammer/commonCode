import router from './router'
import initDynamicRouter from '@/router/modules/dynamic-router'
import NProgress from '@/plugins/use-nprogress'
import useAuthStore from '@/stores/modules/auth'
import { getToken } from '@/utils/cookie'

const white = ['/login','/sub-react','/subapp/sub-react']

// 通过路由守卫开启/关闭页面进度条
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const authStore = useAuthStore()

  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (authStore.dynamicMenuList.length === 0) {
        await initDynamicRouter()
        next({ ...to, replace: true })
      } else {
        next()
      }
    }
  } else {
    if (white.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`)
      NProgress.done()
    }
  }
  // if (getToken()) {
  //   if (to.path === '/login') {
  //     next({ path: '/' })
  //     NProgress.done()
  //   } else {
  //     if (authStore.dynamicMenuList.length === 0) {
  //       await initDynamicRouter()
  //       next({ ...to, replace: true })
  //     } else {
  //       next()
  //     }
  //   }
  // } else {
  //   if (white.includes(to.path)) {
  //     next()
  //   } else {
  //     next(`/login?redirect=${to.fullPath}`)
  //     NProgress.done()
  //   }
  // }
})

router.afterEach(() => {
  NProgress.done()
})

router.onError(() => {
  NProgress.done()
})
