<template>
	<div class="order-content">
        <!-- 全部订单 开始 -->
        <div class="order-content-item active" id="scroll_list">

			<div class="add-header">
				<img src="static/images/add.png">
				添加收货地址
			</div>

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
							<span>运费<em>0</em>元</span>
                        </div>

                         <div class="star-score clearfix">
                            <span>共1件商品，优惠0.00元 </span>
							<span>实付:￥33098</span>
                        </div>

						<div class="blank-block"></div>
                        
                    </li>
                </ul>
            </div>

            <form class="pay-way-container">
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

				<div class="submit-footer clearfix">
					<p class="footer-left">
						共<span>1</span>件，合计：<span>￥30398.00</span>
					</p>
					<div class="footer-right">提交订单</div>
				</div>
			</form>


        </div>
    </div>
</template>

<script type="text/javascript">
	
export default{
	data(){
		return {
			Address:{},
			GoodsList:[]
		}
	},
	mounted(){
		this.GetConfirmOrderData();
	},
	methods:{
		GetConfirmOrderData(){
			this.$Toast.show({
				type: 5,
				time: 0
			});
			this.$axios.request({
				url: this.$url + 'ApiImplements.htm',
				methods: 'get',
				params:{
					token: this.$token,
					method: 'getConfirmData'
				}
			}).then((res)=>{
				if(res.data.status == 0){
					this.GoodsList = res.data.data.CartList;
				}
				this.$Toast.close();
			});
		}
	}
}

</script>

<style type="text/css" src="./ConfirmOrder.css"></style>