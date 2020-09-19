export const taskStatus = {
  FINISHED: { label: '已完成', type: 'c-success' },
  UNFINISHED: { label: '未完成', type: 'c-warm' },
  FAIL: { label: '任务失败', type: 'c-danger' },
  WAITING: { label: '审核中', type: 'c-warm' }
};
export const examStatus = {
  PASS: { label: '审核通过', type: 'c-success' },
  UNFINISHED: { label: '未完成', type: 'c-warm' },
  FAILED: { label: '审核未通过', type: 'c-danger' },
  WAITING: { label: '审核中', type: 'c-warm' }
};
export const criticalActions = [
  { name: '特急', id: 'EXPRESS' },
  { name: '紧急', id: 'URGENT' },
  { name: '一般', id: 'GENERAL' },
  { name: '不急', id: 'NOT_URGENT' }
];
export const infoActions = [
  { name: '不提醒', id: 'NOT_NOTICE' },
  { name: '截止15分钟', id: 'MINUTE' },
  { name: '截止1小时', id: 'HOUR' },
  { name: '截止3小时', id: 'HOUR3' },
  { name: '截止前1天', id: 'DAY' }
]
export const weightActions = [
  { name: '1.0', id: 'DICFFICULTY1' },
  { name: '1.1', id: 'DICFFICULTY1_1' },
  { name: '1.2', id: 'DICFFICULTY1_2' },
  { name: '1.3', id: 'DICFFICULTY1_3' },
  { name: '1.4', id: 'DICFFICULTY1_4' },
  { name: '1.5', id: 'DICFFICULTY1_5' },
  { name: '1.6', id: 'DICFFICULTY1_6' },
  { name: '1.7', id: 'DICFFICULTY1_7' },
  { name: '1.8', id: 'DICFFICULTY1_8' },
  { name: '1.9', id: 'DICFFICULTY1_9' },
  { name: '2.0', id: 'DICFFICULTY2' }
]

