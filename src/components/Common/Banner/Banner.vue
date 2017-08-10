<template>
	<!-- 广告图滑动模块 -->
	<swiper :options="swiperOption">
		<swiper-slide v-for="(banner,index) in seller.data" :key="index">
			<img :src="banner">
		</swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
	</swiper>
</template>

<script type="text/javascript">

import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default{
	props:{
		seller : Object
	},
	data(){
		return {
			swiperOption: {
                pagination : '.swiper-pagination',
                bulletActiveClass : 'silde-active'
        	}
		}
	},
	components: {
	    swiper,
	    swiperSlide
  	}
}

</script>

<style type="text/css" src="./Banner.css"></style>
