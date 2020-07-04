import Vue from 'vue'
import Router from 'vue-router'
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
    }
  ]
})
