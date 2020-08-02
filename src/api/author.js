import { get } from '@/utils/request'

import { AUTHOR } from '@/api'

export function getAppInfo(params) {
  return get(`${AUTHOR}/getAppInfo`, params)
}
export function getUserId(params) {
  return get(`${AUTHOR}/getUserId`, params)
}
export function getUserInfo(params) {
  return get(`${AUTHOR}/getUserInfoByUserId`, params)
}

