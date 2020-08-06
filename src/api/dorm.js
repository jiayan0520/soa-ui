import { post, get } from './request'

// 前缀
const prefix = `/prod-api/dingding`

// 宿舍列表
export function getDormList(params) {
  return get(`${prefix}/dorm`, params)
}
// 获取宿舍详情
export function getDormDetail(params) {
  return get(`${prefix}/dorm/{id}`, params)
}
// 新增宿舍
export function addDorm(params) {
  return post(`${prefix}/dorm`, params)
}
