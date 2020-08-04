import { uploadFile } from '@/utils/request'
// 前缀
const prefix = `/common`

function upload(params) {
  return uploadFile(`${prefix}/upload`, params)
}

export {
  upload
}
