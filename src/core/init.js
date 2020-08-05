import initStore from './init-store'
import initVue from './init-vue'
import initDD from './init-dd-login'
import initDdSign from './init-dd-sign'

/**
 * 核心初始化
 * @param  {<VueStore>} store   状态管理对象
 * @param  {<VueRouter>} router  路由对象
 * @param  {Object} plugins vue插件
 * @example
 * let plugins = { ElementUI }
 * @param  {Object} hooks   生命周期勾子
 * @example
 * let hooks = {
 *   'vue.mounted' () { // do something after App was mounted  },
 *   'router.beforeEach' () { // do something before inter a route }
 * }
 * @param {Function} cycle 每次登录后执行的周期循环函数
 */
export default function init(
  store,
  router,
  plugins = {},
  hooks = {},
  cycle = (store, router) => {
    return new Promise(resolve => {
    })
  }
) {
  return new Promise(resolve => {
    console.log('【框架日志】初始化参数：', { store, router, plugins, hooks, cycle })
    console.time('【框架日志】框架开销')
    // 初始化状态管理
    initStore(store, router, cycle)
    // 初始化钉钉授权一些api
    initDdSign()
    // 钉钉登录
    initDD(store, router).then(() => {
      // 初始化vue根实例
      initVue(store, router, plugins, hooks)
    })
    console.timeEnd('【框架日志】框架开销')
    resolve()
  })
}
