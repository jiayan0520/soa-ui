// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'vant/lib/index.css'
import './assets/index.css'
import 'vue2-datepicker/index.css';
import '@/assist/permission'; // 权限控制
import { Dialog } from 'vant';

Vue.config.productionTip = false
Vue.use(Dialog);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
