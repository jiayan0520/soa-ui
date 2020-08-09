import api from '@/api'

// 生成32位uuid
export function uuid32() {
  var s = [];
  var hexDigits = '0123456789abcdef';
  for (var i = 0; i < 32; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23];
  var uuid = s.join('');
  return uuid;
}

// 统一上传方法
export function uploadFile(file, annexId) {
  return new Promise((resolve, reject) => {
    api.upload(file).then((res) => {
      res.annexId = annexId
      res.type = 'task'
      resolve(res)
    }).catch(() => { reject() })
  })
}
// 计算时间差
export function computeDiffTime(date) {
  const nowDate = new Date().getTime()
  let dealine = new Date(date).getTime()
  if (!dealine) {
    dealine = new Date(date.replace(/\-/g, '/')).getTime()
  }
  const timeDiff = dealine - nowDate
  const timeDiffAbs = Math.abs(timeDiff)
  // 计算出相差天数
  var days = Math.floor(timeDiffAbs / (24 * 3600 * 1000))
  // 计算出小时数
  var leave1 = timeDiffAbs % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
  var hours = Math.floor(leave1 / (3600 * 1000))
  const res = {
    value: (timeDiff > 0 ? '距截止还剩' : '已逾期') + days + '天' + hours + '小时',
    type: timeDiff > 0 ? 'success' : 'danger'
  }
  return res
}
