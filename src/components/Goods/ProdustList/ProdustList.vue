<template>
	<div class="ProdustList">
		
		<!-- 搜索框 开始 -->
		<form v-on:submit.prevent="onSubmit">
		<transition name="slide">
			<div class="search" v-show="isSeachBar">
				<input type="text" v-model="SearchKeyWord" placeholder="搜索您感兴趣的商品">
			</div>
		</transition>
		</form>

		<!-- 搜索框 结束 -->
		<!-- 专区商品列表 开始 -->
		<div class="index-prefecture-main">
			<div class="produst-list">
				<ProdustItem v-for="(item,index) in ProdustListData" :seller="item" :key="index"></ProdustItem>
				<span class="more" v-if="Loadstatus==1">加载中..</span>
				<span class="more" v-if="Loadstatus==2">无更多数据</span>
				<span class="more" v-if="Loadstatus==0">上拉加载更多</span>
			</div>
		</div>

	</div>
</template>

<script type="text/javascript">

import axios from 'axios'
import ProdustItem from '@/components/Common/ProdustItem/ProdustItem'
	
export default{
	data(){
		return {
			Pagesize : 8,
			No : 1,
			SearchKeyWord : '',
			ProdustListData: [],
			Loadstatus : 0,//上拉加载状态 0:未加载 1:加载中 2:所有加载完成
			isNeedLoad : true,
			isSeachBar: true
		}
	},
	created(){
		this.SearchKeyWord = this.$route.query.keyword || '';
		this.GetProdustListData();
		
		window.addEventListener('scroll',this.ListenScroll);
	},
	methods:{
		onSubmit(){
			//默认搜索请求
			this.ProdustListData = [];
			this.GetProdustListData();
		},
		GetProdustListData(callback){
			let _callback;
			if(callback && typeof callback == 'function') 
				_callback=callback();

			let _self = this;
			axios.request({
				url: this.$url + 'ApiImplements.htm',
				type: 'get',
				params:{
					page : _self.Pagesize,
					no : _self.No,
					keyword : _self.SearchKeyWord,
					method: 'Search'
				}
			}).then((res)=>{
				if(res.data.status == 0){
					if(res.data.data.length == 0){
						_self.Loadstatus = 2;
						_self.isNeedLoad = false;
						_callback;
						return;
					}else if(res.data.data.length < _self.Pagesize){
						_self.Loadstatus = 2;
					}else{
						_self.Loadstatus = 0;
					}
					for(let item of res.data.data){
						console.log(item.id)
					}
					_self.ProdustListData = _self.ProdustListData.concat(res.data.data);
					_callback;
				}
			});
		},
		ListenScroll(){
			//监听滚动
			let _self = this;
			let scrolledTop = 0;

			//触底加载
			if(_self.isNeedLoad){
				if(document.body.scrollHeight - window.innerHeight <= document.body.scrollTop){
					_self.isNeedLoad = false;
					_self.No += 1;
					_self.GetProdustListData(function(){
						_self.isNeedLoad = true;
					});
				}
			}
			//搜索栏效果
			if(document.body.scrollTop > scrolledTop){
				_self.isSeachBar = false;
			}else{
				_self.isSeachBar = true;
			}
			scrolledTop = document.body.scrollTop;
		},
	},
	components:{
		ProdustItem
	},
	beforeDestroy(){
		window.removeEventListener('scroll',this.ListenScroll);
	}
}

</script>

<style type="text/css" src="./ProdustList.css"></style>