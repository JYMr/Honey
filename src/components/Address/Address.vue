<template>
	<div>
		<div class="address_content">
			<ul class="clearfix">
			        <div class="label_item">
			            <label>所在地区</label>
			        </div>
			        <div class="input_container">
			            <div class="text_container">
			                <input id="pop_up" readonly="readonly" type="text" placeholder="省市区信息" @click="isFun" v-model="AddressText"/>
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
				<span id="btn-ok" class="fr button btn-ok" @click="submitAddress">确定</span>
			</div>
			<div class="li-content" v-iScroll="IScrollFun" v-for="(area_item,index) in City_G" :data-index="index">
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
			City_G:['country','province','city','area'],
			choose_index:[0,0,0,0],
			AddressText:'',
			choose_city: ''
		}
	},
	mounted(){
		this.UpData(0);
	},
	methods:{
		isFun(){
			this.isShow = !this.isShow;
		},
		UpData(deep){
			//刷新当前Deep数据，并向下刷新
			let City_G = this.City_G;
			//向下遍历
			for(let i = deep;i<City_G.length;i++){
				//获取当前Deep Son对象
				let temp_obj = i == 0 ? AddressData : this.ReTurnSon(i-1,AddressData);
				this.CityData[City_G[i]] = [];
				for(let item of temp_obj){
					if(!item.area_name) break;
					this.CityData[City_G[i]].push(item);
				}
			}
		},
		ReTurnSon(deep,obj,now_deep){
			//返回Deep的Son对象
			let Temp = new Object();
			let temp_choose_index = this.choose_index;
			//console.log(temp_choose_index);

			function GetSon(deep,obj,now_deep){
				now_deep = now_deep || 0;
				let Temp_obj = obj[temp_choose_index[now_deep]].son || {};
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
					//当国家选择不为中国是，不更新后面级别数据，且清空省市区级别数据
					//console.log('ISCroll触发层级:' + index)
					if(index == 0 && temp_choose_index[index] != 0){
						let temp_cityData = this.CityData;
						temp_cityData.province = [];
						temp_cityData.city = [];
						temp_cityData.area = [];
						this.setIndex(temp_cityData);
					}else if(index != temp_choose_index.length-1){
						//滚动为最后一个级别时，无须刷新下一级数据
						this.UpData(index);
					}
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
			this.AddressText = '';

			for(let key in temp_array){
				if(key == 0){
					this.AddressText += AddressData[temp_array[key]].area_name
				}else{
					this.AddressText += this.ReTurnSon(key-1,AddressData)[temp_array[key]].area_name
				}
				this.AddressText += 
					temp_array.length - 1 != key ? ' ': '';
				//当国家不为中国时，不再向下遍历
				if(key == 0 && temp_array[key] != 0)break;
			}

			//获取city areasn
			//判断是否为中国
			if(this.choose_index[0] == 0){
				this.choose_city = this.ReTurnSon(2,AddressData)[this.choose_index[3]].areasn
			}else{
				this.choose_city = AddressData[this.choose_index[0]].areasn
			}
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