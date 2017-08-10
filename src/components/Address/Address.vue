<template>
	<div>
		<div class="address_content">
			<ul class="clearfix">
			        <div class="label_item">
			            <label>所在地区</label>
			        </div>
			        <div class="input_container">
			            <div class="text_container">
			                <input id="pop_up" readonly="readonly" type="text" placeholder="省市区信息" @click="isFun"/>
			            </div>
			        </div>
			    </li>
			</ul>
		</div>
		<div class="msk_bg" v-show="isShow" @click="isFun"></div>
		<div class="content-con" v-show="isShow">
			<div class="content-line"></div>
			<div class="content-title">
				<span class="fl button btn-cancel" @click="isFun">取消</span>
				<span id="btn-ok" class="fr button btn-ok">确定</span>
			</div>
			<div class="li-content" id="li_1" v-iScroll="iScrollConfig">
				<ul id="s_1">
					<li v-for="item in CityData.country">{{item}}</li>
				</ul>
			</div>
			<div class="li-content" id="li_2">
				<ul id="s_2">
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</div>
			<div class="li-content" id="li_3">
				<ul id="s_3">
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</div>
			<div class="li-content" id="li_4">
				<ul id="s_4">
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	
import AddressData from './addr.js'
import iScroll from 'iscroll'

export default{
	data(){
		return {
			isShow:true,
			CityData:{
				country:[],
				province: [],
				city: [],
				area:[]
			},
			iScroll_Obj:Object,
			iScrollConfig:{
				snap: 'li',
				hScroll:false,
				vScrollbar:false,
			}
		}
	},
	mounted(){
		this.UpData();
		//this.InitiScroll();
	},
	methods:{
		isFun(){
			this.isShow = !this.isShow;
		},
		UpData(deep){
			var City_G = ['country','province','city','area'];
			for(let item of AddressData){
				this.CityData[City_G[0]].push(item.area_name)
			}
		}
	},
	directives:{
		iScroll:{
			bind(el,binding,vnode,oldVnode){

				el.addEventListener('touchmove', event => {
                    event.preventDefault();
                })

               	vnode.scroll = new iScroll(el,binding.value)

			},
			componentUpdated(el,binding,vnode,oldVnode){
				vnode.scroll = oldVnode.scroll;
				setTimeout(()=>{
					vnode.scroll.refresh();
				},0)
			},
			unbind(el,binding,vnode,oldVnode){
				vnode.scroll = oldVnode.scroll;
                vnode.scroll.destroy();
                vnode.scroll = null;
			}
		}
	}
}

</script>

<style type="text/css" src="./basic.css"></style>
<style type="text/css" src="./div_down.css"></style>
<style type="text/css" src="./phone_new.css"></style>