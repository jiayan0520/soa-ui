/**
 * 内部缓存
 * @type {Map}
 */
var cache = new Map()

/**
 * 内部日志
 * @param  {String}   type 日志输出类型
 * @param  {[type]}   msg  日志内容
 */
const log = function log(type, msg) {
  if (process.env.NODE_ENV !== 'production') {
    console[type](msg)
  }
}

/**
 * 获取被劫持的原始对象
 * @param  {String}   proxy 被代理后对象
 * @author lefreet
 * @date   2019-03-27
 */
export function hostages(proxy) {
  return proxy === undefined ? cache : cache.get(proxy)
}

/**
 * 对象释放
 * @param  {Object}   proxy 被代理后的对象
 * @author lefreet
 * @date   2019-03-27
 */
export function rescue(proxy) {
  const [Proto, , attach] = cache.get(proxy) || []
  if (Proto) {
    attach[Proto.name] = Proto
    cache.delete(Proto)
  }
}

/**
 * 对象原型代理方法 底层问题可能比较多，后期看看测试情况
 * @param  {Object}   Proto   被代理的对象原型，如window.XMLHttpRequest
 * @param  {Object}   options 覆盖到原型上实现代理的配置
 * @param  {Object}   attach  对象的原始挂载上级，用于还原
 * @return {[type]}           [description]
 * @author lefreet
 * @date   2019-03-27
 */
export function hijack(Proto, options = {}, attach = window) {
  if (!Proto.name || typeof Proto.name !== 'string') {
    log('warn', `Proto.name is must and to be a string.`)
  }

  if (cache.has(Proto)) {
    const [hostage, options] = cache.get(Proto)
    log('warn', `Proto: ${hostage.name} has been hijack, please run rescue(Proto) to release it.`)
    log('warn', options)
  } else {
    // 代理函数
    // Proto -> XMLHttpRequest
    const proxy = function (...args) {
      const nativeInstance = new Proto(args)
      const proxyInstance = this

      for (const key in nativeInstance) {
        // native method -> open()
        if (typeof nativeInstance[key] === 'function') {
          const nativeMethod = nativeInstance[key]
          const proxyMethod = options[key]

          proxyInstance[key] = function (...args) {
            // it can't be a async function
            // invoker do not know the proxy methods is a Promise, and won't await
            if (typeof proxyMethod === 'function' && proxyMethod.apply(nativeInstance, args) === false) {
              return
            }
            return nativeMethod.apply(nativeInstance, args)
          }
        } else {
          // native attr -> responseType
          // native event -> onreadystatechange
          Object.defineProperty(proxyInstance, key, {
            get: () => {
              return nativeInstance[key]// nativeInstance[`__proxy__${key}`]
            },
            set: (value) => {
              const property = options[key]

              // native event maybe a name start with 'on', but not all
              if (typeof property === 'function') {
                // method's invoker is from nativeInstance, so event is emit from it
                // when hook return false, do not run native event
                // it is confused when some native value is not allow a function type. e.g. responseType.
                nativeInstance[key] = function (...args) {
                  property.apply(nativeInstance, args) !== false && value.apply(nativeInstance, args)
                }
              } else {
                // ????????????????????????
                nativeInstance[key] = value
                // whether it is writable, rename
                // if (typeof value === 'function') {
                //   nativeInstance[key] = value
                // } else {
                //   nativeInstance[`__proxy__${key}`] = value
                // }
              }
            }
          })
        }
      }
      proxyInstance.name = Proto.name
      proxyInstance.__proxy__ = true
    }

    cache.set(proxy, [Proto, options, attach])
    attach[Proto.name] = proxy
  }
}
