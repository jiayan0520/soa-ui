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
  // 分配
  {
    path: '/dorm/allocate',
    name: 'allocate',
    component: () => import('@/views/app/dorm/unallocated/dorm-allocate')
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
    name: 'bed-auth-checkman',
    component: () => import('@/views/app/dorm/bed-qrcode/bed-auth-checkman')
  },
  // 宿舍导入
  {
    path: '/dorm/import',
    name: 'dormImport',
    component: () => import('@/views/app/dorm/dormImport')
  },
  // 评分榜
  {
    path: '/dorm/rank',
    name: 'dormRank',
    component: () => import('@/views/app/dorm/checkRank')
  },
  // 检查列表
  {
    path: '/dorm/check-list',
    name: 'dormCheckList',
    component: () => import('@/views/app/dorm/checkList')
  },
  // 活动室
  {
    path: '/aroom',
    name: 'aroom',
    component: () => import('@/views/app/aroom')
  },
  // 活动室详情，包括学生扫码申请页
  {
    path: '/aroom/detail',
    name: 'aroomDetail',
    component: () => import('@/views/app/aroom/aroom-detail')
  },
  // 活动室审核列表
  {
    path: '/aroom/audit',
    name: 'aroomAuditList',
    component: () => import('@/views/app/aroom/aroomAudit')
  },
  // 活动室审核页面
  {
    path: '/aroom/audit/detail',
    name: 'aroomAudit',
    component: () => import('@/views/app/aroom/aroomAudit/aroom-audit-detail')
  },
  {
    path: '/dorm-count',
    name: 'dormCount',
    component: () => import('@/views/app/dorm/dormCount/index')
  }
]
