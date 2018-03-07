<template>
	<header>
        <div class="header-left" @click="Back">
            <img src="static/images/left_arrow.png" alt="">
        </div>
        {{title}}
    </header>
</template>

<script type="text/javascript">
	
	export default {
		props:{
			seller: String
		},
		data(){
			return {
				title: this.seller
			}
		},
		methods:{
			Back(){
				history.go(-1);
			}
		}
	}

</script>

<style type="text/css" src="./TitleHeader.css"></style>