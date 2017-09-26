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
				<a href="javascript:;" class="btn btn-sm-outline fr">删除</a>
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
					this.AddressList = res.data.AddressList;
					for(let key in this.AddressList){
						if(this.AddressList[key].isDefault == 1)
							this.isDefault = key;
					}
					this.$Toast.close();
				}
			})
		},
		LinkAddressEdit(id){
			this.$router.push({
				path: '/AddressEdit',
				query: {
					cid : id
				}
			})
		}
	}
}

</script>

<style type="text/css" src="./Address.css"></style>