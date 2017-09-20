<template>
	
	<div class="address-edit">
		
		
		<div class="input-item">
			<label class="fl">姓名</label>
			<div class="input-content">
				<div class="input-content-1">
					<input type="text" name="" v-model="name" placeholder="请输入姓名">
				</div>
			</div>
		</div>

		<div class="input-item">
			<label class="fl">手机号</label>
			<div class="input-content">
				<div class="input-content-1">
					<input type="text" name="" v-model="mobile" placeholder="请输入手机号码">
				</div>
			</div>
		</div>

		<div class="input-item">
			<label class="fl">请选择省市区</label>
			<div class="input-content">
				<div class="input-content-1">
					<input type="text" name="" :value="province + ' ' + city + ' ' + area" placeholder="请选择省市区">
				</div>
			</div>
		</div>

		<div class="input-item">
			<label class="fl">详细地址</label>
			<div class="input-content">
				<div class="input-content-1">
					<input type="text" name="" v-model="address" placeholder="请填写详细地址">
				</div>
			</div>
		</div>

	</div>
</template>

<script type="text/javascript">
	
export default{
	data(){
		return {
			name: '',
			mobile: '',
			province: '',
			city : '',
			area : '',
			address : ''
		}
	},
	mounted(){

	},
	methods:{
		GetUserAddress(){

		}
	}
}

</script>

<style type="text/css" src="./AddressEdit.css"></style>