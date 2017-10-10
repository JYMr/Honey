<template>
	
	<div class="address-list">
		
		<div class="address-list-item" v-for="(item,index) of AddressList">

			<div class="address-list-text">
				<span class="fl">{{item.name}}</span>
				<span class="fr">{{item.mobile}}</span>
				<span class="address-text">{{ item.province + item.city + item.area + item.address }}</span>
			</div>
			
			<div class="address-list-btn">
				<div class="radiogroup">
					<input type="radio" name="addressList" :id="'checkbox_' + index" :value="index" v-model="isDefault"/>
					<label :for="'checkbox_' + index"></label>
				</div>
				<label :for="'checkbox_' + index">设置为默认值</label>

				<a @click="LinkAddressEdit(item.id)" class="btn btn-sm-outline fr">编辑</a>
				<a @click="DelAddress(item.id)" href="javascript:;" class="btn btn-sm-outline fr">删除</a>
			</div>

		</div>
		
		<div class="btn-content">
			<router-link to="/AddressEdit" class="btn">添加地址</router-link>
		</div>

	</div>

</template>

<script type="text/javascript">

import axios from 'axios'
	
export default{
	data(){
		return {
			AddressList : [],
			isDefault : ''
		}
	},
	mounted(){
		this.GetAddressList();
	},
	methods:{
		GetAddressList(){
			this.$Toast.show({
				type: 5,
				time: 0
			})
			axios.request({
				url: this.$url + '/ApiImplements.htm',
				methods: 'get',
				params:{
					userid : this.$userId,
					method: 'getUserAddress'
				}
			}).then((res)=>{
				if(res.data.status == 0){
					this.AddressList = res.data.Address;
					for(let key in this.AddressList){
						if(this.AddressList[key].isDefault == 1)
							this.isDefault = key;
					}
					this.$Toast.close();
				}
			})
		},
		DelAddress(id){
			//删除地址
			var _this = this;

			this.$Toast.show({
				type: 3,
				time: 0,
				title: '是否删除这条地址',
				callback: function(res){
					if(res == 1){

						_this.$Toast.show({
							type: 5,
							time: 0
						})
						axios.request({
							url: _this.$url + '/ApiImplements.htm',
							methods: 'get',
							params:{
								userid : _this.$userId,
								method: 'DelUserAddress',
								aid : id
							}
						}).then((res)=>{
							if(res.data.status == 0){

								_this.$Toast.close();

								_this.$Toast.show({
									type: 1,
									title: '操作成功'
								})
								_this.GetAddressList();
							}else{
								
								_this.$Toast.close();
								_this.$Toast.show({
									type: 1,
									title: res.data.msg
								})
							}
						})

					}
				}
			})

		},
		HandleDefault(newVal,oldVal){
			if(oldVal == '') return;

			let index = parseInt(newVal);
			let aid = this.AddressList[index].id;

			this.$Toast.show({
				type:5,
				time:0
			})

			axios.request({
				url: this.$url + '/ApiImplements.htm',
				methods: 'get',
				params:{
					userid : this.$userId,
					method: 'UpdateUserAddress',
					aid : aid,
					isDefault : 1
				}
			}).then((res)=>{
				if(res.data.status == 0){
					this.$Toast.close();
				}else{
					this.$Toast.close();
					this.$Toast.show({
						type: 1,
						title: res.data.msg
					})
				}
			}).catch((err)=>{
				this.$Toast.close();
				this.$Toast.show({
					type: 1,
					title: '网络错误,请重试',
					time: 1500
				})
			})
		},
		LinkAddressEdit(id){
			this.$router.replace({
				path: '/AddressEdit',
				query: {
					aid : id
				}
			})
		}
	},
	watch:{
		isDefault(newVal,oldVal){
			this.HandleDefault(newVal,oldVal);
		}
	}
}

</script>

<style type="text/css" src="./Address.css"></style>