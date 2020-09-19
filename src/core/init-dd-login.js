import api from '@/api'
import * as $dd from 'dingtalk-jsapi';
import { Toast } from 'vant'
/**
 * 初始化钉钉信息
 */
export default async function initDD(store, router) {
  const corpId = store.getters['core/system'].corpId
  return new Promise(function (resolve, reject) {
    // 通过免登授权码换取用户账号
    const loginByDDCode = async (code) => {
      // alert('【框架日志】2.通过免登授权码登录');
      await api.getAuthLogin({ code: code }).then(result => {
        // 2*.免密登录成功，将token保存起来
        const token = result.token ? result.token : result
        store.dispatch('core/reset')
        store.commit('core/setToken', token)
      }).catch(err => {
        console.log(err)
      });
    }
    const showLoading = () => {
      /* 1.授权免登加载中 */
      if ($dd.ios || $dd.android) {
        // 钉钉移动端
        $dd.device.notification.showPreloader({
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
    }
    const closeLoading = () => {
      if ($dd.ios || $dd.android) {
        $dd.device.notification.hidePreloader({});
      } else {
        Toast.clear()
      }
    }
    if ($dd.env.platform === 'notInDingTalk') {
      // alert('请用钉钉打开！');
      console.log('【框架日志】非钉钉环境')
      resolve(false);
    } else {
      showLoading()
      // 将调用钉钉的接口先进行签名
      console.log('【框架日志】1.钉钉授权码获取');
      $dd.ready(() => {
        // 获取微应用免登授权码
        $dd.runtime.permission.requestAuthCode({
          corpId: corpId,
          onSuccess: info => {
            var code = info.code;
            // cookie.set('auth_code', code);
            console.log('【框架日志】1.1获取微应用免登授权码成功：' + code);
            loginByDDCode(code).then(() => {
              closeLoading()
              resolve(true);
            });
          },
          onFail: err => {
            closeLoading()
            Toast('requestAuthCode fail: ' + JSON.stringify(err));
            resolve(false)
          }
        });
      });
    }
  })
}
