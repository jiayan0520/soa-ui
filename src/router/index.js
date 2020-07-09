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
    },
    {
      path: '/task-add',
      name: 'taskAdd',
      component: () => import('@/views/app/task/addTask/index')
    },
    {
      path: '/task-child',
      name: 'taskChild',
      component: () => import('@/views/app/task/addTask/child')
    },
    {
      path: '/task-list',
      name: 'taskList',
      component: () => import('@/views/app/task/taskList/index')
    },
    {
      path: '/task-detail',
      name: 'taskDetail',
      component: () => import('@/views/app/task/taskList/detail')
    },
    {
      path: '/task-rank',
      name: 'taskRank',
      component: () => import('@/views/app/task/taskRank/index')
    },
    {
      path: '/task-examine-list',
      name: 'taskExamineList',
      component: () => import('@/views/app/task/taskExamineList/index')
    },
    {
      path: '/task-examine-detail',
      name: 'taskExamineDetail',
      component: () => import('@/views/app/task/taskExamineList/taskExamineDetail')
    }
  ]
})
