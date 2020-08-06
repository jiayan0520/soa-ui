import { uploadFile, post } from './request'
// 前缀
const prefix = `/common`

function upload(params) {
  return uploadFile(`${prefix}/upload`, params)
}
function annex(params) {
  return post(`${prefix}/annex`, params)
}
export {
  upload,
  annex
}
