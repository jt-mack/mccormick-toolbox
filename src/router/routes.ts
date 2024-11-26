import type {RouteRecordRaw} from 'vue-router'


const configRoute: RouteRecordRaw = {
  path: '/config',
  name: 'Config',
  component: () => import('../pages/ConfigPage.vue')

}

const landRoutes: RouteRecordRaw[] = [
  {
    path: '/land',
    name: 'Land',
    component: () => import('../pages/land/index.vue')
  },
  {
    path: '/land/:id',
    name: 'LandDetail',
    component: () => import('../pages/land/id.vue')
  }
];

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/land'
  },
  ...landRoutes,
  {...configRoute}
]