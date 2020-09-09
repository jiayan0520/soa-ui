import { post, get, put, del } from './request'

// 前缀
const prefix = `/prod-api/dormmodule`

// 宿舍列表
export function getDormList(params) {
  return post(`${prefix}/dorm/list`, params)
}
// 宿舍列表统计
export function getDormTotalInfos(params) {
  return post(`${prefix}/dorm/getDormInfos`, params)
}
// 获取宿舍详情
export function getDormDetail(params) {
  return get(`${prefix}/dorm/${params}`)
}
// 新增宿舍
export function addDorm(params) {
  return post(`${prefix}/dorm`, params)
}
// 修改宿舍
export function updateDorm(params) {
  return put(`${prefix}/dorm`, params)
}
// 删除宿舍
export function deleteDorm(params) {
  return del(`${prefix}/dorm/del/`, params)
}
// 宿舍列表清空宿舍
export function clearDorm(params) {
  return post(`${prefix}/dorm/clearDorm`, params)
}
// 楼栋维数据
export function getBuildingDimension() {
  return get(`${prefix}/building/getBuildingList`)
}
// 楼栋列表
export function getBuildingList(params) {
  return post(`${prefix}/building/list`, params)
}
// 新增楼栋
export function addBuilding(params) {
  return post(`${prefix}/building`, params)
}
// 修改楼栋
export function updateBuilding(params) {
  return put(`${prefix}/building`, params)
}
// 删除楼栋
export function deleteBuilding(params) {
  return del(`${prefix}/building/del/`, params)
}
// 楼栋列表清空宿舍
export function clearBuilding(params) {
  return post(`${prefix}/building/clearDorm`, params)
}
// 获取楼栋详情
export function getBuildingDetail(params) {
  return get(`${prefix}/building/${params}`)
}

// 站外用户列表
export function getUserOutList(params) {
  return post(`${prefix}/userOut/list`, params)
}
// 新增站外用户
export function addUserOut(params) {
  return post(`${prefix}/userOut`, params)
}
// 修改站外用户
export function updateUserOut(params) {
  return put(`${prefix}/userOut`, params)
}
// 删除
export function deleteUserOut(params) {
  return del(`${prefix}/userOut`, params)
}

// 床位列表
export function getBedList(params) {
  return post(`${prefix}/bed/list`, params)
}
// 获取床位统计数据
export function getBedTotal(params) {
  return post(`${prefix}/bed/getDormInfos`, params)
}
// 退舍
export function outBed(params) {
  return post(`${prefix}/bed/checkOut`, params)
}
// 删除
export function deleteBed(params) {
  return del(`${prefix}/bed/del`, params)
}
// 分配宿舍
export function allotBed(params) {
  return post(`${prefix}/bed/allotBed`, params)
}
// 获取床位详情
export function getBedDetail(params) {
  return get(`${prefix}/bed/${params}`)
}
// 设为舍长
export function setDromManager(params) {
  return put(`${prefix}/dorm/setDromManager`, params)
}

// 获取检查指标
export function getInspectionTypes(params) {
  return get(`${prefix}/inspectionType/findALLType`, params)
}
// 根据宿舍id获取检查列表
export function getResultListByDormId(params) {
  return post(`${prefix}/result/dormInspectionResultlist`, params)
}
// 根据userId获取检查列表
export function getResultListByUserId(params) {
  return post(`${prefix}/result/userInspectionResultlist`, params)
}
// 根据查询条件获取检查列表
export function getResultList(params) {
  return post(`${prefix}/result/list`, params)
}
// 获取检查详情
export function getResultDetail(params) {
  return get(`${prefix}/result/${params}`)
}
// 新增检查
export function addResult(params) {
  return post(`${prefix}/result`, params)
}
// 修改检查
export function updateResult(params) {
  return put(`${prefix}/result`, params)
}
// 删除检查
export function deleteResult(params) {
  return del(`${prefix}/result/${params}`)
}
// 调换申请列表
export function getExchangeList(params) {
  return post(`${prefix}/dromExchangeApplication/list`, params)
}

// 未分配人员列表
export function getUnAllottedList(params) {
  return post(`${prefix}/unAllotted/list`, params)
}
// 导出床位二维码
export function getBedQRCodeImgs(params) {
  return get(`${prefix}/qrScan/getBedQRCodeImgs`, params)
}
