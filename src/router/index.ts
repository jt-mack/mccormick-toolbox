import {createRouter, createWebHistory} from 'vue-router'
import type {RouteRecordRaw} from 'vue-router'
import {routes} from "./routes";

export const router = createRouter({
  history: createWebHistory(),
  routes
})

