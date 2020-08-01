export default [
  {
    path: '/dorm',
    name: 'dorm',
    component: () => import('@/views/app/dorm')
  },
  // 床位详情页
  {
    path: '/dorm/bedDetail',
    name: 'bedDetail',
    component: () => import('@/views/app/dorm/bedList/bed-detail')
  },
  // 宿舍详情及辅导员以上扫码页
  {
    path: '/dorm/dormDetail',
    name: 'dormDetail',
    component: () => import('@/views/app/dorm/dormList/dorm-detail')
  },
  // 楼栋详情页
  {
    path: '/dorm/floorDetail',
    name: 'floorDetail',
    component: () => import('@/views/app/dorm/floorList/floor-detail')
  },
  // 未分配人员
  {
    path: '/dorm/unallocated',
    name: 'unallocated',
    component: () => import('@/views/app/dorm/unallocated')
  },
  // 调换审核列表
  {
    path: '/dorm/exchange',
    name: 'dormExchange',
    component: () => import('@/views/app/dorm/exchangeDorm')
  },
  // 调换审核页
  {
    path: '/dorm/exchange/detail',
    name: 'dormExchangeDetail',
    component: () => import('@/views/app/dorm/exchangeDorm/change-detail')
  },
  // 床位二维码无权限
  {
    path: '/bed-qrcode/bed-noauth',
    name: 'bed-noauth',
    component: () => import('@/views/app/dorm/bed-qrcode/bed-noauth')
  },
  // 床位二维码学生权限
  {
    path: '/bed-qrcode/bed-auth-self',
    name: 'bed-auth-self',
    component: () => import('@/views/app/dorm/bed-qrcode/bed-auth-self')
  },
  // 床位二维码卫生员权限
  {
    path: '/bed-qrcode/bed-auth-checkman',
    name: 'bed-auth-self',
    component: () => import('@/views/app/dorm/bed-qrcode/bed-auth-checkman')
  },
  {
    path: '/dorm-count',
    name: 'dormCount',
    component: () => import('@/views/app/dorm/dormCount/index')
  }
]
