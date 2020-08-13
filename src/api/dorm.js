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
  return del(`${prefix}/dorm`, params)
}
// 楼栋维数据
export function getBuildingDimension() {
  return get(`${prefix}/building`)
}
