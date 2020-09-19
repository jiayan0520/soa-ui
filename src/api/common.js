import { uploadFile, post } from './request'
// 前缀
const prefix = window.$soa.tcBaseUrl + `/common`
// 上传附件，保存到附件表
function upload(params) {
  return uploadFile(`${prefix}/upload`, params)
}
// 业务关联附件信息
function annex(params) {
  return post(`${prefix}/annex`, params)
}
// 删除附件
function deleteFile(params) {
  return post(`${prefix}/annex/delete`, params)
}
// 获取附件相关信息
function getListByIds(params) {
  return post(`${prefix}/annex/getListByIds`, params)
}
export {
  upload,
  annex,
  deleteFile,
  getListByIds
}
