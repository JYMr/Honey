<template>
	<div class="nav">
        <div class="tab" v-for="item in NavList">
            <router-link :to="item.link">
            	<span :class="item.class"></span>
            	{{item.title}}
            </router-link>
        </div>
    </div>
</template>

<script type="text/javascript">
	
export default{
	data(){
		return {
			NavList:[
				{
					link: '/Index',
					title: '首页',
					class: 'index'
				},
				{
					link: '/Cart',
					title: '购物车',
					class: 'cart'
				},
				{
					link: '/Home',
					title: '我的',
					class: 'home'
				}
			]
		}
	},
	mounted(){
		
	}
}
</script>

<style type="text/css" src="./Foot.css"></style>