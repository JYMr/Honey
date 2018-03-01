<template>
	 <div class="OrderProductItem">
        <div class="produst-img"><img :src="produstitem.src" alt=""></div>
        <div class="produst-data">
            <h4>{{produstitem.title}}</h4>
            <div class="produst-data-info">
                <span class="price">￥{{produstitem.marketprice}}</span>
                <span class="num">x1</span>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
	
	export default {
		props:{
    		seller: Object
    	},
		data(){
			return {
				produstitem: this.seller
			}
		}
	}

</script>

<style type="text/css" src="./OrderProductItem.css"></style>