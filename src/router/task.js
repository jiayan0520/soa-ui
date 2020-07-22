export default [
  {
    path: '/task-add',
    name: 'taskAdd',
    component: () => import('@/views/app/task/addTask/index')
  },
  {
    path: '/task-add-executor',
    name: 'taskAddExecutor',
    component: () => import('@/views/app/task/addTask/executor')
  },
  {
    path: '/task-child-detail',
    name: 'taskChildDetail',
    component: () => import('@/views/app/task/taskList/childDetail')
  },
  {
    path: '/task-list',
    name: 'taskList',
    component: () => import('@/views/app/task/taskList/index')
  },
  {
    path: '/task-list-feekback',
    name: 'taskFeekback',
    component: () => import('@/views/app/task/taskList/feekBack')
  },
  {
    path: '/task-detail',
    name: 'taskMessage',
    component: () => import('@/views/app/task/taskList/detail')
  },
  {
    path: '/task-message',
    name: 'taskMessage',
    component: () => import('@/views/app/task/taskList/detail')
  },
  {
    path: '/task-receive-detail',
    name: 'taskReceiveDetail',
    component: () => import('@/views/app/task/taskList/receiveDetail')
  },
  {
    path: '/task-single-detail',
    name: 'taskSingleDetail',
    component: () => import('@/views/app/task/taskList/singleDetail')
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
  },
  {
    path: '/task-import',
    name: 'taskImport',
    component: () => import('@/views/app/task/taskImport/index')
  }
]
