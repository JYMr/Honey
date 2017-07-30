import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index/Index/Index'
import Cart from '@/components/Index/Cart/Cart'
import Home from '@/components/Index/Home/Home'

import Foot from '@/components/Common/Foot/Foot'

import ProdustDetail from '@/components/Goods/ProdustDetail/ProdustDetail'

Vue.use(Router)

const routes = [
    {
      path: '/',
      name: 'Index',
      components: Index
    },
	{
		path: '*',
		components : Index,
		meta: {
			title: '404!'
		}
	}
]

const NavBottom = [
	{
		path: '/Index',
		components:{
			content:Index,
			foot:Foot
		}
	},
	{
		path: '/Cart',
		components:{
			content: Cart,
			foot: Foot
		}
	},
	{
		path: '/Home',
		components:{
			content: Home,
			foot: Foot
		}
	}
]

const Goods = [
	{
		path: '/Goods/ProdustDetail',
		components:{
			content: ProdustDetail
		}
	}
]

const router = new Router({
	mode: 'history',
	routes: routes.concat(NavBottom,Goods)
})

router.push('Index')

export default router