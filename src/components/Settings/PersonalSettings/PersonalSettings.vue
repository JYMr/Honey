<template>
	<div class="personalsetting">
		 <!-- 个人资料头像 开始 -->
	    <div class="home-data-img">
	        <img src="static/images/pic.png" alt="">
	    </div>
	    <!-- 个人资料头像 结束 -->

	    <!-- 个人资料内容 开始 -->
	    <div class="home-data-main">
	        
	        <div class="home-data-input">
	            <label>用户名</label>
	            <div>
	                <input type="text" name="" value="Eminem" v-model="name" />
	            </div>
	        </div>

	        <div class="home-data-input">
	            <label>个性签名</label>
	            <div>
	                <input type="text" name="" value="我告诉你，你买不起" v-model="signature" />
	            </div>
	        </div>

	        <div class="btn-content">
	        	<button class="btn btn-default" @click="setPersonalData">保存</button>
	        </div>

	    </div>
	    <!-- 个人资料内容 结束 -->
	</div>
</template>

<script type="text/javascript">
	
export default{
	data(){
		return {
			name: '',
			signature: ''
		}
	},
	mounted(){
		this.getPersonalData();
	},
	methods:{
		getPersonalData(){
			this.$Toast.show({
				type:5,
				time: 0
			});
			this.$axios.request({
				url: this.$url + 'Api.htm',
				methods: 'get',
				params:{
					token: this.$token,
					method: 'getMember'
				}
			}).then((res)=>{
				if(res.data.status == 0){
					this.name = res.data.data.member.nikeName;
					this.signature = res.data.data.member.signature;
				}
				this.$Toast.close();
			});
		},
		setPersonalData(){
			this.$Toast.show({
				type:5,
				time: 0
			});
			this.$axios.request({
				url: this.$url + 'Api.htm',
				methods: 'get',
				params:{
					token: this.$token,
					method: 'updateMember',
					nikeName: this.name,
					signature: this.signature,
				}
			}).then((res)=>{
				if(res.data.status == 0){
					this.$Toast.show({
						type: 1,
						title: '修改成功'
					});
					this.$router.push({
						path: '/Home'
					})
				}else{
					this.$Toast.show({
						type: 1,
						title: '修改失败'
					});
				}
			});
		}
	}
}

</script>

<style type="text/css" src="./PersonalSettings.css"></style>