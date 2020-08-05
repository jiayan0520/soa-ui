import { post, get } from '@/utils/request'

// 前缀
const prefix = `/taskModule`

function addTask(params) {
  return post(`${prefix}/task`, params)
}
// 任务列表
function getTaskList(params) {
  return get(`${prefix}/task/list`, params)
}
// 任务详情
function getTaskDetail(id) {
  return get(`${prefix}/task/${id}`)
}
// 删除任务
// function deleteTask(ids) {
//   return delete (`${prefix}/task/${ids}`)
// }
// 任务排行榜列表
function getTaskStatisticsList(params) {
  return get(`${prefix}/statistics/list`, params)
}
// 任务审核列表
function getTaskExamineList(params) {
  return get(`${prefix}/audit/list`, params)
}
// 任务审核详情
function getTaskExaminDetail(id) {
  return post(`${prefix}/audit/getInfo`, id)
}
// 保存审核结果
function saveTaskExamine(params) {
  return post(`${prefix}/audit/saveTaskAudit`, params)
}
export {
  addTask,
  getTaskList,
  getTaskDetail,
  // deleteTask,
  getTaskStatisticsList,
  getTaskExamineList,
  getTaskExaminDetail,
  saveTaskExamine
}
