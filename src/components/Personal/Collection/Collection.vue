<template>
	
	<div class="container">
		
		<div class="collect-container footerNav" v-if="CollectionList.length != 0">

			<div class="collect clearfix" v-for="(item,index) in CollectionList">
				<div class="checkgroup">
					<input type="checkbox" name="select" :id="'select-'+index" :value="index" v-model="item.checked">
					<label :for="'select-'+index"></label>
				</div>
				<img :src="item.goodsImgUrl">
				<div class="collect-information">
					<h4>{{item.goodsName}}</h4>
					<p>会员价：<span>{{item.goodsMarketPrice}}</span></p>
				</div>
			</div>

		</div>

		<div class="collect-empty" v-if="CollectionList.length == 0">
			<img src="/static/images/collection_empty.png">
			<span>你的收藏夹空空的耶</span>
		</div>

		<div class="select-footer" v-if="CollectionList.length != 0">
			<div class="checkgroup">
				<input type="checkbox" name="select" id="select-all" v-model="CheckedAll">
				<label for="select-all"></label>
			</div>
			<div class="btn-delete" v-on:click="DelColleact">删除</div>
		</div>

	</div>

</template>

<script type="text/javascript">
	
	export default{
		data(){
			return {
				CheckedAll: false,
				CollectionList : [],
				flag: true
			}
		},
		mounted(){
			this.GetColleact();
		},
		methods:{
			GetColleact(){
				this.$Toast.show({
					type: 5,
					time: 0
				})
				this.$axios.request({
					url: this.$url + 'ApiImplements.htm',
					type: 'get',
					params:{
						method: 'getCollection',
						token: this.$token
					}
				}).then((res)=>{
					if(res.data.status == 0){
						for(let item of res.data.list){
							item.checked = false;
						}
						this.CollectionList = res.data.list;
						this.$Toast.close();
					}
				})
			},
			DelColleact(){
				let DelList = '';
				for(let item of this.CollectionList){
					if(item.checked){
						DelList += item.id + '|'
					}
				}
				DelList = DelList.substring(0,DelList.length-1);
				alert(DelList)
				if(DelList.length == ''){
					this.$Toast.show({
						title: '请选择要取消收藏的商品',
						type: 1
					})
					return;
				}
				this.$Toast.show({
					title: '您确认取消收藏这些商品吗',
					type: 3,
					time: 0,
					callback: (res)=>{
						//确认
						if(res == 1){
							this.$axios.request({
								url: this.$url + 'ApiImplements.htm',
								type: 'get',
								params:{
									method: 'delCollection',
									token: this.$token,
									id : DelList
								}
							}).then((res)=>{
								if(res.data.status == 0){
									this.$Toast.show({
										title: '删除成功',
										type: 1
									})
									this.GetColleact();
								}
							})
						}
					}
				})
			}
		},
		watch:{
			CheckedAll(newVal,oldVal){
				if(!this.flag) return;
				let temp = newVal;
				for(let item of this.CollectionList){
					item.checked = temp;
				}
			},
			CollectionList: {
				deep: true,
				handler: function(newVal,oldVal){
					this.flag = false;
					var isChecked = 0;
					for(let item of newVal){
						if(item.checked)
							isChecked++;
					}
					this.CheckedAll = isChecked == newVal.length;

					setTimeout(()=>{
						this.flag = true;
					},0)
				}
			}
		}
	}

</script>

<style type="text/css" src="./Collection.css"></style>