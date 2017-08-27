<template>
	<div class="forget">
		<div class="findpassword-title">
	        <span v-if="isFirst">请协助我们完成您账户的认证</span>
	        <span v-if="!isFirst">我们已将验证码 发送至您的手机!</span>
	        <span v-if="!isFirst">{{PhoneNumber.substring(0,3) + '****' + PhoneNumber.substring(7,11)}}</span>
	    </div>

	    <div class="findpassword-main">
	        <div class="full-input">
	            <input type="text" placeholder="请输入您的手机号" v-model="PhoneNumber" v-if="isFirst">

	            <input type="text" placeholder="请输入验证码" v-model="Code" v-if="!isFirst">
	        </div>
	    </div>

	    <div class="btn-content">
	        <input type="submit" class="btn" :value="CodeVal" @click="SendCode">
	       <!--  <input type="submit" class="btn b-duly" value="重新获取验证码 (55秒)"> -->
	    </div>

	    <span class="reSendCode" v-if="SendCodeText" @click="SendCode">{{SendCodeText}}</span>
	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return {
				isFirst: true,
				PhoneNumber: '18819446681',
				Code:'',
				CodeVal: '获取验证码',
				SendCodeText: '',
				isSend:false
			}
		},
		methods:{
			ValiData(type){
				let str = '';
				if(type == 0){
					if(this.PhoneNumber == ''){
						str = '手机号码不能为空';
					}else if(!/^1[34578]\d{9}$/.test(this.PhoneNumber)){
						str = '手机号码格式有误';
					}
				}else if(type == 1){
					if(this.Code == ''){
						str = '验证码不能为空';
					}
				}

				if(str != ''){
					this.$Toast.show({
						type:1,
						title:str,
						time: 1500
					})
					return false;
				} 
				return true;
			},
			SendCode(){
				if(!this.isSend && this.ValiData(0) && this.isFirst){
					//验证码请求接口
					//axios.request({});
					//Success => 
					this.$Toast.show({
						type: 1,
						title: '已发送验证码，请注意查收',
						time: 1500
					})
					let i = 10;
					this.isFirst = false;
					this.CodeVal = '下一步'
					let TimeCode = setInterval(()=>{
						i--;
						if(i==0){
							this.isSend = false
							this.SendCodeText = '重新发送验证码';
							clearInterval(TimeCode);
						}else{
							this.isSend = true
							this.SendCodeText = `重新获取验证码 (${i}秒)`;
						}
					},1000)
				}else if(!this.isFirst && this.ValiData(1)){
					//跳转
					//axios验证验证码
					alert('!!')
				}
			}
		}

	}
</script>

<style type="text/css" src="./ForgetPassword.css"></style>