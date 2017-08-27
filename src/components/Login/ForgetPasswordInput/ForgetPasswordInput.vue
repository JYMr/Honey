<template>
	<div class="ForgetPasswordInput">
		<form>
	    <div class="input-group-type-2">
			<label>新密码</label>
	        <div class="full-input">
	            <input type="password" v-model="Password1" placeholder="请输入密码">
	        </div>
	    </div>
	    <div class="input-group-type-2">
			<label>确认密码</label>
	        <div class="full-input">
	            <input type="password" v-model="Password2" placeholder="请再次输入密码">
	        </div>
	    </div>

	    <div class="btn-content">
	    	<input type="submit" class="btn" name="">
	    </div>
		</form>
	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return {
				Password1: '',
				Password2: ''
			}
		},
		methods:{
			ValiData(){
				if(this.Password1 == '' || this.Password2 == ''){
					this.$Toast.show({
						type : 1,
						title : '请输入密码',
						time:1500
					})
					return false;
				}else if(this.Password1 != this.Password2){
					this.$Toast.show({
						type: 1,
						title: '两次密码输入不一致',
						time:1500
					})
					return false;
				}
				return true;
			},
			SubmitFun(){
				if(this.ValiData()){
					
				}
			}
		}
	}
</script>

<style type="text/css" src="./ForgetPasswordInput.css"></style>