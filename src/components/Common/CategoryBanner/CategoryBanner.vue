<template>
	<div class="categoryBanner">
		<swiper :options="swiperOption" ref="mySwiper">
			<swiperSlide  v-for="(item, index) of categoryData" :key="index">
				<div class="categoryBannerItem" v-for="(uitem, uindex) of item" :style="'width: ' + 100/row + '%'">
					<img :src="uitem.icon">
					<span>{{uitem.text}}</span>
				</div>
			</swiperSlide>
		</swiper>
	</div>
</template>

<script type="text/javascript">
	
import { swiper, swiperSlide } from 'vue-awesome-swiper'

	export default {
		props:{
			seller: Array,
			row: {
				type: Number,
				default: 4
			},
			col: {
				type: Number,
				default: 1
			}
		},
		data(){
			return {
				swiperOption: {
					notNextTick: true, 
				},
				categoryData: []
			}
		},
		mounted(){         
			this.HandleArray();
		},
		methods:{
			HandleArray(){
				let col = this.col;
				let row = this.row;
				let arr = this.seller;

				let temp_Date = [];

				for(let key=0; key <= Math.ceil(arr.length/(row*col))-1; key++){ 
					temp_Date[key] = 
						arr.slice(key*row*col, 
							 (key+1)*row*col > (arr.length - 1) 
							 ? 
							 arr.length 
							 : 
							 (key+1)*row*col
						);
				}
				this.categoryData = temp_Date;
			}
		},
		components: {
		    swiper,
		    swiperSlide
	  	},
	  	watch:{
	  		seller(){
	  			this.HandleArray();
	  		}
	  	}
	}

</script>

<style type="text/css" src="./CategoryBanner.css"></style>