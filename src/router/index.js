import Vue from 'vue'
import Router from 'vue-router'
import task from './task'
import dorm from './dorm'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'app',
      redirect: 'home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/app/index')
    },
    {
      path: '/message',
      name: 'message',
      component: () => import('@/views/message/index')
    },
    {
      path: '/personal',
      name: 'personal',
      component: () => import('@/views/personal/index')
    },
    {
      path: '/exception-401',
      name: 'exception-401',
      component: () => import('@/views/exception-401')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login')
    },
    ...task,
    ...dorm
  ]
})
