<template>

	<div class="AddressEdit">
	
	<div class="address-edit">
		
		<div class="input-item">
			<label class="fl">姓名</label>
			<div class="input-content">
				<div class="input-content-1">
					<input type="text" name="" v-model="Address.name" placeholder="请输入姓名">
				</div>
			</div>
		</div>

		<div class="input-item">
			<label class="fl">手机号</label>
			<div class="input-content">
				<div class="input-content-1">
					<input type="text" name="" v-model="Address.mobile" placeholder="请输入手机号码">
				</div>
			</div>
		</div>

		<div class="input-item">
			<label class="fl">请选择省市区</label>
			<div class="input-content">
				<div class="input-content-1" @click="ShowAddressSelector">
					<input type="text" name="" v-model="City_text" placeholder="请选择省市区" disabled>
				</div>
			</div>
		</div>

		<div class="input-item">
			<label class="fl">详细地址</label>
			<div class="input-content">
				<div class="input-content-1">
					<input type="text" name="" v-model="Address.address" placeholder="请填写详细地址">
				</div>
			</div>
		</div>

	</div>

	<div class="btn-content">
		<button type="button" class="btn" :disabled="visable" @click="ConfirmAddress">保存</button>
		<button type="button" class="btn" @click="Back">返回</button>
	</div>

	<!-- 地址选择器 -->
	<div class="mask" v-show="isShow" @click="ShowAddressSelector"></div>
	<div class="content-con" v-show="isShow">
		<div class="content-line"></div>
		<div class="content-title">
			<span class="fl button btn-cancel" @click="ShowAddressSelector">取消</span>
			<span id="btn-ok" class="fr button btn-ok" @click="submitAddress">确定</span>
		</div>
		<div class="li-content" v-iScroll="IScrollFun" v-for="(area_item,index) in City_G" :data-index="index" :data-initHeight="City_Init[index]">
			<ul>
				<li></li>
				<li v-for="item in CityData[area_item]">{{item.area_name}}</li>
				<li></li>
			</ul>
		</div>
	</div>

	</div>
</template>

<script type="text/javascript">

import axios from 'axios'
import AddressData from './asset/addressData.js'
import iScroll from 'iscroll'
	
