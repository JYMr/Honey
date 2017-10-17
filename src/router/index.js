import Vue from 'vue'
import Router from 'vue-router'
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

const Order = () => import('@/components/Order/Order/Order')
const ConfirmOrder = () => import('@/components/Order/ConfirmOrder/ConfirmOrder')

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
			title: '首页'
		}
	},
	{
		path: '/Cart',
		components:{
			content: Cart,
			foot: Foot
		},
		meta: {
			title: '购物车'
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
			LoginAuth: true
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
		}
	}
]

/*登录相关*/
const LoginPath = [
	{
		path : '/Login',
		components:{
			content: Login
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
		}
	}
]

/*地址相关*/
const AddressPath = [
	{
		path : '/Address',
		components:{
			content : Address
		}
	},
	{
		path: '/AddressEdit',
		components:{
			content : AddressEdit
		}
	}
]

/*订单相关*/
const OrderPath = [
	{
		path: '/Order',
		components:{
			content: Order
		}
	},
	{
		path: '/ConfirmOrder',
		components:{
			content: ConfirmOrder
		}
	}
]

const router = new Router({
	mode: 'history',
	routes: routes.concat(NavBottom,GoodsPath,AddressPath,LoginPath,PersonalPath,OrderPath),
	linkActiveClass: 'active',
})

//路由导航钩子
router.beforeEach((to, from, next) => {

	let login_token = localStorage.getItem("login_token");

	if(to.meta.LoginAuth && login_token == null){
		login_token = to.query.login_token;
		if(login_token){
			localStorage.setItem("login_token",login_token)
			next({
				path : to.fullpage
			})
		}else{
			next({
				path : '/login'
			})
		}
	}else{
		next();
	}

	/*处理Title*/
	document.title = to.meta.title == undefined ? 'Honey' : to.meta.title 

	/*处理Meta 背景设置*/
	if(to.meta.backgroundColor) {
		document.getElementsByTagName('body')[0].style.background = to.meta.backgroundColor
	}else{
		document.getElementsByTagName('body')[0].style.background = '';
	}

})

export default router