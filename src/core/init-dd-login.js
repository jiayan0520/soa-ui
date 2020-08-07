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
      console.log('【框架日志】2.通过免登授权码登录');
      await api.getAuthLogin({ code: code }).then(result => {
        // 2*.免密登录成功，将token保存起来
        const token = result.token ? result.token : result
        store.dispatch('core/reset')
        store.commit('core/setToken', token)
      }).catch(err => {
        console.log(err)
      });
    }
    if ($dd.env.platform === 'notInDingTalk') {
      // alert('请用钉钉打开！');
      console.log('【框架日志】非钉钉环境')
      resolve(true);
    } else {
      // 将调用钉钉的接口先进行签名
      console.log('【框架日志】1.钉钉授权码获取');
      $dd.ready(() => {
        // 获取微应用免登授权码
        $dd.runtime.permission.requestAuthCode({
          corpId: corpId,
          onSuccess: info => {
            console.log('【框架日志】1.1获取微应用免登授权码成功：' + info);
            loginByDDCode(info.code).then(() => {
              resolve(true);
            });
          },
          onFail: err => {
            if ($dd.ios || $dd.android) {
              $dd.device.notification.hidePreloader({});
            }
            console.log('【框架日志】用户不在当前企业 退出');
            Toast('requestAuthCode fail: ' + JSON.stringify(err));
            resolve(false)
          }
        });
      });
    }
  })
}
