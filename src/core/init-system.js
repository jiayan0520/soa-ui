import loadConfig from './utils/load-config'

/**
 * 初始化系统配置
 */
export default async function initSystem(store, router) {
  let system = {}
  let config = window.$soa

  // 如果传递的是个函数，则执行
  if (typeof config === 'function') {
    config = await config()
  }
  // 接收json/js路径，对象，json字符串
  system = await loadConfig(config)

  // 为当前系统附加标题
  if (system.title) {
    document.title = system.title
  }

  // 配置后置勾子
  if (system.afterInitSystem) {
    system = await system.afterInitSystem(system)
  }

  // 全局变量赋值
  window.$soa = system

  // 输出日志
  console.log('【框架日志】系统配置初始化完成：', system)
}
