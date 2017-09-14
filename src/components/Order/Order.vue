<template>
	<div class="order">

	    <div class="order-tab">
	    	<router-link v-for="(item,index) of OrderStatus" :to="{path:'./Status',query: {'status':item.status}}" tag="div" class="order-tab-item" active-class="active">{{item.title}}</router-link>
	    </div>

	    <div class="order-content">
		    <keep-alive>
	    		<router-view name="order"></router-view>
	    	</keep-alive>
	    </div>
	</div>
</template>

<script type="text/javascript">

import axios from 'axios'
	
export default{
	data(){
		return {
			OrderStatus:[{title: '全部',status: ''},{title: '待付款',status: '0'},{title: '待发货',status: '1'},{title: '待收货',status: '2'},{title: '待评价',status: '3'}],
			OrderList: [],
			isNeedLoad : true,//上拉加载阀值,防止多次请求
			Loadstatus : 0,//上拉加载状态 0:未加载 1:加载中 2:所有加载完成
			No : 1,
			PageSize: 8
		}
	},
	mounted(){
		let status = this.$route.query.status;
		if(status == undefined){
			console.log(this.$route);
			this.$router.push('/Order/Status')
		}
		this.GetOrderList();
		this.ListenScroll();
	},
	methods:{
		GetOrderList(callback){
			let _callback;
			if(callback && typeof callback == 'function') 
				_callback=callback();

			this.Loadstatus = 1;

			axios.request({
				url: this.$url + 'ApiImplements.htm',
				methods: 'get',
				params:{
					userid: 'orwX1sjqDWIOXtusI4Tab23-eyIk',
					method: 'getOrderList',
					page: this.PageSize,
					no: this.No
				}
			}).then((res)=>{
				if(res.data.status == 0){
					if(res.data.OrderList.length == 0){
						this.Loadstatus = 2;
						this.isNeedLoad = false;
						_callback;
						return;
					}else if(res.data.OrderList.length < this.PageSize){
						this.Loadstatus = 2;
					}else{
						this.Loadstatus = 0;
					}
					this.OrderList = this.OrderList.concat(res.data.OrderList);
					_callback;
				}
			})
		},
		ListenScroll(){
			//监听滚动：触底加载
			let _self = this;
			window.addEventListener('scroll',function(){
				if(_self.isNeedLoad){
					if(document.body.scrollHeight - window.innerHeight <= document.body.scrollTop){
						_self.isNeedLoad = false;
						_self.No += 1;
						_self.GetOrderList(function(){
							_self.isNeedLoad = true;
						});
					}
				}
			})
		},
	}
}

</script>

<style type="text/css" src="./Order.css"></style>