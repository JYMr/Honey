<template>
	<div class="orderDetail">
		
		<div class="orderStatus">
			<span>订单编号：DD20160806</span>
			<span>订单状态：<i>派送中</i></span>
		</div>

		<div class="orderProduct">
			<div class="OrderProductList">
	            <!-- 订单商品 开始 -->
	            <!-- <OrderProductItem :seller=></OrderProductItem> -->
	            <!-- 订单商品 结束 -->
	        </div>
		</div>
	</div>
</template>

<script type="text/javascript">
	
import OrderProductItem from '@/components/Order/OrderProductItem/OrderProductItem'

export default{
	data(){
		return {

		}
	},
	mounted(){
	},
	methods:{
	},
	component:{
		OrderProductItem
	}
}

</script>

<style type="text/css" src="./OrderDetail.css"></style>