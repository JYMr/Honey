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
	        <input type="submit" class="btn" :value="CodeVal" @click="SendCode" :disabled="disable">
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
				isSend:false,
				disable: false
			}
		},
		beforeMount(){
			this.TimeOut();
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
					//this.$axios.request({});
					//Success => 
					this.$Toast.show({
						type: 1,
						title: '已发送验证码，请注意查收',
						time: 1500
					})
					let i = 60;
					this.isFirst = false;
					this.CodeVal = '下一步'
					let now_time = new Date().getTime();
					localStorage.ForgetCodeTime = now_time;
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
			},
			TimeOut(){
				//判断上次验证码发送时间
				let time = 60;
				let now_time = new Date().getTime();
				let temp_time = parseInt(localStorage.ForgetCodeTime);
				//判断距离上次发送验证码时间是否超过60s
				if(parseInt((now_time - temp_time)/1000) < 60){
					this.isSend = true;
					this.disable = true;
					time = 60 - parseInt((now_time - temp_time)/1000);

					setInterval(()=>{
						if(time == 0){
							this.isSend = false;
							this.disable = false;
							this.CodeVal = '获取验证码'
						}else{
							this.CodeVal = `重新获取验证码 (${time}秒)`;
							time--;
						}
					},1000)
				}
			}
		}

	}
</script>

<style type="text/css" src="./ForgetPassword.css"></style>