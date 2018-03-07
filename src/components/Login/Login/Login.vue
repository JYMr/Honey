<template>
	<div class="login">
		<!-- 登录头像 开始 -->
		<div class="login-img">
			<img src="../asset/login_img.png" alt="">
		</div>
		<!-- 登录头像 结束 -->
		<form v-on:submit.prevent="Login">
		<!-- 登录区  开始-->
		<div class="login-main">
			<div class="login-input">
				<input type="text" placeholder="手机号 / 用户名 / 昵称" v-model="username" v-on:blur="ValiData(0)">
				<img src="../asset/input_name_bg.png" alt="">
			</div>
			<div class="login-input login-input-righticon">
				<input type="password" placeholder="请输入您的密码" v-if="passWordShow" v-model="password" v-on:blur="ValiData(1)">
				<input type="text" placeholder="请输入您的密码" v-if="!passWordShow" v-model="password" v-on:blur="ValiData(1)">
				<img src="../asset/input_password_bg.png" alt="">
				<img :src="passwordImgSrc" alt="" class="password-show-btn" @click="pwdImg">
			</div>
			<div class="login-link clearfix">
				<a href="/Register" class="fl">注册</a>
				<a href="/ForgetPassword" class="fr">忘记密码？</a>
			</div>

			<input type="submit" class="btn" :value="loginVal" :disabled="disable">
		</div>
		</form>
	</div>
</template>

<script type="text/javascript">

import axios from 'axios'

export default{
	data(){
		return {
			username:'',
			password:'',
			passwordImgArr: ['./static/images/login_password_close.png','./static/images/login_password_show.png'],
			passwordImgSrc: './static/images/login_password_close.png',
			passWordShow: true,
			loginVal: '登录',
			disable: false
		}
	},
	methods:{
		pwdImg(){
			this.passWordShow = !this.passWordShow;
			let temp = this.passwordImgArr.indexOf(this.passwordImgSrc) == 0 ? 1 : 0;
			this.passwordImgSrc = this.passwordImgArr[temp];
		},
		ValiData(type){
			let isUser = () => {
				if(this.username == ''){
					this.$Toast.show({
						type:1,
						title: '用户名不能为空',
						time:1500
					})
					return false;
				}
				return true;
			}

			let isPassword = () => {
				if(this.password == ''){
					this.$Toast.show({
						type:1,
						title: '密码不能为空',
						time:1500
					})
					return false;
				}else if(this.password.length < 6){
					this.$Toast.show({
						type:1,
						title: '密码不能小于6位',
						time:1500
					})
					return false;
				}
				return true;
			}

			if(type == 0){
				return isUser()
			}else if(type == 1){
				return isPassword()
			}else{
				return isUser() && isPassword()
			}
			
		},
		Login(){
			if(this.ValiData()){
				this.disable = true;
				this.loginVal = '登录中...'
				//--调用登录接口--

				this.$axios.request({
					url : this.$url + '/Login.htm',
					methods: 'get',
					params:{
						username : this.username,
						password: this.password
					}
				}).then((res)=>{
					if(res.data.status == 0){
						this.$token = res.data.data.token;
						localStorage.setItem("login_code",res.data.data.code);
						if(this.$Global.LAST_URL != undefined && this.$Global.LAST_URL != ''){
							this.$router.replace({
								path: this.$Global.LAST_URL
							})
							this.$Global.LAST_URL = '';
						}else{
							this.$router.replace({
								path: '/Index'
							})
						}
					}else{
						this.$Toast.show({
							type: 1,
							title: res.data.msg
						})
						this.disable = false;
						this.loginVal = '登录'
					}
				})
			}else{
				this.$Toast.show({
					type:1,
					title: '请填写正确的用户名和密码',
					time:1500
				})
			}
		}
	}
}

</script>

<style type="text/css" src="../asset/Login.css"></style>