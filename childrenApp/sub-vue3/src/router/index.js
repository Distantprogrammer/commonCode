import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/sliderCharts',
    name: 'sliderCharts',
    component: () => import('@/views/components/sliderCharts/index.vue')
  }
]


export default routes