export default{
	data(){
		return {
			mode: 0,//mode 0: 新增模式 1: 修改模式
			Address:{
				name: '',
				mobile: '',
				province: '',
				city : '',
				area : '',
				address : '',
			},
			City_text:'',
			isShow:false,
			City_G:['province','city','area'],
			City_Init:[-1,-1,-1],
			CityData:{
				province: [],
				city: [],
				area:[]
			},
			choose_index:[0,0,0],
			chooseCitySn: '',
			visable: true
		}
	},
	mounted(){
		if(this.$route.query.aid){
			this.mode = 1;
			this.GetUserAddress();
		}
	},
	methods:{
		GetUserAddress(){
			this.$Toast.show({
				type: 5,
				time: 0
			})

			axios.request({
				url: this.$url + 'ApiImplements.htm',
				params:{
					token: this.$token,
					method: 'getUserAddress',
					aid : this.$route.query.aid
				}
			}).then((res)=>{
				if(res.data.status == 0){
					this.Address.name = res.data.Address.name;
					this.Address.mobile = res.data.Address.mobile;
					this.Address.province = res.data.Address.province;
					this.Address.city = res.data.Address.city;
					this.Address.area = res.data.Address.area;
					this.Address.address = res.data.Address.address;

					this.$Toast.close();
				}
			})
		},
		ConfirmAddress(){

			if(!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(this.Address.mobile)){
				this.$Toast.show({
					type: 1,
					time : 1500,
					title: '请输入正确的格式的手机号码'
				})
				return;
			}
			this.$Toast.show({
				type: 5,
				time : 0
			})
			axios.request({
				url : this.$url + 'ApiImplements.htm',
				params:{
					token: this.$token,
					method: this.mode == 0 ? 'InsUserAddress' : 'UpdateUserAddress',
					aid : this.mode == 0 ? '': this.$route.query.aid,
					name : this.Address.name,
					mobile : this.Address.mobile,
					city: this.Address.province + '|' + this.Address.city + '|' + this.Address.area +  '|' + this.Address.address
				}
			}).then((res)=>{
				if(res.data.status == 0){
					this.$Toast.close();

					this.$Toast.show({
						type : 1,
						title : this.mode ? '添加成功' : '修改成功'
					})
					this.Back();
				}
			})
		},
		Back(){
			this.$router.back(-1);
		},
		InitAddressSelector(){
			//地址选择器初始化
			if(this.Address.province == ''){
				//无默认值时，初始化全部
				this.UpData(0);
			}else{
				let itemHieght = 40;

				for(let key in this.City_G){

					this.UpData(key,false);

					let temp_CityData = this.CityData[this.City_G[key]]

					for(let index in temp_CityData){
						if(this.Address[this.City_G[key]] == temp_CityData[index].area_name){
							this.choose_index[key] = index;
							this.City_Init[key] = -index * itemHieght;
						}
					}

				}

			}
		},
		ShowAddressSelector(){
			this.isShow = !this.isShow;
			if(this.isShow)
				this.InitAddressSelector();
		},
		UpData(deep,isDeep){
			//更新地址数据
			if(!isDeep) isDeep = true;

			if(isDeep){
				//刷新当前Deep数据，并向下刷新

				let City_G = this.City_G;
				//向下遍历
				for(let i = deep;i<City_G.length;i++){
					//获取当前Deep Son对象
					let temp_obj = i == 0 ? AddressData : this.ReTurnSon(i-1,AddressData);
					this.CityData[City_G[i]] = [];

					if(temp_obj.length == 0) break;
					for(let item of temp_obj){
						if(!item.area_name) break;
						this.CityData[City_G[i]].push(item);
					}
				}
			}else{
				this.CityData[City_G[deep]] = deep == 0 ? Address : this.ReTurnSon(deep - 1, AddressData);
			}
		},
		ReTurnSon(deep,obj,now_deep){
			//返回Deep的Son对象
			let Temp = new Object();
			let temp_choose_index = this.choose_index;
			//console.log(temp_choose_index);

			function GetSon(deep,obj,now_deep){
				now_deep = now_deep || 0;
				let Temp_obj = obj[temp_choose_index[now_deep]].son || [];
				if(deep > now_deep && now_deep < 3){
					GetSon(deep,Temp_obj,now_deep+1);
				}else{
					Temp = Temp_obj;
					return; 
				}
			}

			return GetSon(deep,obj),Temp;
		},
		IScrollFun(Scroll,index){
			/*
			* Scroll : el 的iScroll对象, Scroll 5.2
			* index : data-index 值
			*/
			//Scroll.on() : API > 5.0
			//外部监听iScroll scrollEnd事件
			Scroll.on('scrollEnd',()=>{
				//重置初始化高度
				this.City_Init = [-1,-1,-1];

				//设置每项高度: iScroll初始化时，options中Snap : el  的配置，由于Vue DOM刷新不及时，导致iScroll拿不到el 的高度
				let itemHieght = 40;
				let temp_choose_index = this.choose_index;
				//滚动选项，对齐判断
				if(Scroll.y%itemHieght!=0){
					//若不对齐，则调用scrollTo 滚动至对齐
					Scroll.scrollTo(0,(parseInt(Scroll.y/itemHieght)+parseInt((Scroll.y%itemHieght)/(itemHieght/2)))*itemHieght,1000);
				}else{
					//通过 滚动高度计算选择项的引索，并设置选择引索
					temp_choose_index[index] = Math.round((Scroll.y/40)*(-1));
					//更新下一级数据
					let key = index + 1;
					//更新数据前，重置默认下一级以及后面的基本引索为0
					for(key;key<temp_choose_index.length-1;key++){
						temp_choose_index[key] = 0;
					}

					this.UpData(index);
					//更新data的数组
					this.setIndex(temp_choose_index)
				}
			});
		},
		setIndex(arr){
			//更新选择引索
			this.choose_index = arr;
		},
		submitAddress(){
			//窗口确定方法
			let temp_array = this.choose_index;

			for(let key in temp_array){
				if(key == 0){
					this.Address[this.City_G[key]] = AddressData[temp_array[key]].area_name
				}else{
					let Temp = this.ReTurnSon(key-1,AddressData);
					this.Address[this.City_G[key]] = Temp.length != 0 ?Temp[temp_array[key]].area_name : ''
				}
			}

			//获取city areasn
			this.chooseCitySn = 
				this.ReTurnSon(1,AddressData)[this.choose_index[2]] ? this.ReTurnSon(1,AddressData)[this.choose_index[2]].areasn : this.ReTurnSon(0,AddressData)[this.choose_index[2]];

			//关闭地址选择器
			this.ShowAddressSelector();
		}
	},
	directives:{
		iScroll:{
			bind(el,binding,vnode,oldVnode){

				var CallBack = binding.value;
				var index = parseInt(el.getAttribute('data-index'));

				el.addEventListener('touchmove', event => {
                    event.preventDefault();
                })

               	vnode.scroll = new iScroll(el,{
					hScroll:false,
					vScrollbar:false
				})

				if(CallBack) CallBack(vnode.scroll,index);

			},
			componentUpdated(el,binding,vnode,oldVnode){
				var initHeight = parseInt(el.getAttribute('data-initHeight'));

				vnode.scroll = oldVnode.scroll;
				setTimeout(()=>{
					vnode.scroll.refresh();
					if(initHeight != -1){
						vnode.scroll.scrollTo(0, initHeight,500);
					}
				},0)
			},
			unbind(el,binding,vnode,oldVnode){
				vnode.scroll = oldVnode.scroll;
                vnode.scroll.destroy();
                vnode.scroll = null;
			}
		}
	},
	watch:{
		Address:{
			deep: true,
			handler: function(newVal,oldVal){
				//处理省市文本
				if(newVal.province != ''){
					this.City_text = newVal.province + ' ' + newVal.city + ' ' + newVal.area;
				}else{
					this.City_text = '';
				}

				let length = 0;
				let space_length = 0;
				//处理按钮
				for(let key in newVal){
					if(newVal[key] != ''){
						space_length++;
					}
					length++;
				}

				if(space_length == length || ( space_length == length - 1 && newVal.area == '')){
					this.visable = false;
				}else{
					this.visable = true;
				}
			}
		}
	}
}

</script>

<style type="text/css" src="./AddressEdit.css"></style>