<template>
	<div class="orderDetail">
		
		<div class="orderStatus">
			<span>订单编号：{{OrderDetail.orderSn}}</span>
			<span>订单状态：<i v-if="OrderDetail.status == -1">已取消</i>
                            <i v-if="OrderDetail.status == 0">待付款</i>
                            <i v-if="OrderDetail.status == 1">待发货</i>
                            <i v-if="OrderDetail.status == 2">待收货</i>
                            <i v-if="OrderDetail.status == 3">交易成功</i>
                            <i v-if="OrderDetail.status == -6">已退款</i>
                            <i v-if="OrderDetail.status == -2">退款中</i>
            </span>
		</div>

		<div class="orderProduct">
			<div class="OrderProductList">
	            <!-- 订单商品 开始 -->
	            <OrderProductItem v-for="item of OrderDetail.goodsList" :seller="item"></OrderProductItem>
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
				this.OrderDetail = res.data.OrderDetail;
				this.$Toast.close();
			})
		}
	},
	components:{
		OrderProductItem
	}
}

</script>

<style type="text/css" src="./OrderDetail.css"></style>