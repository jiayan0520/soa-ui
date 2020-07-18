export default [
  {
    path: '/dormitory-list',
    name: 'dormitoryList',
    component: () => import('@/views/app/dormitory/dormList/index')
  },
  {
    path: '/dormitory-room',
    name: 'dormitoryRoom',
    component: () => import('@/views/app/dormitory/dormList/room')
  }
]
