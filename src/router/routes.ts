import type {RouteRecordRaw} from 'vue-router'


const configRoute: RouteRecordRaw = {
  path: '/config',
  name: 'Config',
  component: () => import('../pages/ConfigPage.vue')

}

export const landRoutes: RouteRecordRaw[] = [
  {
    path: '/land',
    children: [
      {
        path: '',
        name: 'Land',
        component: () => import('../pages/land/index.vue')
      },
      {
        path: ':id',
        name: 'LandDetail',
        component: () => import('../pages/land/id.vue')
      }
    ]
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