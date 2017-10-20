<template>
	 <div class="cart-list">
	 	<CartItem v-for="(item,index) in Cart_list" :key="index" :seller.sync="item" :index="index" v-on:DelItem="DelItemFunc(index)"></CartItem>

	 	<!-- 购物车结算栏 开始 -->
	    <div class="cart-bar">
	        <div class="checkgroup">
	            <input type="checkbox" id="checkbox" v-model="isAllChecked">
	            <label for="checkbox"></label>
	        </div>
	        <label>全选</label>
	        <div class="cart-bar-price" :class="{noexpress:(Cart_total.express_price==0)}">
	            合计:￥{{Cart_total.price}}
	            <span v-if="Cart_total.express_price != 0">(含运费:￥{{Cart_total.express_price}})</span>
	        </div>
	    
	        <div class="cart-bar-btn">
	            结算(<span>{{Cart_total.number}}</span>)
	        </div>
	    </div>
	    <!-- 购物车结算栏 结束 -->
	 </div>
</template>

<script type="text/javascript">

import axios from 'axios'
import CartItem from '@/components/Common/CartItem/CartItem'

export default{
	data(){
		return {
			Cart_list: [],
			Cart_total:{
				price: 0,
				number: 0,
				express_price: 0
			},
			isAllChecked: false
		}
	},
	mounted(){
		this.GetCartData();
	},
	methods:{
		GetCartData(){
			this.$Toast.show({
				type: 5,
				time: 0
			})
			//获取购物车数据
			this.$axios.request({
				url: this.$url + 'ApiImplements.htm',
				mothods: 'get',
				params:{
					method: 'getCartList',
					token: this.$token,
				}
			}).then((res)=>{
				if(res.data.status == 0){
					this.$Toast.close();
					this.Cart_list = this.Cart_list.concat(res.data.CartList);
				}
			})
		},
		DelItemFunc(index){
			this.$Toast.show({
				title: '是否删除该商品',
				type : 3,
				time: 0,
				callback: (index)=>{
					if(index == 1){
						this.$axios.request({
							url: this.$url + 'ApiImplements.htm',
							methods: 'get',
							params:{
								method: 'DelCart',
								token: this.$token,
								cid: this.Cart_list[index].id
							}
						}).then((res)=>{
							if(res.data.status == 0){
								let tempObject = this.Cart_list;
								tempObject.splice(index,1);
								this.Cart_list = tempObject;
							}
						})
					}
				}
			});
		}
	},watch:{
		Cart_list:{
			/*
			* 购物车 统计
			*/
			handler: function(val,oldVal){
				let List = val;
				let chooseNum = 0;
				let Temp_Total_price = 0;
				let Temp_Total_number = 0;
				//let Temp_Total_expressPrice = 0;
				for(var item of List){
					if(item.ischoose == 1){
						//统计选中商品
						Temp_Total_number += parseInt(item.total);
						Temp_Total_price += ( parseInt(item.total) * parseInt(item.marketprice) );
						//Temp_Total_expressPrice += (parseInt(item.expressprice))
						chooseNum++;
					}
				}
				this.isAllChecked = (this.Cart_list.length == chooseNum);
				this.Cart_total.price = Temp_Total_price;
				this.Cart_total.number = Temp_Total_number;
				//this.Cart_total.express_price = Temp_Total_expressPrice;
			},
      		deep: true
		},
		isAllChecked:function(val,oldVal){
			for(var item of this.Cart_list){
				item.ischoose = val;
			}
		}
	},
	components:{
		CartItem
	}
}

</script>

<style type="text/css" src="./cart.css"></style>