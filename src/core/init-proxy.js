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
    await store.dispatch('core/auth', { msg: `${msg}，请重新登录` })
  }

  hijack(window.XMLHttpRequest, {
    open(method, url, async, user, password) {
      // 针对ec谓词处理bug的特殊hack
      // *** 找个时间把这个逻辑删掉
      let _method
      if (['DELETE', 'PUT'].includes(method)) {
        _method = method
        method = 'POST'
      }

      this.config = { method, url, async, user, password, _method }

      /* api代理 --- 匹配成功则返回false，拦截open方法 */
      // 代理支持字符串拼接和自定义函数
      // 出于兼容和性能考虑 micromatch -> minimatch
      // 只支持
      // 通配符：api/v1/**
      // 参考：http://www.ruanyifeng.com/blog/2018/09/bash-wildcards.html
      // 扩展：@(em|ebu|ebi)/api/**
      // 参考：https://www.52cik.com/2018/05/02/bash-extended-globbing.html
      // e.g. { '/api/**': '/rest' } -> '/rest/api'
      // e.g. { '/api/**': function (method, url) { return '/custom/api/xxxx' } }
      // e.g. [{ context: ['/em/**', '/ebu/**'], target: '/rest' }]
      let matched
      // 重写
      if (matched) {
        if (typeof matched === 'function') {
          url = matched(_method || method, url)
        } else {
          url = matched + url
        }
        this.config.url = url
        this.open(method, url, async, user, password)
        return false
      }
      /* api代理 --- end */

      // 如果谓词被重写，则重新open一个伪指代
      if (_method) {
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
        // 如果刷新token不存在，说明未登录或者登录失效，直接注销
        logout('登录状态已过期', this)
        // 告诉代理器不用继续执行原生方法
        return false
      }
    }
  })

  console.log('【框架日志】接口代理初始化完成：')
}
