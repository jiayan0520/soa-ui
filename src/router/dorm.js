export default [
  {
    path: '/dorm',
    name: 'dorm',
    component: () => import('@/views/app/dorm/index')
  },
  {
    path: '/dormitory-room',
    name: 'dormitoryRoom',
    component: () => import('@/views/app/dorm/dormList/room')
  }
]
