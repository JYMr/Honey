import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index/Index/Index'
import Cart from '@/components/Index/Cart/Cart'
import Home from '@/components/Index/Home/Home'
import Error from '@/components/Error'

import Foot from '@/components/Common/Foot/Foot'

import ProdustDetail from '@/components/Goods/ProdustDetail/ProdustDetail'
import ProdustList from '@/components/Goods/ProdustList/ProdustList'

import Address from '@/components/Address/Address'

Vue.use(Router)

const routes = [
    {
      path: '/',
      components: Index
    },
	{
		path: '*',
		components : Error,
		meta: {
			title: '404!'
		}
	}
]

const NavBottom = [
	/*{
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
	}*/
]

const Goods = [
	/*{
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
	}*/
]

const AddressVie = [
	{
		path : '/Address',
		components:{
			content : Address
		}
	}
]

const router = new Router({
	mode: 'history',
	routes: routes.concat(NavBottom,Goods,AddressVie),
	linkActiveClass: 'active',
})
router.push('/Address')

export default router