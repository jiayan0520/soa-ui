import Signer from './utils/Signer'
// import { Base64 } from 'js-base64'
import api from '@/api'

/**
 * 初始化状态管理
 */
export default function initStore(store, router, cycle) {
  // 全局命名空间
  const namespace = 'core'
  const system = window.$soa
  // token记录标识
  const sign = system.sign
  // 标记名称
  const name = 'token'
  // 动态token标记
  const token = new Signer({ target: 'cookie', sign, name })
  // 注册状态管理
  store.registerModule(namespace, {
    namespaced: true,
    state: { system, token, user: null, authorized: false },
    getters: {
      // 系统配置
      system: state => state.system,
      // 是否已鉴权
      authorized: state => state.authorized,
      // 用户信息
      user: state => state.user || {},
      // 用户token
      token: state => state.token
    },
    mutations: {
      // 设置系统配置
      setSystem(state, system) {
        state.system = system
      },
      setAuthorized(state, value) {
        state.authorized = value
      },
      // 设置用户信息
      setUser(state, user) {
        state.user = user
      },
      // 设置token信息
      setToken(state, token) {
        state.token.set(`Bearer ${token}`)
      }
    },
    actions: {
      async auth({ getters, dispatch }, { path = location.path, msg = '请登录' } = {}) {
        // * 用户是否已登录
        const isAuthorizedUser = getters.token.check()
        // * 是否免鉴权页面
        // 登录路由必须免登录
        const isAuthorizedPath = path === '/login'
        // *** 路由权限逻辑
        //   * 非授权页面：引导到登录页面
        if (isAuthorizedUser && isAuthorizedPath) {
          dispatch('boot')
        }
        if (isAuthorizedUser && !isAuthorizedPath) {
          await dispatch('boot')
        }
        console.log(3333, path, isAuthorizedUser)
        if (!isAuthorizedUser && !isAuthorizedPath) {
          // token逻辑还未走通，先退回，若是钉钉，需要调用钉钉的登录
          router.push('/login')
          console.warn(msg)
        }
      },
      // 重置
      reset({ getters, commit }) {
        // 清理token信息
        getters.token.clear()
        // 清理用户信息
        commit('setUser', null)
        // 重置鉴权标记
        commit('setAuthorized', false)
        // 重置权限路由
        router.matcher = new router.constructor(router.options).matcher
      },
      // 引导：用户信息，权限信息，等等，整个框架在鉴权成功后只会执行***一次***
      async boot({ getters, commit }) {
        if (getters.authorized === true) return
        const token = getters.token.get()
        // 鉴权标记和用户是否存在逻辑是独立的，这样方便外部勾子预设用户信息
        // 由于getters.user有容错处理，用这种方法判断是否有对象信息
        if (JSON.stringify(getters.user) === '{}' && token) {
          try {
            const user = (await api.getUserInfo())
            commit('setUser', user)
            console.log('用户信息初始化完成：', user)
          } catch (e) {
            console.error('获取用户信息失败，请联系管理员', e)
          }
        }

        // 每次鉴权成功后的固定循环
        await cycle(store, router)
        console.log(222222222222)
        // 鉴权完毕，设置标记
        commit('setAuthorized', true)
      },
      // 登录
      // 负责写入token标记
      // 登录之后的重定向操作由调用登录的组件自行决定
      async login({ getters, commit, dispatch }, { username, password }) {
        const data = {
          username: username,
          password: password
        }
        const result = (await api.loginTest(data))
        try {
          console.log(result)
          const token = result.token ? result.token : result
          console.log(token)
          dispatch('reset')
          commit('setToken', token)
        } catch (e) {
          console.warn(result)
          throw e
        }
      }
    }
  })

  console.log('框架状态初始化完成：', store)
}
