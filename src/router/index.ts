import {createRouter, createWebHistory} from 'vue-router'
import type {RouteRecordRaw} from 'vue-router'

const configRoute: RouteRecordRaw = {
  path: '/config',
  name: 'Config',
  component: () => import('../pages/ConfigPage.vue')

}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/land'
  },
  {
    path: '/land',
    name: 'Land',
    component: () => import('../pages/LandPage.vue')
  },
  {...configRoute}
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

