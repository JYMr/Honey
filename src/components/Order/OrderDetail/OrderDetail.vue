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
			OrderDetail: {}
		}
	},
	mounted(){
		this.GetOrderDetail();
	},
	methods:{
		GetOrderDetail(){
			this.$Toast.show({
				type: 5,
				time: 0
			});

			this.$axios.request({
				url: this.$url + "/Api.htm",
				methods: 'get',
				params:{
					token: this.$token,
					method: 'getOrderDetail',
					ordersn: this.$route.query.ordersn,
				}
			}).then((res)=>{
				console.log(res)
				this.$Toast.close();
			})
		}
	},
	component:{
		OrderProductItem
	}
}

</script>

<style type="text/css" src="./OrderDetail.css"></style>