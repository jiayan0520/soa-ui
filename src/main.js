// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'vant/lib/index.css'
import './assets/index.scss'
import 'vue2-datepicker/index.css';
import '@/assist/permission'; // 权限控制
import Vant from 'vant'
import * as dd from 'dingtalk-jsapi'; // 此方式为整体加载，也可按需进行加载
import store from '@/store'
import api from '@/api'

Vue.config.productionTip = false
Vue.use(Vant)
Vue.prototype.$api = api; // 全局接口
Vue.prototype.$dd = dd;
Vue.prototype.$store = store;
// 是否开启mock
if (process.env.NODE_ENV !== 'production') {
  require('@/mock');
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
