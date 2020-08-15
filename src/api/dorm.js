import { post, get, put, del } from './request'

// 前缀
const prefix = `/prod-api/dormmodule`

// 宿舍列表
export function getDormList(params) {
  return get(`${prefix}/dorm/list`, params)
}
// 获取宿舍详情
export function getDormDetail(params) {
  return get(`${prefix}/dorm/${params}`)
}
// 新增宿舍
export function addDorm(params) {
  return post(`${prefix}/dorm`, params)
}
// 修改宿舍
export function updateDorm(params) {
  return put(`${prefix}/dorm`, params)
}
// 删除宿舍
export function deleteDorm(params) {
  return del(`${prefix}/dorm/${params}`)
}
// 楼栋维数据
export function getBuildingDimension() {
  return get(`${prefix}/building`)
}
// 楼栋列表
export function getBuildingList(params) {
  return get(`${prefix}/building/list`, params)
}
// 新增楼栋
export function addBuilding(params) {
  return post(`${prefix}/building`, params)
}
// 修改楼栋
export function updateBuilding(params) {
  return put(`${prefix}/building`, params)
}
// 删除楼栋
export function deleteBuilding(params) {
  return del(`${prefix}/building/${params}`)
}
// 获取楼栋详情
export function getBuildingDetail(params) {
  return get(`${prefix}/building/${params}`)
}
