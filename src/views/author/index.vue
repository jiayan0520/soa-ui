<template><div/></template>

<script>
// import cookie from 'vux/src/tools/cookie'
import { mapMutations } from 'vuex';
import { mapGetters } from 'vuex';
import author from './author';
export default {
  data() {
    return {
      useClassInfoList: ['/home'], // 需要使用 班级信息的路由集合
      useConfigList: [] // 需要使用 鉴权的路由集合
    };
  },
  computed: {
    ...mapGetters(['userInfo', 'configurationWizardDeployMode'])
    // ...mapState({
    //   userInfo: state => state.user.userInfo,
    //   isLoading: state => state.vux.isLoading,
    //   toUrl: state => state.vux.toUrl
    //   // classInfo: state => state.user.classInfo,
    // })
  },
  mounted() {
    if (process.env.NODE_ENV !== 'production') {
      /**
			 * 传伟: 163447243721147282
			 * 国填: 056764423937684566
			 * 成伟: 271953085321454213
			 * 榕懋: 056530284824265206
			 * 超强: 121807626326716804
			 * 党委书记岳老师: 024542072823590454
			 * 团委书记伍老师: 041103255820206842
			 * 辅导员何杰: 1014372367656059
			 * 家长: 224826026336032259
			 * 学生: 290320561635585267

			 */
      localStorage.setItem('account', '163447243721147282');
    }
    this.account = localStorage.getItem('account');
    if (!this.account) {
      this.login();
    } else {
      this.init();
    }
  },
  methods: {
    init() {
      console.log(this.toUrl);
      // 是否需要鉴权
      this.getSignConfig(); // 鉴权
      // 是否需要获取班级列表
      this.getClassInfo(); // 获取班级列表
      // }
      // 获取用户角色、所在班级
      this.getUserIdentity(this.account);

      this.getUserInfo(); // 获取用户信息
    },
    login() {
      this.$dd.biz.navigation.setTitle({ title: '登录' });
      if (this.$dd.env.platform === 'notInDingTalk') {
        alert('请用钉钉打开！');
        return;
      }

      /* 1.授权免登加载中 */
      this.showLoading();

      console.log('1.钉钉授权码获取');
      this.$dd.ready(() => {
        // 获取微应用免登授权码
        this.$dd.runtime.permission.requestAuthCode({
          corpId: 'ding424c9303b402c60835c2f4657eb6378f',
          onSuccess: info => {
            var code = info.code;
            console.log('1.1获取微应用免登授权码成功：' + code);
            this.loginByDDCode(code);
          },
          onFail: err => {
            if (this.$dd.ios || this.$dd.android) {
              this.$dd.device.notification.hidePreloader({});
            } else {
              this.$vux.loading.hide();
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
    loginByDDCode(mycode) {
      console.log('2.通过免登授权码换取用户账号');
      const url = author.getAuthLogin();
      this.$http
        .post(
          url,
          this.$qs.stringify({
            code: mycode
          })
        )
        .then(
          ({ data }) => {
            console.log(data);
            this.hideLoading();
            if (data.code === 1) {
              // 2*.免密登录成功
              this.account = data.account;
              console.log('获取当前account' + data.account);
              localStorage.setItem('account', data.account);
              this.init();
            } else {
              this.$vux.toast.show({
                text: data.message,
                position: 'middle',
                type: 'cancel'
              });
            }
          },
          err => {
            console.log(err);
          }
        );
    },
    getUserInfo() {
      // 获取用户信息
      const url = author.getDingUserInfo();
      this.$http
        .post(
          url,
          this.$qs.stringify({
            account: this.account
          })
        )
        .then(
          res => {
            console.log('获取用户信息');
            console.log(res);
            console.log(res.data.data[0]);
            if (res.data.data[0].NAME === '卓传伟') {
              res.data.data[0].isStudent = 1;
            }
            if (res.data.data[0].NAME === '陈国填') {
              res.data.data[0].isStudent = 0;
            }
            console.log('是否学生');
            console.log(res.data.data[0].NAME);
            console.log(res.data.data[0].isStudent);
            this.$vux.loading.hide();
            if (res.data.code === 1) {
              // this.setClassInfo(res.data.data);
              console.log('设置用户信息');
              this.setUserInfo(res.data.data[0]);

              this.setAuth(true);
              if (this.toUrl) {
                this.$router.replace(this.toUrl);
              } else {
                console.log('跳转首页');
                this.$router.replace('/');
              }
            } else {
              this.$vux.toast.show({
                text: res.data.message,
                type: 'cancel'
              });
            }
          },
          err => {
            this.$vux.loading.hide();
            this.$vux.toast.show({
              text: '网络不稳定，请稍后再试',
              type: 'text'
            });
            console.log(err);
          }
        );
    },
    // 获取签名信息并进行JSAPI鉴权
    getSignConfig() {
      var url = 'http://www.huazhongyi.top/StudentWork/web/index.html';
      if (window.location.href.indexOf('pc_slide') > -1) {
        url =
          'http://www.huazhongyi.top/StudentWork/web/index.html?pc_slide=true';
      }
      console.warn('signCall 获取签名信息地址：', url);

      this.$http
        .post(
          '/StudentWork/ding/signCall',
          this.$qs.stringify({
            url: url
          })
        )
        .then(
          res => {
            console.log(res);
            if (res.data.code === 1) {
              console.log('2.sign获取成功 配置dd.config');
              this.$dd.config({
                agentId: res.data.agentId, // 必填，微应用ID
                corpId: res.data.corpId, // 必填，企业ID
                timeStamp: res.data.timeStamp, // 必填，生成签名的时间戳
                nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                signature: res.data.signature, // 必填，签名
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
              this.$vux.toast.show({
                text: 'sign获取失败',
                position: 'middle',
                type: 'cancel'
              });
            }
          },
          err => {
            console.log(err);
          }
        );
    },

    // 获取学校的所有班级（用于选班级中使用，验证是否班级而非部门）
    getClassInfo() {
      this.$http.post('/StudentWork/quantification/allClass').then(
        ({ data }) => {
          console.log('获取班级信息');
          console.log(data);
          this.$vux.loading.hide();
          if (data.code === 1) {
            this.setClassInfo(data.data.split(','));
          } else {
            this.$vux.toast.show({
              text: data.message,
              type: 'cancel'
            });
          }
        },
        err => {
          this.$vux.loading.hide();
          this.$vux.toast.show({
            text: '网络不稳定，请稍后再试',
            type: 'text'
          });
          console.log(err);
        }
      );
    },

    // 获取用户身份，所在班级
    // 0是学生，1是班级负责人(班长，团支书)     2是辅导员 3是团委书记  4又是辅导员也是团委书记   5.其他
    getUserIdentity(account) {
      this.$http
        .post(
          '/StudentWork/quantification/dataRight',
          this.$qs.stringify({
            account: account
          })
        )
        .then(
          ({ data }) => {
            console.log('获取用户身份与所在班级');
            console.log(data);
            this.$vux.loading.hide();
            if (data.code === 1) {
              this.setUserIdentity({
                identity: data.identity,
                userclass: data.class
              });
            } else {
              this.$vux.toast.show({
                text: data.message,
                type: 'cancel'
              });
            }
          },
          err => {
            this.$vux.loading.hide();
            this.$vux.toast.show({
              text: '网络不稳定，请稍后再试',
              type: 'text'
            });
            console.log(err);
          }
        );
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
        this.$vux.loading.show({
          text: '正在验证身份中，请稍后..'
        });
      }
    },
    hideLoading() {
      if (this.$dd.ios || this.$dd.android) {
        this.$dd.device.notification.hidePreloader({});
      } else {
        this.$vux.loading.hide();
      }
    },

    ...mapMutations([
      'setUserid',
      'setUseraccount',
      'setUsername',
      'setOrganization',
      'setTelephone',
      'setUserrole',
      'setUserInfo',
      'setAuth',
      'setClassInfo',
      'setUserIdentity'
    ])
  }
};
</script>
