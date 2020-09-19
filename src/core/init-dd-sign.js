import api from '@/api'
import * as $dd from 'dingtalk-jsapi';
/**
 * 将调用钉钉的接口先进行签名
 */
export default async function initDdSign(store, router) {
  const system = store.getters['core/system']
  // alert('【框架日志】我进来授权了', system.ddSingUrl);
  await api.getAppInfo({ url: system.ddSingUrl }).then(res => {
    // alert('钉钉签名，授权钉钉接口' + JSON.stringify(res));
    const { agentId, corpId, timeStamp, nonceStr, signature } = res
    $dd.config({
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
        'biz.map.locate',
        'device.geolocation.get',
        'biz.ding.create'
      ] // 必填，需要使用的jsapi列表，注意：不要带dd。
    });
    $dd.error(function (error) {
      console.log('jsapi err' + JSON.stringify(error));
      /**
       {
          errorMessage:"错误信息",// errorMessage 信息会展示出钉钉服务端生成签名使用的参数，请和您生成签名的参数作对比，找出错误的参数
          errorCode: "错误码"
       }
      **/
      // alert('dd error: ' + JSON.stringify(error));
    });
  }).catch(err => {
    alert('获取app的接口失败了' + err);
  });
}
