// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import http_url from './http/http_conf'

import Toast from './components/Common/Toast/Toast'

//注入Http配置
Vue.prototype.$url = http_url;
//Dev UserId
Vue.prototype.$userId = null;
//注入Toast
Vue.prototype.$Toast = Toast;

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
