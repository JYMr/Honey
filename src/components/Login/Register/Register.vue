<template>
	<div class="register">
		<!-- Logo 开始 -->
		<div class="logo-img">
			<img src="../asset/login_img.png" alt="">
		</div>
		<!-- Logo 结束 -->
		<form  v-on:submit.prevent="Register">
		<!-- 注册区  开始-->
		<div class="login-main">
			<div class="login-input">
				<input type="text" placeholder="请输入您的手机号" v-model="phoneNumber">
				<img src="../asset/input_phone_bg.png" alt="">
			</div>
			<div class="login-input login-input-codebtn">
				<input type="text" placeholder="请输入验证码" v-model="MoblieCode">
				<img src="../asset/input_code_bg.png" alt="">
				<a href="javascript:;" class="code-btn" @click="getMoblieCode">{{MoblieCodeStr}}</a>
			</div>
			<div class="login-input login-input-righticon">
				<input type="password" placeholder="请输入您的密码" v-if="passWordShow" v-model="password">
				<input type="text" placeholder="请输入您的密码" v-if="!passWordShow" v-model="password">
				<img src="../asset/input_password_bg.png" alt="">
				<img :src="passwordImgSrc" alt="" class="password-show-btn" @click="pwdImg">
			</div>
			<div class="login-link clearfix">
				<a href="/Login" class="fr">已有账号，去登录</a>
			</div>

			<input type="submit" class="btn" value="注册" :disabled="disable">
		</div>
		</form>
	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return {
				phoneNumber:'',
				password: '',
				passwordImgArr: ['./static/images/login_password_close.png','./static/images/login_password_show.png'],
				passwordImgSrc: './static/images/login_password_close.png',
				passWordShow: true,
				MoblieCode:'',
				MoblieCodeStr: '获取验证码',
				isSend: false,
				RegisterBtnVal:'注册',
				disable: false
			}
		},
		methods:{
			pwdImg(){
				this.passWordShow = !this.passWordShow;
				let temp = this.passwordImgArr.indexOf(this.passwordImgSrc) == 0 ? 1 : 0;
				this.passwordImgSrc = this.passwordImgArr[temp];
			},
			getMoblieCode(){
				if(this.isSend) return
				if(!/^1[34578]\d{9}$/.test(this.phoneNumber)){
					this.$Toast.show({
						type: 1,
						title: '手机号码格式有误',
						time: 1500
					})
					return false;
				}
				/*--获取验证码接口--*/
				//axios.request({
				//	
				//}).then((res)=>{
					this.isSend = true;
					this.$Toast.show({
						type:1,
						title:'验证码已经发送，请查收',
						time: 1500
					})
				//})


				let time = 60;
				setInterval(()=>{
					if(time == 0){
						this.isSend = false;
						this.MoblieCodeStr = '获取验证码';
					}else{
						this.MoblieCodeStr = `${time}秒`;
						time--;
					}
				},1000)
			},
			VailData(){
				let str = '';
				if(this.phoneNumber == ''){
					str = '手机号码不能为空';
				}else if(!/^1[34578]\d{9}$/.test(this.phoneNumber)){
					str = '手机号码格式有误';
				}else if(this.MoblieCode == ''){
					str = '验证码不能为空';
				}else if(this.password == ''){
					str = '密码不能为空'
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
			Register(){
				if(this.VailData()){
					this.disable = true;
					this.RegisterBtnVal = '提交中...'
					/*--注册接口--*/
				}
			}
		}
	}
</script>

<style type="text/css" src="../asset/Login.css"></style>