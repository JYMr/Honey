<template>
	<div class="nav">
        <div class="tab" v-for="item in NavList">
            <router-link :to="item.link">{{item.title}}</router-link>
        </div>
    </div>
</template>

<script type="text/javascript">

require('./Foot.css');
	
export default{
	data(){
		return {
			NavList:[
				{
					link: '/Index',
					title: '首页'
				},
				{
					link: '/Cart',
					title: '购物车'
				},
				{
					link: '/Home',
					title: '我的'
				}
			]
		}
	},
	mounted(){
		
	}
}
</script>