// 宿舍类型
export const dormTypeEnum = {
  ALLSTUDENT: { label: '学生宿舍' },
  ALLTEACHER: { label: '教师宿舍' }
}
// 床位编码类型
export const bedFormatTypeEnum = {
  LETTER: { label: '字母' },
  NUM: { label: '数字' }
}
// 站外用户类型
export const outUserTypeEnum = {
  DORM_MANAGER: { label: '楼管' },
  MAINTENANCE_WORKER: { label: '维修人员' }
}

// 站外用户类型
export const statusList = [
  { text: '全部状态', value: 'ALL' },
  { text: '正常', value: 'ACTIVATION', class: 'c-success' },
  { text: '未激活', value: 'NOACTIVE', class: 'c-danger' },
  { text: '请假中', value: 'LEAVE', class: 'c-info' }
]
