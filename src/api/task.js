import { post, get } from './request'

// 前缀
const prefix = `/prod-api/taskModule`

function addTask(params) {
  return post(`${prefix}/task/saveTask`, params)
}
// 任务列表
function getTaskList(params) {
  return post(`${prefix}/task/list?pageNum=${params.page}&pageSize=${params.limit}`, params)
}
// 任务详情
function getTaskDetail(params) {
  return get(`${prefix}/task/${params}`)
}
// 删除任务
function deleteTask(id) {
  return get(`${prefix}/task/deleteTask/${id}`)
}
// 任务排行榜列表
function getTaskStatisticsList(params) {
  return get(`${prefix}/statistics/list`, params)
}
// 任务审核列表
function getTaskExamineList(params) {
  return post(`${prefix}/audit/list?pageNum=${params.page}&pageSize=${params.limit}`, params)
}
// 任务审核详情
function getTaskExaminDetail(params) {
  return post(`${prefix}/audit/getInfo`, params)
}

// 保存审核结果
function saveTaskExamine(params) {
  return post(`${prefix}/audit/saveTaskAudit`, params)
}

// 任务反馈详情
function getTaskFeedbackInfo(params) {
  return post(`${prefix}/audit/getTaskFeedbackInfo`, params)
}
// 任务反馈提交
function saveTaskFeedbackInfo(params) {
  return post(`${prefix}/audit/saveTaskFeedbackInfo`, params)
}
export {
  addTask,
  getTaskList,
  getTaskDetail,
  deleteTask,
  getTaskStatisticsList,
  getTaskExamineList,
  getTaskExaminDetail,
  getTaskFeedbackInfo,
  saveTaskExamine,
  saveTaskFeedbackInfo
}
