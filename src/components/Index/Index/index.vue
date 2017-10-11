<template>
	<div class="container footerNav">
		
		<!-- 搜索框 开始 -->
		<form v-on:submit.prevent="ToProdustList">
			<div class="search search-index">
				<input type="text" v-model="SearchKeyWord" placeholder="搜索您感兴趣的商品">
			</div>
		</form>

		<!-- <Banner :seller="Banner_data"></Banner> -->

		<div class="produst-group">
		
			<div class="produst-group-title">

	            <span>新品推荐</span>

	            <span class="more fr">更多</span>

			</div>

			<div class="produst-list">
				<ProdustItem :seller="item" v-for="(item,index) in ProdustList" :key="index"></ProdustItem>
				<span class="more" v-if='Loadstatus==0'>上拉加载更多</span>
				<span class="more" v-if='Loadstatus==1'>加载中...</span>
				<span class="more" v-if='Loadstatus==2'>没有更多内容了</span>
			</div>

		</div>
	</div>
</template>

<script>
import axios from 'axios'
import Banner from '@/components/Common/Banner/Banner'
import ProdustItem from '@/components/Common/ProdustItem/ProdustItem'

export default{
	data(){
		return {
			Banner_data : {
				data:[]
			},//Banner数据
			SearchKeyWord: '',//搜索框值
			ProdustList: [],//产品列表数据
			isNeedLoad : true,//上拉加载阀值,防止多次请求
			Loadstatus : 0,//上拉加载状态 0:未加载 1:加载中 2:所有加载完成
			No : 1,
			PageSize: 8
		}
	},
	mounted(){
		//this.GetBanner();
		//this.GetHotProdust();
		this.ListenScroll();
	},
	methods:{
		ToProdustList(even){
			//跳转产品列表
			this.$router.push({
				path : '/ProdustList',
				query: {keyword: this.SearchKeyWord}
			});

		},
		GetBanner(callback){
			//获取Banner图片数据
			let _self =this;
			axios.get('static/data.json').then((res)=>{
				_self.Banner_data.data = res.data.banner;
				if(callback && typeof callback == 'function') callback();	
			});
		},
		GetHotProdust(callback){
			let _callback;
			if(callback && typeof callback == 'function') 
				_callback=callback();

			let _self = this;

			//更改为加载中状态
			_self.Loadstatus = 1;
			axios.request({
				url: this.$url + 'ApiImplements.htm',
				methods: 'get',
				params:{
					no : _self.No,
					page : _self.PageSize,
					method:'getProdustList'
				}
			}).then((res)=>{
				if(res.data.status == 0){
					if(res.data.data.length == 0){
						_self.Loadstatus = 2;
						_self.isNeedLoad = false;
						_callback;
						return;
					}else if(res.data.data.length < _self.PageSize){
						_self.Loadstatus = 2;
					}else{
						_self.Loadstatus = 0;
					}
					this.ProdustList = this.ProdustList.concat(res.data.data);
					_callback;
				}
			});
		},
		ListenScroll(){
			//监听滚动：触底加载
			let _self = this;
			window.addEventListener('scroll',function(){
				if(_self.isNeedLoad){
					if(document.body.scrollHeight - window.innerHeight <= document.body.scrollTop){
						_self.isNeedLoad = false;
						_self.No += 1;
						_self.GetHotProdust(function(){
							_self.isNeedLoad = true;
						});
					}
				}
			})
		}
	},
	components:{
		Banner,
		ProdustItem
	},
	watch:{
		SearchKeyWord(newVal,oldVal){
			console.log(newVal)
		}
	},
	beforeDestroy(){
		window.removeEventListener('scroll',this.scroll);
	}
}
</script>

<style type="text/css" src="./index.css"></style>