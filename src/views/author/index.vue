<template><div/></template>

<script>
// import cookie from 'vux/src/tools/cookie'
import { Toast } from 'vant'
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      corpId: 'ding2121e6f85c89c1f9f2c783f7214b6d69'
    };
  },
  computed: {
    ...mapGetters(['userAccount', 'toRoute'])
  },
  mounted() {
    console.log('account', this.account)
    if (this.userAccount) {
      this.init();
    } else {
      this.login();
    }
  },
  methods: {
    init() {
      console.log('toRoute', this.toRoute);
      // 鉴权
      this.getSignConfig(); // 鉴权
      this.getUserInfo(); // 获取用户信息
    },
    login() {
      // this.$dd.biz.navigation.setTitle({ title: '登录' });
      if (this.$dd.env.platform === 'notInDingTalk') {
        alert('请用钉钉打开！');
        return;
      }
      /* 1.授权免登加载中 */
      this.showLoading();
      this.$dd.ready(() => {
        // 获取微应用免登授权码
        this.$dd.runtime.permission.requestAuthCode({
          corpId: this.corpId,
          onSuccess: info => {
            var code = info.code;
            // 获取微应用免登授权码
            this.loginByDDCode(code);
          },
          onFail: err => {
            if (this.$dd.ios || this.$dd.android) {
              this.$dd.device.notification.hidePreloader({});
            } else {
              Toast.clear()
            }
            alert('requestAuthCode fail: ' + JSON.stringify(err));
          }
        });
      });
      this.$dd.error(function(error) {
        alert('this.$dd error: ' + JSON.stringify(error));
      });
    },
    // 通过免登授权码换取用户账号
    loginByDDCode(code) {
      this.$api.getUserId({ code: code }).then(res => {
        const data = res.data.data
        this.hideLoading();
        if (res.data.code === 200) {
          this.$store.dispatch('UpdateUserAccount', data.userId);
          this.init();
        } else {
          Toast(res.data.msg);
        }
      }).catch(e => {
        throw e
        // console.log(err);
      });
    },
    getUserInfo() {
      // 获取用户信息
      this.$api.getUserInfo({ userId: this.userAccount }).then(res => {
        console.log('获取用户信息');
        if (res.data.code === 200) {
          if (this.toRoute) {
            this.$router.replace(this.toRoute);
          } else {
            this.$router.replace('/');
          }
        } else {
          Toast(res.data.msg);
        }
      }).catch(err => {
        Toast('网络不稳定，请稍后再试');
        console.log(err);
      });
    },
    // 获取签名信息并进行JSAPI鉴权
    getSignConfig() {
      // var url = 'http://www.huazhongyi.top/StudentWork/web/index.html';
      // if (window.location.href.indexOf('pc_slide') > -1) {
      //   url =
      //     'http://www.huazhongyi.top/StudentWork/web/index.html?pc_slide=true';
      // }
      // console.warn('signCall', url);

      this.$api.getAppInfo().then(res => {
        console.log(res);
        if (res.data.code === 200) {
          const { agentId, corpId, timeStamp, nonceStr, signature } = res.data.data
          this.$dd.config({
            agentId: agentId, // 必填，微应用ID
            corpId: corpId, // 必填，企业ID
            timeStamp: timeStamp, // 必填，生成签名的时间戳
            nonceStr: nonceStr, // 必填，生成签名的随机串
            signature: signature, // 必填，签名
            type: 0, // 选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
            jsApiList: [
              'biz.contact.choose',
              'biz.contact.chooseMobileContacts',
              'biz.contact.complexPicker',
              'biz.contact.departmentsPicker',
              'biz.contact.createGroup',
              'biz.contact.setRule',
              'biz.customContact.choose',
              'biz.customContact.multipleChoose',
              'device.base.getInterface',
              'device.base.getUUID',
              'biz.map.locate'
            ] // 必填，需要使用的jsapi列表，注意：不要带dd。
          });
        } else {
          Toast('sign获取失败');
        }
      }).catch(err => {
        console.log(err);
      });
    },
    showLoading() {
      /* 1.授权免登加载中 */
      if (this.$dd.ios || this.$dd.android) {
        // 钉钉移动端
        this.$dd.device.notification.showPreloader({
          text: '正在验证身份中，请稍后..',
          showIcon: true
        });
      } else {
        // 钉钉PC端
        Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: '正在验证身份中，请稍后..'
        })
      }
    },
    hideLoading() {
      if (this.$dd.ios || this.$dd.android) {
        this.$dd.device.notification.hidePreloader({});
      } else {
        Toast.clear()
      }
    }
  }
};
</script>
