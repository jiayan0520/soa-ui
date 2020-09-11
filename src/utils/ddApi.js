import * as $dd from 'dingtalk-jsapi';
import { Toast } from 'vant'
export function complexPicker(system, title, maxUsers) {
  return new Promise(function (resolve, reject) {
    if ($dd.env.platform === 'notInDingTalk') {
      Toast('请在钉钉环境下执行该功能！')
      reject(false)
      return
    }
    $dd.biz.contact.complexPicker({
      title: '选择' + title,
      corpId: system.corpId,
      multiple: true, // 是否多选
      limitTips: '超出了最大人数',
      maxUsers: maxUsers, // 最大可选人数
      pickedUsers: null, // 已选人员id数组，用于回显在选人页面
      pickedDepartments: null, // 已选部门id数组，用于回显在选人页面
      disabledUsers: null, // 不可选用户
      disabledDepartments: null, // 不可选部门
      requiredUsers: [],
      requiredDepartments: [],
      appId: system.appId,
      permissionType: 'xxx',
      responseUserOnly: true, // true：返回人员信息；false：返回人员和部门信息
      startWithDepartmentId: 0, // 0 表示从企业最上层开始；-1 表示从自己所在部门开始
      onSuccess: result => {
        console.group('钉钉选人与部门：');
        console.log(result);
        resolve(result);
      },
      onFail: function (err) {
        // Toast(JSON.stringify(err))
        console.error(err);
        reject(err);
      }
    });
  })
}

export function ding(system, users, text) {
  console.log(system, users, text)
  $dd.biz.ding.create({
    users: users, // 用户列表，工号['100', '101']
    corpId: system.corpId, // 企业id
    type: 1, // 附件类型 1：image  2：link
    alertType: 2, // 钉发送方式 0:电话, 1:短信, 2:应用内
    alertDate: { 'format': 'yyyy-MM-dd HH:mm', 'value': new Date() },
    attachment: {
      images: ['']
    }, // 附件信息
    text: text, // 正文
    bizType: 0, // 业务类型 0：通知DING；1：任务；2：会议；
    // confInfo: {
    //   bizSubType: 0, // 子业务类型如会议：0：预约会议；1：预约电话会议；2：预约视频会议；（注：目前只有会议才有子业务类型）
    //   location: '某某会议室', // 会议地点；（非必填）
    //   startTime: { 'format': 'yyyy-MM-dd HH:mm', 'value': '2015-05-09 08:00' }, // 会议开始时间
    //   endTime: { 'format': 'yyyy-MM-dd HH:mm', 'value': '2015-05-09 08:00' }, // 会议结束时间
    //   remindMinutes: 30, // 会前提醒。单位分钟-1：不提醒；0：事件发生时提醒；5：提前5分钟；15：提前15分钟；30：提前30分钟；60：提前1个小时；1440：提前一天；
    //   remindType: 2 // 会议提前提醒方式。0:电话, 1:短信, 2:应用内
    // },
    // taskInfo: {
    //   ccUsers: ['100', '101'], // 抄送用户列表，工号
    //   deadlineTime: { 'format': 'yyyy-MM-dd HH:mm', 'value': '2015-05-09 08:00' }, // 任务截止时间
    //   taskRemind: 30// 任务提醒时间，单位分钟0：不提醒；15：提前15分钟；60：提前1个小时；180：提前3个小时；1440：提前一天；
    // },

    onSuccess: function () {
      // onSuccess将在点击发送之后调用
    },
    onFail: function () { }
  })
}
