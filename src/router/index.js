import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index/Index/Index'
import Cart from '@/components/Index/Cart/Cart'
import Home from '@/components/Index/Home/Home'
import ErrorPage from '@/components/Error'

import Foot from '@/components/Common/Foot/Foot'

import ProdustDetail from '@/components/Goods/ProdustDetail/ProdustDetail'
import ProdustList from '@/components/Goods/ProdustList/ProdustList'

import Address from '@/components/Address/Address'

import Login from '@/components/Login/Login/Login'
import Register from '@/components/Login/Register/Register'
import ForgetPassword from '@/components/Login/ForgetPassword/ForgetPassword'
import ForgetPasswordInput from '@/components/Login/ForgetPasswordInput/ForgetPasswordInput'

import Personal from '@/components/Personal/Personal/Personal'

import Order from '@/components/Order/Order'

Vue.use(Router)
/*重定向*/
const routes = [
    {
      path: '/',
      components: {
      	content : Index,
		foot:Foot
      }
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
			title: '首页!'
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
			title: '我的'
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
/*地址相关*/
const AddressPath = [
	{
		path : '/Address',
		components:{
			content : Address
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

/*订单相关*/
const OrderPath = [
	{
		path: '/Order',
		components:{
			content: Order
		}	
	}
]

const router = new Router({
	mode: 'history',
	routes: routes.concat(NavBottom,GoodsPath,AddressPath,LoginPath,PersonalPath,OrderPath),
	linkActiveClass: 'active',
})

export default router