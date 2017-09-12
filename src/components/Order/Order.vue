<template>
	<div class="order">

	    <div class="order-tab">
	        <div class="order-tab-item active">全部</div>
	        <div class="order-tab-item">待付款</div>
	        <div class="order-tab-item">待发货</div>
	        <div class="order-tab-item">待收货</div>
	        <div class="order-tab-item">待评价</div>
	    </div>

	    <div class="order-content">
	        <!-- 全部订单 开始 -->
	        <div class="order-content-item active" id="scroll_list">
	            <div class="order-list">
	                <ul>
	                    <li v-for="item of OrderList">
	                        <div class="order-title">
	                            <img src="images/order_title_icon.png">
	                            {{item.orderSn}}
	                            <span class="order-action">待收货</span>
	                        </div>
	                        <ul>
	                            <!-- 订单商品 开始 -->
	                            <li v-for="produstitem of item.goodsList">
	                                <div class="produst-img"><img :src="produstitem.src" alt=""></div>
	                                <div class="produst-data">
	                                    <h4>{{produstitem.title}}</h4>
	                                    <div class="produst-data-info">
	                                        <span class="price">￥{{produstitem.marketprice}}</span>
	                                        <span class="num">x1</span>
	                                    </div>
	                                </div>
	                            </li>
	                            <!-- 订单商品 结束 -->
	                        </ul>
	                        <div class="order-total">
	                            共1件商品，合计￥{{item.price}}(含运费￥0.00)
	                        </div>
	                        <div class="order-btn">
	                            <a href="javascript:;" class="fr btn btn-sm-outline">确认收货</a>
	                        </div>
	                    </li>
	                </ul>
	                <div class="order-list-more">
	                    上拉加载更多数据
	                </div>
	            </div>
	        </div>
	        <!-- 全部订单 结束 -->
	        <div class="order-content-item"></div>
	        <div class="order-content-item"></div>
	        <div class="order-content-item"></div>
	        <div class="order-content-item"></div>
	    </div>
	</div>
</template>

<script type="text/javascript">

import axios from 'axios'
	
export default{
	data(){
		return {
			OrderList: [],
			no: 1
		}
	},
	mounted(){
		this.GetOrderList();
	},
	methods:{
		GetOrderList(){
			axios.request({
				url: this.$url + 'ApiImplements.htm',
				methods: 'get',
				params:{
					userid: 'orwX1sjqDWIOXtusI4Tab23-eyIk',
					method: 'getOrderList',
					page: 8,
					no: this.no
				}
			}).then((res)=>{
				if(res.data.status == 0){
					this.OrderList = res.data.OrderList
				}
			})
		}
	}
}

</script>

<style type="text/css" src="./Order.css"></style>