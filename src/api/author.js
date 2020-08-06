import { get, post } from './request'
// 前缀
const prefix = `/prod-api/dingding`
// 账号密码模拟登陆
function loginTest(params) {
  return post(`/prod-api/loginTest`, params)
}
// 钉钉登录
function getAuthLogin(params) {
  return get(`${prefix}//getUserId`, params)
}
// 获取钉钉钉签名信息
function getAppInfo(params) {
  return get(`${prefix}/getAppInfo`, params)
}
// 获取用户信息
function getUserInfo(params) {
  return get(`${prefix}/getUserInfoByUserId`, params)
}
export {
  loginTest,
  getAuthLogin,
  getAppInfo,
  getUserInfo
}
