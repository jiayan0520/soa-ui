export default [
  {
    path: '/task/add',
    name: 'taskAdd',
    component: () => import('@/views/app/task/addTask/index')
  },
  {
    path: '/task',
    name: 'taskList',
    component: () => import('@/views/app/task/taskList/index'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/task/edit',
    name: 'taskEdit',
    component: () => import('@/views/app/task/taskList/edit')
  },
  {
    path: '/task/feekback',
    name: 'taskFeekback',
    component: () => import('@/views/app/task/taskList/feedBack')
  },
  {
    path: '/task/detail',
    name: 'taskMessage',
    component: () => import('@/views/app/task/taskList/detail')
  },
  {
    path: '/task-message',
    name: 'taskMessage',
    component: () => import('@/views/app/task/taskList/detail')
  },
  {
    path: '/task/single-detail',
    name: 'taskSingleDetail',
    component: () => import('@/views/app/task/taskList/singleDetail')
  },
  {
    path: '/task/rank',
    name: 'taskRank',
    component: () => import('@/views/app/task/taskRank/index')
  },
  {
    path: '/task/examine',
    name: 'taskExamineList',
    component: () => import('@/views/app/task/taskExamineList/index')
  },
  {
    path: '/task/examine/detail',
    name: 'taskExamineDetail',
    component: () => import('@/views/app/task/taskExamineList/taskExamineDetail')
  },
  {
    path: '/task/import',
    name: 'taskImport',
    component: () => import('@/views/app/task/taskImport/index')
  }
]
