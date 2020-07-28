export default [
  {
    path: '/dorm',
    name: 'dorm',
    component: () => import('@/views/app/dorm')
  },
  {
    path: '/dorm/bedDetail',
    name: 'bedDetail',
    component: () => import('@/views/app/dorm/bedList/bed-detail')
  },
  {
    path: '/dorm/dormDetail',
    name: 'dormDetail',
    component: () => import('@/views/app/dorm/dormList/dorm-detail')
  },
  {
    path: '/dorm/floorDetail',
    name: 'floorDetail',
    component: () => import('@/views/app/dorm/floorList/floor-detail')
  },
  {
    path: '/dorm-count',
    name: 'dormCount',
    component: () => import('@/views/app/dorm/dormCount/index')
  }
]
