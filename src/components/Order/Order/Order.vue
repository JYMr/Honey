<template>
	<div class="order">

	    <div class="order-tab">
	    	<div class="order-tab-item" :class="{'active':status == item.status}" v-for="(item,index) of OrderStatus"  @click="LinkToStatus(index)">{{item.title}}</div>
	    </div>

	    <div class="order-content">
		     <!-- 全部订单 开始 -->
	        <div class="order-content-item active" id="scroll_list">
	            <div class="order-list" v-if="OrderList.length != 0">
	                <ul>
	                    <li v-for="item of OrderList" @click="LinkOrderDetail(item.orderSn)">
	                        <div class="order-title">
	                            {{item.orderSn}}
	                            <span class="order-action" v-if="item.status == -1">已取消</span>
	                            <span class="order-action" v-if="item.status == 0">待付款</span>
	                            <span class="order-action" v-if="item.status == 1">待发货</span>
	                            <span class="order-action" v-if="item.status == 2">待收货</span>
	                            <span class="order-action" v-if="item.status == 3">交易成功</span>
	                            <span class="order-action" v-if="item.status == -6">已退款</span>
	                            <span class="order-action" v-if="item.status == -2">退款中</span>
	                        </div>
	                        <!-- 订单商品 开始 -->
	                        <div class="OrderProductList">
	                        	<OrderProductItem  v-for="(item, index) of item.goodsList" :key="index" :seller="item"></OrderProductItem>
	                        </div>
                            <!-- 订单商品 结束 -->
	                        <div class="order-total">
	                            共1件商品，合计￥{{item.price}}(含运费￥0.00)
	                        </div>
	                        <div class="order-btn" v-if="item.status == 0">
	                            <a href="javascript:;" class="fr btn btn-sm-outline">取消订单</a>
	                            <a href="javascript:;" class="fr btn btn-sm">去付款</a>
	                        </div>
	                        <div class="order-btn" v-if="item.status == 1">
	                            <a href="javascript:;" class="fr btn btn-sm-outline">取消订单</a>
	                        </div>
	                        <div class="order-btn" v-if="item.status == 2">
	                            <a href="javascript:;" class="fr btn btn-sm-outline">确认收货</a>
	                        </div>
	                        <div class="order-btn" v-if="item.status == 3">
	                            <a href="javascript:;" class="fr btn btn-sm-outline">申请售后</a>
	                        </div>
	                        <div class="order-btn" v-if="item.status == -2 || item.status == -6">
	                            <a href="javascript:;" class="fr btn btn-sm-outline">查看售后</a>
	                        </div>
	                    </li>
	                </ul>
	                <div class="order-list-more" v-if='Loadstatus==0'>
	                    上拉加载更多数据
	                </div>
	                <div class="order-list-more" v-if='Loadstatus==1'>
	                    加载中...
	                </div>
	                <div class="order-list-more" v-if='Loadstatus==2'>
	                    没有更多内容了
	                </div>
	            </div>
	            <div class="order-empty" v-if="OrderList.length == 0 && !isNeedLoad">
					<img src="/static/images/collection_empty.png">
					<span>暂时木有订单</span>
	            </div>
	        </div>
	    </div>
	</div>
</template>

<script type="text/javascript">

import OrderProductItem from '@/components/Order/OrderProductItem/OrderProductItem'
	
export default{
	data(){
		return {
			OrderStatus:[{title: '全部',status: ''},{title: '待付款',status: '0'},{title: '待发货',status: '1'},{title: '待收货',status: '2'},{title: '待评价',status: '3'}],
			status: this.$route.query.status || '',
			OrderList: [],
			isNeedLoad : true,//上拉加载阀值,防止多次请求
			Loadstatus : 0,//上拉加载状态 0:未加载 1:加载中 2:所有加载完成
			No : 1,
			PageSize: 8
		}
	},
	mounted(){
		this.GetOrderList();

		window.addEventListener('scroll',this.ListenScroll);
	},
	methods:{
		GetOrderList(callback){
			let _callback;
			if(callback && typeof callback == 'function') 
				_callback=callback();

			this.Loadstatus = 1;

			this.$Toast.show({
				type: 5,
				time: 0
			});

			this.$axios.request({
				url: this.$url + 'Api.htm',
				methods: 'get',
				params:{
					token: this.$token,
					method: 'getOrderList',
					page: this.PageSize,
					no: this.No,
					status: this.status
				}
			}).then((res)=>{
				if(res.data.status == 0){
					if(res.data.OrderList.length == 0){
						this.Loadstatus = 2;
						this.isNeedLoad = false;
					}else if(res.data.OrderList.length < this.PageSize){
						this.Loadstatus = 2;
					}else{
						this.Loadstatus = 0;
					}
					this.OrderList = this.OrderList.concat(res.data.OrderList);
					this.$Toast.close();
					_callback;
					return;
				}
			})
		},
		ListenScroll(){
			//监听滚动：触底加载
			let _self = this;
			if(_self.isNeedLoad){
				if(document.body.scrollHeight - window.innerHeight <= document.body.scrollTop){
					_self.isNeedLoad = false;
					_self.No += 1;
					_self.GetOrderList(function(){
						_self.isNeedLoad = true;
					});
				}
			}
		},
		LinkToStatus(index){
			this.$router.replace({
				path: '/order',
				query: {
					status : this.OrderStatus[index].status
				}
			})
		},
		LinkOrderDetail(sn){
			this.$router.push({
				path: "/OrderDetail",
				query:{
					ordersn: sn
				}
			})
		}
	},
	watch:{
		$route(newVal,oldVal){
			this.status = newVal.query.status;
			this.OrderList = [];
			this.GetOrderList();
		}
	},
	beforeDestroy(){
		window.removeEventListener('scroll',this.ListenScroll);
	},
	components:{
		OrderProductItem
	}
}

</script>

<style type="text/css" src="./Order.css"></style>