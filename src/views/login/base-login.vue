<template>
  <div class="base-login">
    <div class="login-info">
      <div class="user">
        <div class="label">帐号：</div>
        <input
          v-model="loginForm.username"
          type="text"
          placeholder="请输入账号" >
      </div>
    </div>
    <div class="login-info">
      <div class="user">
        <div class="label">密码：</div>
        <input
          v-model="loginForm.password"
          type="text"
          placeholder="请输入密码" >
      </div>
    </div>
    <div class="soa-btn-box">
      <van-button
        block
        type="info"
        @click="doLogin">提交</van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';

export default {
  name: 'BaseLogin',
  props: {
    title: {
      type: String,
      default: '账号登录'
    },
    // 表单尺寸
    formSize: {
      type: String,
      default: 'small'
    },
    // 进入系统后的路由地址
    loginUrl: {
      type: String,
      default: ''
    },
    // 是否启用记住密码
    rememberPassword: {
      type: Boolean,
      default: true
    },
    from: {
      type: [Object, String],
      default: '/home'
    }, // 登录之后需要跳转的路由
    // 登录成功后钩子
    afterLoginSuccess: {
      type: Function,
      default() {
        this.$router.push({
          path: this.from.path || this.from,
          query: this.from.query
        });
      }
    }
  },
  data() {
    return {
      remember: true, // 是否记住密码
      loading: false,
      loginForm: {
        username: null, // 用户名
        password: null, // 登录密码
        validCode: null // 验证码
      },
      isQRCodeLogin: false,
      random: Math.random(),
      // 校验规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      // 登录地址
      loginRequestUrl: '/api/v1/token'
    };
  },
  created() { },
  mounted() {
    this.loadAccount();
  },
  methods: {
    // 重置表单
    resetLogin() {
      this.$refs['loginForm'].resetFields();
    },
    /* --------------------账号密码登录-------------------- */
    // 登录表单验证
    doLogin() {
      const { username, password } = this.loginForm;
      if (username && password) {
        this.loginByUserName(this.loginForm);
      } else {
        Toast.fail('请输入');
      }
    },
    // 登录
    loginByUserName(loginForm) {
      if (this.beforeLoginRequest) {
        if (!this.beforeLoginRequest(loginForm)) {
          this.loading = false;
          return;
        }
      }

      const data = {
        username: loginForm.username,
        password: loginForm.password
      };
      this.$store.dispatch('core/login', data).then(() => {
        this.loading = false;
        this.afterLoginSuccess();
        this.rememberAccount()
      }).catch(err => {
        this.loading = false;
        Toast.fail(err);
      });
    },
    // 记住密码登录记住账号
    rememberAccount() {
      window.localStorage.setItem(
        'accountInfo',
        escape(
          JSON.stringify({
            username: this.loginForm.username,
            password: this.loginForm.password
          })
        )
      );
    },
    // 不记住密码删除
    removeAccount() {
      window.localStorage.removeItem('accountInfo');
    },
    // 如果上次是记住密码,那么将获取到数据，将记住密码值设为true
    loadAccount() {
      const accountInfo = JSON.parse(
        unescape(window.localStorage.getItem('accountInfo'))
      );
      if (accountInfo) {
        this.login = Object.assign(this.loginForm, accountInfo);
        this.remember = true;
      }
    }
  }
};
</script>

<style lang="scss">
.base-login {
  height: 100vh;
  overflow: hidden;
  background-color: #ffffff;
  color: #333333;
  .login-info {
    height: 70px;
    display: flex;
    align-items: center;
    .user {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50%;
      .label {
        width: 60px;
        text-align: right;
      }
      input {
        box-sizing: border-box;
        height: 42px;
        padding-left: 5px;
        background-color: rgba(0, 0, 0, 0);
        border: none;
        border-bottom: 1px solid #abc0c7;
        margin-right: 20px;
      }
    }
  }
}
</style>
