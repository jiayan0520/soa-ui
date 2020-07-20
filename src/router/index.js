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
      path: '/author',
      name: 'author',
      component: () => import('@/views/author/index')
    },
    ...task,
    ...dorm
  ]
})
