export default [
  {
    path: '/dorm',
    name: 'dorm',
    component: () => import('@/views/app/dorm')
  },
  {
    path: '/dorm/bedDetail',
    name: 'bedDetail',
    component: () => import('@/views/app/dorm/dormList/bed-detail')
  },
  {
    path: '/dorm-count',
    name: 'dormCount',
    component: () => import('@/views/app/dorm/dormCount/index')
  }
]
