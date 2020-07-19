import { post } from '@/utils/request'

import { TASK } from '@/api'

export function addTask(params) {
  return post(`${TASK}/addTask`, params)
}
