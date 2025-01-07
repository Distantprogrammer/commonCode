export const HOME_URL = '/home'

export const staticRouter = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layout/index.vue'),
    redirect: HOME_URL,
    children: []
  },
  {
    path: '/login',
    name: 'PageLogin',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录' }
  }
]

export const errorRouter = [
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/error/403/index.vue'),
    meta: { title: 'Page403' }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404/index.vue'),
    meta: { title: 'Page404' }
  }
]

export const notFoundRouter = {
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  redirect: { path: '/404' }
}
