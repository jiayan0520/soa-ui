import { post, get } from '@/utils/request'

// 前缀
const prefix = `/taskModule`

function addTask(params) {
  return post(`${prefix}/task`, params)
}
// 任务排行榜列表
function getTaskStatisticsList(params) {
  return get(`${prefix}/statistics/list`, params)
}

export {
  addTask,
  getTaskStatisticsList
}
