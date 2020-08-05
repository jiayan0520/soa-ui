import cookie from 'js-cookie'
// * 有需要迭代签名的话，扩展SignerX
// * signers.get('token');  signers.set({ token: '123' })
// * target: cookie/window/storage

const PENS = {
  cookie: {
    get() {
      return cookie.get(this.$sign)
    },
    set(value, expires = 86400) {
      cookie.set(this.$sign, value, { expires: expires / 86400 })
    },
    clear() {
      cookie.remove(this.$sign)
    }
  },
  localStorage: {
    get() {
      return localStorage.getItem(this.$sign)
    },
    set(value) {
      localStorage.setItem(this.$sign, value)
    },
    clear() {
      localStorage.removeItem(this.$sign)
    }
  }
}

// 写法单元测试引入报错
export default class Signer {
  constructor({ name, sign = location.port, target = 'cookie' } = {}) {
    this.sign = sign
    this.name = name
    // 构造签名方法
    for (const method in PENS[target]) {
      this[method] = PENS[target][method]
    }
  }

  check() {
    return !!this.get()
  }

  get $sign() {
    const { name, sign } = this
    return `__${typeof sign === 'function' ? sign() : sign}__${name}`
  }
}
