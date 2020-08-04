import Mock from 'mockjs'
import data from './data'
// import loginAPI from './login'

Mock.setup({ timeout: '350-600' })

// 通用
Mock.mock(/\/task\/addTask/, 'post', data.fetch)
Mock.mock(/\/taskModule\/statistics\/list/, 'get', data.getTaskStatisticsList)
Mock.mock(/\/taskModule\/audit\/list/, 'get', data.getTaskExamineList)
Mock.mock(/\/taskModule\/audit\/getInfo/, 'post', data.getTaskExamineDetail)
Mock.mock(/\/taskModule\/audit\/saveTaskAudit/, 'post', data.saveTaskExamine)
Mock.mock(/\/author\/sign/, 'post', data.sign)
Mock.mock(/\/author\/getUserId/, 'post', data.getUserId)
Mock.mock(/\/author\/getUserInfo/, 'post', data.getUserInfo)

export default Mock
