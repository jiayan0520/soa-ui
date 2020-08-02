import { post } from '@/utils/request'

import { AUTHOR } from '@/api'

export function sign(params) {
  return post(`${AUTHOR}/sign`, params)
}
export function getUserId(params) {
  return post(`${AUTHOR}/getUserId`, params)
}
export function getUserInfo(params) {
  return post(`${AUTHOR}/getUserInfo`, params)
}

