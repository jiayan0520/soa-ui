import api from '@/api'
import * as $dd from 'dingtalk-jsapi';
/**
 * 初始化钉钉信息
 */
export default async function initDD() {
  // 通过免登授权码换取用户账号
  const loginByDDCode = (code) => {
    console.log('2.通过免登授权码登录');
    api.getAuthLogin({ code: code }).then(data => {
      // this.hideLoading();
      // 2*.免密登录成功，将token保存起来
      // this.account = data.account;
      // console.log('获取当前account' + data.account);
      // localStorage.setItem('account', data.account);
      // this.init();
    }).catch(err => {
      console.log(err)
    });
  }
  if ($dd.env.platform === 'notInDingTalk') {
    alert('请用钉钉打开！');
    return;
  }
  // 将调用钉钉的接口先进行签名
  console.log('1.钉钉授权码获取');
  $dd.ready(() => {
    // 获取微应用免登授权码
    $dd.runtime.permission.requestAuthCode({
      corpId: 'ding424c9303b402c60835c2f4657eb6378f',
      onSuccess: info => {
        var code = info.code;
        // cookie.set('auth_code', code);
        console.log('1.1获取微应用免登授权码成功：' + code);
        loginByDDCode(code);
      },
      onFail: err => {
        if ($dd.ios || $dd.android) {
          $dd.device.notification.hidePreloader({});
        } else {
          this.$vux.loading.hide();
        }
        // alert('requestAuthCode fail: ' + err.errorMessage);
        alert('requestAuthCode fail: ' + JSON.stringify(err));
        // 用户不在当前企业 退出
        // this.$vux.loading.hide();
      }
    });
  });
}
