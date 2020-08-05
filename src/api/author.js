import { get } from './request'
// 前缀
const prefix = `/prod-api/dingding`

function getAppInfo(params) {
  return get(`${prefix}/getAppInfo`, params)
}
function getUserId(params) {
  return get(`${prefix}/getUserId`, params)
}
function getUserInfo(params) {
  return get(`${prefix}/getUserInfoByUserId`, params)
}
export {
  getAppInfo,
  getUserId,
  getUserInfo
}
