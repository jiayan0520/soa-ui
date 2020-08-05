import Vue from 'vue'
import App from '../App.vue'

/**
 * 初始化vue实例
 */
export default (store, router, plugins, hooks) => {
  const options = {
    store,
    router,
    render: h => h(App)
  }

  // 注册插件
  if (Array.isArray(plugins)) {
    plugins.forEach(plugin => Vue.use(plugin))
  } else {
    for (const key in plugins) { Vue.use(plugins[key]) }
  }

  // 注册勾子
  for (const path in hooks) {
    const hook = hooks[path]
    const instance = path.split('.')[0]
    const method = path.split('.')[1]
    if (!instance || !method) {
      console.log('错误的生命周期钩子', path)
    } else {
      if (instance === 'vue') {
        options[method] = hook
      }
      if (instance === 'router') {
        router[method](hook)
      }
    }
  }
  // 路由鉴权勾子注入
  router.beforeEach((to, from, next) => {
    store
      .dispatch('core/auth', { path: to.path })
      .then(() => {
        const replacer = router.match(to.path)
        if (replacer.meta.path === to.meta.path) {
          next()
        } else {
          next(Object.assign({}, to, { replace: true }))
        }
      })
      .catch(e => {
        throw new Error(e)
      })
  })

  new Vue(options).$mount('#app')
}
