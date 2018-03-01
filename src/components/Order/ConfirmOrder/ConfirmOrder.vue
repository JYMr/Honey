<template>
	<div class="order-content">
        <!-- 全部订单 开始 -->
			<router-link tag="div" :to="{path: '/Address', query: {'c':1}}" class="add-header" v-if="Address == undefined">
				<img src="static/images/add.png">
				添加收货地址
			</router-link>

			<router-link tag="div" :to="{path: '/Address', query: {'c':1}}" class="address-content" v-if="Address != undefined">
				<div>
					<span class="name">{{Address.name}}</span>
					<span class="mobile">{{Address.mobile}}</span>
				</div>
				<div>
					<span class="address">{{Address.province}}{{Address.city}}{{Address.area}}{{Address.address}}</span>
				</div>
			</router-link>

			<div class="blank-block"></div>

            <div class="order-list">
                <ul>
                    <li>
                        <div class="order-title">
                            <!-- <img src="images/order_title_icon.png"> -->
                            Darry Ring
                        </div>
                        <ul>
                            <!-- 订单商品 开始 -->
                            <li v-for="(item, index) of GoodsList">
                                <div class="produst-img"><img :src="item.src" alt=""></div>
                                <div class="produst-data">
                                    <h4>{{item.title}}</h4>
                                    <div class="produst-data-info">
                                        <span class="num">x{{item.total}}</span>
                                        <span class="price">￥{{item.marketprice}}</span>
                                    </div>
                                </div>
                            </li>
                        </ul>

                        <!-- 配送方式，商品共计 -->
                        <div class="star-score clearfix">
                            <span>配送方式</span>
							<span v-if="ExpressPrice != 0">运费<em>{{ExpressPrice}}</em>元</span>
                        </div>

                         <div class="star-score clearfix">
                            <span>共{{Total}}件商品，优惠0.00元 </span>
							<span>实付:￥{{TotalPrice}}</span>
                        </div>

						<div class="blank-block"></div>
                        
                    </li>
                </ul>
            </div>

            <div class="pay-way-container">
				<h3>支付方式</h3>
				<div class="pay-way clearfix">
					<div class="radiogroup">
						<input type="radio" id="radiobox1" name="pay-way">
						<label for="radiobox1"></label>
					</div>
					<label for="radiobox1">
						<span>支付宝</span>
						<span>支持大额订单支付</span>
					</label>
				</div>

				<div class="pay-way clearfix">
					<div class="radiogroup">
						<input type="radio" id="radiobox2" name="pay-way">
						<label for="radiobox2"></label>
					</div>
					<label for="radiobox2">
						<span>微信支付</span>
						<span>绿色通道，安全便捷</span>
					</label>
				</div>

				<div class="pay-way clearfix">
					<div class="radiogroup">
						<input type="radio" id="radiobox3" name="pay-way">
						<label for="radiobox3"></label>
					</div>
					<label for="radiobox3">
						<span>银行卡支付</span>
						<span>支持储蓄卡信用卡，无需开通网银</span>
					</label>
				</div>
			</div>

			<div class="submit-footer clearfix">
				<p class="footer-left">
					共<span>{{Total}}</span>件，合计：<span>￥{{TotalPrice}}</span>
				</p>
				<div class="footer-right">提交订单</div>
			</div>
    </div>
</template>

<script type="text/javascript">
	
export default{
	data(){
		return {
			Address:{},
			GoodsList:[],
			Total: 0,
			TotalPrice: 0,
			ExpressPrice: 0,
			AddressId: undefined
		}
	},
	mounted(){
		if(sessionStorage.AddressId){
			this.AddressId = sessionStorage.AddressId;
			this.GetAddress(this.AddressId);
		}
		this.GetConfirmOrderData();
	},
	methods:{
		GetConfirmOrderData(){
			this.$Toast.show({
				type: 5,
				time: 0
			});
			this.$axios.request({
				url: this.$url + 'Api.htm',
				methods: 'get',
				params:{
					token: this.$token,
					method: 'getConfirmData'
				}
			}).then((res)=>{
				if(res.data.status == 0){
					this.GoodsList = res.data.data.CartList;
					this.Total = res.data.data.Total;
					this.TotalPrice = res.data.data.Price;
					if(!this.AddressId){
						this.Address = res.data.data.userAddress;
					}
				}
				this.$Toast.close();
			}).catch((err)=>{
				this.$Toast.show({
					type: 1,
					title: "获取订单数据失败，请刷新重试",
					time: 1000
				});
			});
		},
		GetAddress(id){
			this.$axios.request({
				url: this.$url + 'Api.htm',
				methods: 'get',
				params:{
					token: this.$token,
					method: 'getUserAddress',
					aid: id
				}
			}).then((res)=>{
				this.Address = res.data.Address;
				sessionStorage.clear();
			}).catch((err)=>{
				this.$Toast.show({
					type: 1,
					title: "获取地址数据失败，请刷新重试",
					time: 1000
				});
			});
		}
	}
}

</script>

<style type="text/css" src="./ConfirmOrder.css"></style>