import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import Index from '@/components/Index/Index/Index'
import Cart from '@/components/Index/Cart/Cart'
import Home from '@/components/Index/Home/Home'
const ErrorPage = () => import('@/components/Error')

import Foot from '@/components/Common/Foot/Foot'

const ProdustDetail = () => import('@/components/Goods/ProdustDetail/ProdustDetail')
const ProdustList = () => import('@/components/Goods/ProdustList/ProdustList')

const Address = () => import('@/components/Personal/Address/Address')
const AddressEdit = () => import('@/components/Personal/AddressEdit/AddressEdit')

const Login = () => import('@/components/Login/Login/Login')
const Register = () => import('@/components/Login/Register/Register')
const ForgetPassword = () => import('@/components/Login/ForgetPassword/ForgetPassword')
const ForgetPasswordInput = () => import('@/components/Login/ForgetPasswordInput/ForgetPasswordInput')

const Personal = () => import('@/components/Personal/Personal/Personal')
const Collection = () => import('@/components/Personal/Collection/Collection')

const Order = () => import('@/components/Order/Order/Order')
const OrderDetail = () => import('@/components/Order/OrderDetail/OrderDetail')
const ConfirmOrder = () => import('@/components/Order/ConfirmOrder/ConfirmOrder')
const Evaluate = () => import('@/components/Order/Evaluate/Evaluate')

const PersonalSettings = () => import('@/components/Settings/PersonalSettings/PersonalSettings')

Vue.use(Router)
/*重定向*/
const routes = [
    {
      path: '/',
      redirect: '/Index'
    },
	{
		path: '*',
		components : {
			content : ErrorPage
		},
		meta: {
			title: '404!'
		}
	}
]

/*底部导航*/
const NavBottom = [
	{
		path: '/Index',
		components:{
			content:Index,
			foot:Foot
		},
		meta: {
			title: '首页',
			backgroundColor: '#f2f2f2'
		}
	},
	{
		path: '/Cart',
		components:{
			content: Cart,
			foot: Foot
		},
		meta: {
			title: '购物车',
			LoginAuth: true
		}
	},
	{
		path: '/Home',
		components:{
			content: Home,
			foot: Foot
		},
		meta: {
			title: '我的',
			LoginAuth: true,
			backgroundColor: '#f2f2f2'
		}
	}
]
/*商品相关*/
const GoodsPath = [
	{
		path: '/ProdustDetail',
		components:{
			content: ProdustDetail
		}
	},
	{
		path: '/ProdustList',
		components:{
			content: ProdustList
		},
		meta:{
			title: '商品列表',
			backgroundColor: '#F5F5F5'
		}
	}
]

/*登录相关*/
const LoginPath = [
	{
		path : '/Login',
		components:{
			content: Login
		},
		meta:{
			title: '登录',
			backgroundColor: '#FFF'
		}	
	},
	{
		path: '/Register',
		components:{
			content: Register
		}
	},
	{
		path: '/ForgetPassword',
		components:{
			content : ForgetPassword
		}
	},
	{
		path: '/ForgetPasswordInput',
		components:{
			content: ForgetPasswordInput
		}
	}
]

/*个人中心相关*/
const PersonalPath = [
	{
		path: '/Personal',
		components:{
			content: Personal
		},
		meta: {
			title: '',
			LoginAuth: true
		}
	},
	{
		path: '/Collection',
		components:{
			content: Collection
		},
		meta: {
			title: '我的收藏',
			LoginAuth: true
		}
	}
]

/*地址相关*/
const AddressPath = [
	{
		path : '/Address',
		components:{
			content : Address
		},
		meta: {
			title: '',
			LoginAuth: true,
			backgroundColor: "#F5F5F5"
		}
	},
	{
		path: '/AddressEdit',
		components:{
			content : AddressEdit
		},
		meta: {
			title: '',
			LoginAuth: true
		}
	}
]

/*订单相关*/
const OrderPath = [
	{
		path: '/Order',
		components:{
			content: Order
		},
		meta: {
			title: '',
			LoginAuth: true
		}
	},
	{
		path: '/OrderDetail',
		components:{
			content: OrderDetail
		},
		meta: {
			title: '',
			LoginAuth: true,
			backgroundColor: "#F5F5F5"
		}
	},
	{
		path: '/ConfirmOrder',
		components:{
			content: ConfirmOrder
		},
		meta: {
			title: '',
			LoginAuth: true,
			backgroundColor: "#F5F5F5"
		}
	},
	{
		path: '/Evaluate',
		components:{
			content: Evaluate
		},
		meta: {
			title: '',
			LoginAuth: true
		}
	}
]

/*设置相关*/
const SettingsPath = [
	{
		path: '/PersonalSettings',
		components:{
			content: PersonalSettings
		},
		meta:{
			title: '资料编辑',
			LoginAuth: true
		}
	}
]

const routesAll = routes.concat(
	NavBottom,
	GoodsPath,
	AddressPath,
	LoginPath,
	PersonalPath,
	OrderPath,
	SettingsPath
);

const router = new Router({
	mode: 'history',
	routes: routesAll,
	linkActiveClass: 'active',
})

//路由导航钩子
router.beforeEach((to, from, next) => {

	
	let login_token = Vue.prototype.$token;
	let localCode = localStorage.getItem('login_code');
	let LoginAuth = to.meta.LoginAuth;

	let AutoLogin = function(callback){

		//有登录码，自动登录，验证状态
		axios.request({
			url: Vue.prototype.$url + '/AutoLogin.htm',
			params:{
				code : localCode
			},
			method: "get"
		}).then((res)=>{
			if(res.data.status == 0){
				Vue.prototype.$token = res.data.data.token;
				if(callback) callback(0);
			}else{
				//登录码失效
				localStorage.setItem('login_code','');
				localStorage.setItem('login_token','');
				if(callback) callback(-1);
			}
		}).catch((err)=>{
			//网络错误，无法验证Code，清除token
			localStorage.setItem('login_code','');
			if(callback) callback(-1);
		});
	}

	if(localCode){
		//有登录码
		if(!LoginAuth && login_token == ''){
			//无需用户验证
			AutoLogin();
			next();
		}else if(LoginAuth && login_token == ''){
			//需用户验证
			AutoLogin((res)=>{
				if(res == 0){
					next({
						path : to.fullpage
					})
				}else{
					next({
						path : '/login'
					})
					return;
				}
			})
		}else{
			next();
		}
	}else if(!localCode){
		if(login_token == '' && LoginAuth){
			next({
				path : '/login'
			})
			return;
		}else{
			next();
		}
	}else{
		next();
	}

	/*处理Title*/
	document.title = to.meta.title == undefined ? 'Honey' : to.meta.title 

	const defaultBackground = '#FFF';

	/*处理Meta 背景设置*/
	if(to.meta.backgroundColor) {
		document.getElementsByTagName('body')[0].style.background = to.meta.backgroundColor
	}else{
		document.getElementsByTagName('body')[0].style.background = defaultBackground;
	}

})

export default router