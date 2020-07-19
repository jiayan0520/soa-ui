import Mock from 'mockjs'
import data from './data'
// import loginAPI from './login'

Mock.setup({ timeout: '350-600' })

// 通用
Mock.mock(/\/task\/addTask/, 'post', data.fetch)

export default Mock
