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
	                <div class="home-head-editbtn"></div>
	                <img src="./asset/pic.png" alt="">
	            </div>
	            <div class="home-head-name">
	                Eminem
	            </div>
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
	        <div class="home-order-title">
	            <img src="./asset/home_order.png" alt="" class="head-icon">
	            全部订单

	            <span class="fr">
	                <img src="./asset/right_arrow.png">
	            </span>
	        </div>
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
	        <div class="home-item" v-for="item of home_item_list">
	            <img :src="item.src" />
	            <span>{{item.title}}</span>
	        </div>
	    </div>
	    <!-- 个人中心 功能项 结束 -->
	</div>
</template>

<script type="text/javascript">
	
import Home_data from './home_list.js'

export default{
	data(){
		return {
			home_item_list : Home_data.list_item,
			home_order_list : Home_data.order_list
		}
	}
}

</script>

<style type="text/css" src="./home.css"></style>