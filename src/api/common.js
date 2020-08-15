import { uploadFile, post, del } from './request'
// 前缀
const prefix = `/prod-api/common`
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
  return del(`${prefix}/annex/${params}`)
}
export {
  upload,
  annex,
  deleteFile
}
