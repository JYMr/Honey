<template lang="html">
	<div class="produst_item" v-on:click="LinkToProdustDetail(seller.id)">
		<div>
			<img :src="seller.imagesSrc || Default_img_src">

			<div class="produst-item-text">
				<div class="produst-item-name">{{seller.itemname}}</div>
				<div class="produst-item-price">
					<span class="price-1">￥{{seller.marketprice}}</span>
					<span class="price-2" v-if="seller.productprice">￥{{seller.productprice}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">

    export default {
    	props:{
    		seller: Object
    	},
        data() {
            return {
                Default_img_src: '../static/images/default_img.png'//默认产品图片
            }
        },
        methods:{
			LinkToProdustDetail(Id){
				//跳转产品详情页面
				this.$router.push({
					path : '/ProdustDetail',
					query: {id: Id}
				});
			}
        }
    }
</script>

<style type="text/css" src="./ProdustItem.css"></style>