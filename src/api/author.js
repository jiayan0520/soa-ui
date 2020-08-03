import { get } from '@/utils/request'
// 前缀
const prefix = `/dingding`

export function getAppInfo(params) {
  return get(`${prefix}/getAppInfo`, params)
}
export function getUserId(params) {
  return get(`${prefix}/getUserId`, params)
}
export function getUserInfo(params) {
  return get(`${prefix}/getUserInfoByUserId`, params)
}

