<template>
	 <div class="cart-list">
	 	<CartItem v-for="(item,index) in Cart_list" :key="index" :seller.sync="item" :index="index" v-on:DelItem="DelItemFunc(index)"></CartItem>
	 </div>
</template>

<script type="text/javascript">

import axios from 'axios'
import CartItem from '@/components/Common/CartItem/CartItem'
	
require('./cart.css');

export default{
	data(){
		return {
			Cart_list: []
		}
	},
	created(){
		this.GetCartData();
	},
	methods:{
		GetCartData(){
			axios.request({
				url: 'http://localhost/cart.php',
				mothods: 'get',
				params:{
					pagesize: 8,
					no: 1,
					method: 'get'
				}
			}).then((res)=>{
				if(res.data.status == 0){
					this.Cart_list = this.Cart_list.concat(res.data.cart);
				}
			})
		},
		DelItemFunc(index){
			if(confirm('是否删除该商品')){

				axios.request({
					url: 'http://localhost/cart.php',
					methods: 'get',
					params: {
						method : 'del',
						id : this.Cart_list[index].id
					}
				}).then((res)=>{
					if(res.data.status == 0){
						console.log(res.data.msg);

						let tempObject = this.Cart_list;
						tempObject.splice(index,1);
						this.Cart_list = tempObject;
					}
				})
			}
		}
	},
	components:{
		CartItem
	},
	watch:{
		Cart_list:{
			deep: true,
			handler(){
				let i=0;
				for(i in this.Cart_list){
					console.log(i+' '+this.Cart_list[i].ischoose);
				}
			}
		}
	}
}

</script>