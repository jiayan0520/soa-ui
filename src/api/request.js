import axios from 'axios';
import _ from 'lodash';
import { Toast } from 'vant';

const TIMEOUT = process.env.TIMEOUT || 60000;
// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: TIMEOUT // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  Promise.reject(error);
});

// respone拦截器
service.interceptors.response.use(response => {
  const resData = response.data || {};
  if (resData.code >= 300) {
    return Promise.reject(resData.msg)
  }
  if (resData.rows && resData.total) {
    resData.data = {
      rows: response.rows,
      total: response.total
    }
  }
  return resData.data
}, error => {
  if (error && error.stack && error.stack.indexOf('timeout') !== -1) {
    Toast('请求超时,请稍后重试!');
    return Promise.reject(error)
  }
  // Toast('服务器异常,请稍后重试!');
  return Promise.reject(error)
}
);

export function post(url, data, timeout = TIMEOUT, opt = {}) {
  // const autoRefresh = !!store.getters.refreshTimerId;
  return service({
    url: url,
    method: 'post',
    data: data || {},
    timeout: timeout,
    withCredentials: true,
    ...opt
  });
}

export function get(url, data = {}, timeout = TIMEOUT) {
  if (!_.isObject(data)) {
    throw new Error('data is not object, url is ' + url);
  }
  return service({
    url: url,
    method: 'get',
    params: data,
    timeout: timeout
  });
}
// 上传文件
export function uploadFile(url, params = {}) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append(`file`, params.file)
    service.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      Toast.clear()
      if (res.data.code !== 200) {
        Toast(res.data.message);
        reject(res.data.message);
        return;
      }
      resolve(res.data)
    })
  })
}
export default service;
