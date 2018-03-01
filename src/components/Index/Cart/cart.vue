<template>
	 <div class="cart-list">
	 	<CartItem v-for="(item,index) in Cart_list" :key="index" :seller.sync="item" :ischoose.sync="item.ischoose"  :index="index" v-on:DelItem="DelItemFunc(index)"></CartItem>

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
	    
	        <div class="cart-bar-btn" @click="ConfirmOrder">
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
				url: this.$url + 'Api.htm',
				mothods: 'get',
				params:{
					method: 'getCartList',
					token: this.$token,
				}
			}).then((res)=>{
				if(res.data.status == 0){
					this.$Toast.close();
					let temp_List = res.data.CartList;
					this.Cart_list = this.Cart_list.concat(temp_List);
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
							url: this.$url + 'Api.htm',
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
		},
		ConfirmOrder(){
			let CartList = this.Cart_list;
			let chooseNum = 0;
			for(var item of CartList){
				if(item.ischoose == 1){
					//统计选中商品
					chooseNum++;
				}
			}
			if(chooseNum == 0){
				this.$Toast.show({
					title: "请选择需要结算的商品",
					time: 1500
				});
				return;
			}
			this.$router.push({
				path: '/ConfirmOrder'
			})
		}
	},watch:{
		Cart_list:{
			/*
			* 购物车 统计
			*/
			handler: function(newVal,oldVal){
				let List = newVal;
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
				console.log(chooseNum)
				this.isAllChecked = (this.Cart_list.length == chooseNum);
				this.Cart_total.price = Temp_Total_price.toFixed(2);
				this.Cart_total.number = Temp_Total_number;
				//this.Cart_total.express_price = Temp_Total_expressPrice;
			},
      		deep: true
		},
		isAllChecked:function(newVal,oldVal){
			for(var item of this.Cart_list){
				item.ischoose = newVal ? 1 : 0;
			}
		}
	},
	components:{
		CartItem
	}
}

</script>

<style type="text/css" src="./cart.css"></style>