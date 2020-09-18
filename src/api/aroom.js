import { post, get, put, del } from './request'

// 前缀
const prefix = `/prod-api/dormmodule`

// 活动室列表
export function getRoomList(params) {
  return post(`${prefix}/room/list`, params)
}
// 获取活动室详情
export function getRoomDetail(params) {
  return get(`${prefix}/room/${params}`)
}
// 新增活动室
export function addRoom(params) {
  return post(`${prefix}/room`, params)
}
// 修改活动室
export function updateRoom(params) {
  return put(`${prefix}/room`, params)
}
// 删除活动室
export function deleteRoom(params) {
  return del(`${prefix}/room/del/`, params)
}
// 申请活动室
export function applyRoom(params) {
  return post(`${prefix}/activityRoomApplication`, params)
}
// 获取活动室申请详情
export function getApplyRoomDetail(params) {
  return get(`${prefix}/activityRoomApplication/${params}`)
}
// 活动室申请列表
export function getApplyRoomList(params) {
  return post(`${prefix}/activityRoomApplication/list`, params)
}
// 活动室申请审核
export function reviewRoom(params) {
  return put(`${prefix}/activityRoomApplication/review`, params)
}
// 导出活动室二维码
export function getActivityRoomQRCodeImgs(params) {
  return get(`${prefix}/qrScan/getActivityRoomQRCodeImgs`, params)
}
