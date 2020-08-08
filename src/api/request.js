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
  // store.commit('updateLoadingStatus', { isLoading: true })
  const resData = response.data || {};
  if (resData.rows && resData.total) {
    resData.data = {
      rows: resData.rows,
      total: resData.total
    }
  }
  return resData.data
}, error => {
  if (error && error.stack && error.stack.indexOf('timeout') !== -1) {
    Toast('请求超时,请稍后重试!');
    return Promise.reject(error)
  }
  let errorText;
  if (typeof error.response !== 'undefined' && typeof error.response.data !== 'undefined' && typeof error.response.data.error !== 'undefined') {
    errorText = error.response.data.error.errorText;
  } else {
    errorText = error;
  }
  // Toast('服务器异常,请稍后重试!');
  return Promise.reject(errorText)
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
      Toast.fail('上传文件失败');
      Toast.clear()
      resolve(res.data)
    }).catch((e) => {
      Toast.fail('上传文件失败');
      reject();
    })
  })
}
export default service;
