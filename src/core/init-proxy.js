// import minimatch from 'minimatch'
import { hijack } from './utils/proxy-proto'

// window.minimatch = minimatch

/**
 * 初始化api和token代理
 */
export default function initProxy(store, router) {
  const token = store.getters['core/token']
  const logout = async (msg, xhr) => {
    console.log('【框架日志】401捕获', xhr)
    await store.dispatch('core/reset')
    await store.dispatch('core/auth', { msg: `${msg}，请重新登录` })
  }

  hijack(window.XMLHttpRequest, {
    open(method, url, async, user, password) {
      this.config = { method, url, async, user, password }
      /* api代理 --- 匹配成功则返回false，拦截open方法 */
      let matched
      // 重写
      if (matched) {
        if (typeof matched === 'function') {
          url = matched(method, url)
        } else {
          url = matched + url
        }
        this.config.url = url
        this.open(method, url, async, user, password)
        return false
      }
    },
    send(data) {
      this.config.data = data

      // * 由于请求头加入后，会触发CORS调用OPTIONS
      // * 容易造成未处理CORS机制的第三方接口直接由于调用OPTIONS方法挂掉，在这里直接临时处理掉
      // *** 但是，也意味着，直接http请求ec的接口，也会存在这样的问题，后续想想更好的办法
      // https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS
      if (/^http/.test(this.config.url)) return

      // 设置请求头
      Object
        .entries({
          'Authorization': token.get(),
          // 特殊处理：当delete|put方法时，用这个告诉服务端重写请求类型，传输层面的类型统一替换为POST
          // 场景：部分服务器无法直接支持delete|put时
          'X-Http-Method-Override': this.config._method,
          'Cache-Control': 'no-cache',
          'Cache-control': 'no-store',
          'Pragma': 'no-cache', // in http 1.0 = Cache-Control
          'Expires': 1 // 有效值
        })
        .forEach(([key, val]) => {
          val && this.setRequestHeader(key, val)
        })
    },
    onreadystatechange() {
      // 拦截401状态
      if (this.readyState === 4 && this.status === 401) {
        // 如果刷新token不存在，说明未登录或者登录失效，直接注销重新登录钉钉
        logout('登录状态已过期', this)
        // 告诉代理器不用继续执行原生方法
        return false
      }
    }
  })

  console.log('【框架日志】接口代理初始化完成：')
}
