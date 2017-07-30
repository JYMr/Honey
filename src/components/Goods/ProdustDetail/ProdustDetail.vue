<template>
	<div>
		
		<!-- 商品大图轮播 开始 -->
    	<Banner v-bind:seller="Produst_banner_list"></Banner>
		<!-- 商品大图轮播 结束 -->

		<!-- 商品信息 开始 -->
		<div class="detail-produst">
			
			<div class="detail-produst-name">
				{{Produst.itemname}}
			</div>

			<div class="detail-produst-text">
				我跟你说，你买不起
			</div>

			<div class="detail-produst-price">
				
				￥{{Produst.productprice}}
				
				<del>原价: ￥{{Produst.marketprice}}</del>

			</div>

			<div class="detail-produst-text">
				免邮
				<span class="fr">已售{{Produst.number}}件</span>
			</div>

		</div>
		<!-- 商品信息 结束 -->

		
		<!-- 商品详情选项卡Tab 开始 -->
		<div class="detail-tab">
			<div class="detail-tab-item active">商品详情</div>
		</div>
		<!-- 商品详情选项卡Tab 结束 -->

		<!-- 商品详情选项卡 容器 开始 -->
		<div class="detail-content">
			<div class="detail-content-item active">
				<div v-html="Produst.content"></div>
			</div>
		</div>
		<!-- 商品详情选项卡 容器 结束 -->


	    <footer>
	        <div class="bar-btn">
	            <div class="like_content like"></div>
	            <span>收藏</span>
	        </div>
	        <div class="bar-btn">
	            <img :src="Customer">
	            <span>
	                咨询
	            </span>
	        </div>
	        <div class="ftactive" v-on:click="AddCart">
	               加入购物车
	        </div>
	         <div class="ftactive">
	               立即购买
	        </div>
	    </footer>

	</div>
</template>

<script type="text/javascript">

require('./ProdustDetail.css');

import Banner from '@/components/Common/Banner/Banner'
import axios from 'axios'

export default{
	data(){
		return {
			Customer: '../static/images/customer.png',
			id : this.$route.query.id,
			Produst: {},
			Produst_banner_list : {
				data:[]
			}
		}
	},
	created(){
		this.GetProdustDetail();
	},
	methods:{
		GetProdustDetail(){
			//获取商品详细信息
			var _self = this;
			axios.request({
				url: 'http://localhost/detail.php',
				methods: 'get',
				params:{
					id : _self.id
				}
			}).then((res)=>{
				if(res.data.status == 0){
					_self.Produst = res.data.data;
					_self.Produst_banner_list.data = res.data.data.src;
				}
			})
		},
		AddCart(){
			//加入购物车
			axios.request({
				url: 'http://localhost/cart.php',
				methods: 'get',
				params:{
					method : 'insert',
					id: this.id
				}
			}).then((res)=>{
				if(res.data.status == 0){
					console.log('添加成功');
				}
			});
		}
	},
	components:{
		Banner
	}
}

</script>