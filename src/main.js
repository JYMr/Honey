// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'
import http_url from './http/http_conf'

import Toast from './components/Common/Toast/Toast'

const instance = axios.create();

//axios 全局 拦截器,用于token验证返回跳转
instance.interceptors.response.use(function (response) {
	//Token 非法时，重新登录
	if(response.data.status == -2){
		//尝试关闭Toast
		Toast.close();
		//跳转 /Login
		router.push({
			path: '/Login'
		})
		return null;
	}else{
		return response;	
	}
}, function (error) {
	return Promise.reject(error);
});


//注入Http配置
Vue.prototype.$url = http_url;
//Dev UserId
Vue.prototype.$token = null;
//注入Toast
Vue.prototype.$Toast = Toast;
//注入axios
Vue.prototype.$axios = instance;

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
