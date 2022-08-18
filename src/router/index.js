import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'base',
    redirect: 'demo',
    component: () => import('@/views/layout/baseLayout'),
    children: [
      {
        path: 'demo',
        name: 'demo',
        component: () => import('@/views/demo')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/login')
  }
]

const router = new VueRouter({
  routes
})

export default router
