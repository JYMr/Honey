<template>
	<div class="home footerNav">
		 <header>
	        <div class="header-left">
	            <img src="./asset/left_arrow.png" alt="">
	        </div>
	        个人中心
	        <div class="header-right">
	            <img src="./asset/setting.png">
	        </div>
	    </header>

	    <!-- 个人中心 头部信息 开始 -->
	    <div class="home-head">
	        
	        <div class="home-head-icon">
	            <div class="home-head-img">
	                <router-link to="/PersonalSettings" tag="div"  class="home-head-editbtn"></router-link>
	                <img src="./asset/pic.png" alt="">
	            </div>
	            <div class="home-head-name">
	                {{nikeName}}
	            </div>
	            <i class="anim1"></i>
	            <i class="anim2"></i>
	            <i class="anim3"></i>
	            <i class="anim4"></i>
	        </div>

	    </div>
	    <!-- 个人中心 头部信息 结束 -->

	    <!-- 积分 优惠栏 开始 -->
	    <div class="home-bar clearfix">
	        <div class="home-bar-item">
	            <span>
	                <img src="./asset/list01.png">
	                积分
	            </span>
	        </div>
	        <div class="home-bar-item">
	            <span>
	                <img src="./asset/list02.png">
	                优惠券
	            </span>
	        </div>
	    </div>
	    <!-- 积分 优惠栏 结束 -->

	    <!-- 个人中心 订单栏 开始 -->
	    <div class="home-order">
	        <router-link tag="div" class="home-order-title" :to="{ path: '/Order'}">
	            <img src="./asset/home_order.png" alt="" class="head-icon">
	            全部订单

	            <span class="fr">
	                <img src="./asset/right_arrow.png">
	            </span>
	        </router-link>
	        <div class="home-order-list clearfix">
	            <router-link tag="div" class="home-order-list-item" v-for="(item,index) of home_order_list" :to="index == 4 ? {path: 'Cart'} :{ path: 'Order', query: { status: index }}" :key="'Order_'+index">
	                <img :src="item.src" :alt="item.title">
	                <span>{{item.title}}</span>
	                <i v-if="item.number">{{item.number}}</i>
	            </router-link>
	        </div>
	    </div>
	    <!-- 个人中心 订单栏 结束 --> 

	    <!-- 个人中心 功能项 开始 -->
	    <div class="home-item-content clearfix">
	        <router-link tag="div" class="home-item" v-for="(item,index) of home_item_list" :to="{path: item.path}" :key="index">
	            <img :src="item.src" />
	            <span>{{item.title}}</span>
	        </router-link>
	    </div>
	    <!-- 个人中心 功能项 结束 -->
	</div>
</template>

<script type="text/javascript">
	
import Home_data from './home_list.js'

export default{
	data(){
		return {
			nikeName: null,
			home_item_list : Home_data.list_item,
			home_order_list : Home_data.order_list
		}
	},
	mounted(){
		this.GetHomeData();
	},
	methods:{
		GetHomeData(){
			this.$Toast.show({
				type: 5
			});

			this.$axios.request({
				url: this.$url + 'Api.htm',
				methods: 'get',
				params:{
					token: this.$token,
					method: 'getMember'
				}
			}).then((res)=>{
				this.nikeName = res.data.data.member.nikeName;
				this.$Toast.close();
			});
		}
	}
}

</script>

<style type="text/css" src="./home.css"></style>