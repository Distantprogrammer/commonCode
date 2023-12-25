export const HOME_URL = '/home'

export const staticRouter = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layout/index.vue'),
    redirect: HOME_URL,
    children: []
  },
  // {
  //   path: '/components',
  //   name: 'PageComponents',
  //   component: () => import('@/views/components/index.vue'),
  //   meta: { title: '组件' },
  //   children: [
  //     {
  //       path: '/components/quickConfigurationForm',
  //       name: 'quickConfigurationForm',
  //       component: () => import('@/views/components/views/QuickConfigurationForm/index.vue'),
  //       meta: { title: '快速配置表单' },
  //       children: [
  //         {
  //           path: '/components/quickConfigurationForm',
  //           name: 'quickConfigurationFormV2',
  //           component: () => import('@/views/components/views/QuickConfigurationForm/vue2.vue'),
  //           meta: { title: 'vue2' }
  //         },
  //         {
  //           path: '/components/quickConfigurationForm',
  //           name: 'quickConfigurationFormV3',
  //           component: () => import('@/views/components/views/QuickConfigurationForm/vue3.vue'),
  //           meta: { title: 'vue3' }
  //         },
  //       ]
  //     },
  //   ]
  // },
  // {
  //   path: '/functions',
  //   name: 'PageFunctions',
  //   component: () => import('@/views/functions/index.vue'),
  //   meta: { title: '方法' },
  //   children: [
  //     {
  //       path: '/functions/tableMemorySelection',
  //       name: 'tableMemorySelection',
  //       component: () => import('@/views/functions/views/TableMemorySelection/index.vue'),
  //       meta: { title: '表格记忆选择' },
  //       children: [
  //         {
  //           path: '/functions/tableMemorySelection',
  //           name: 'tableMemorySelectionV2',
  //           component: () => import('@/views/functions/views/TableMemorySelection/vue2.vue'),
  //           meta: { title: 'vue2' }
  //         },
  //         {
  //           path: '/functions/tableMemorySelection',
  //           name: 'tableMemorySelectionV3',
  //           component: () => import('@/views/functions/views/TableMemorySelection/vue3.vue'),
  //           meta: { title: 'vue3' }
  //         },
  //       ]
  //     }
  //   ]
  // },
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