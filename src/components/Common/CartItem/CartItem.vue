<template>
    <div class="cart-item">
        <div class="checkgroup">
            <input type="checkbox" :id="'checkbox-'+index" v-model="checkboxStatus">
            <label :for="'checkbox-'+index"></label>
        </div>
        <div class="produst-img"><img :src="seller.src || DefaultImg" alt=""></div>
        <div class="produst-data">
            <h4>{{seller.title}}</h4>
            <div class="produst-data-info">
                <span class="price">￥{{seller.marketprice*total}}</span>
                <span class="num">x{{seller.total}}</span>
            </div>
            <div class="cart-action">
                <div class="cart-del" v-on:click="DelItem">
                    <img :src="DelImg" alt="">
                </div>
                <div class="cart-input clearfix">
                    <button type="button" v-on:click="Redu">-</button>
                    <input type="text" v-model="total">
                    <button type="button" v-on:click="Add">+</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">

import axios from 'axios'

	export default{
		props:{
			seller: Object,
            ischoose: Number,
            index: Number
		},
		data(){
            return {
                checkboxStatus: this.ischoose == 1 ? true : false || false,
                total:parseInt(this.seller.total),//选择商品购买的数量
                DefaultImg : 'static/images/default_img.png',
                DelImg: 'static/images/trash.png'
            }
		},
        methods:{
            Add(){
                if(this.total >= this.seller.maxtotal) return;
                this.total += 1;
            },
            Redu(){
                if(this.total <= 1) return;
                this.total -= 1;
            },
            PropsNew(){
                //更新父组件数据
                let NewSeller = this.seller;
                NewSeller.total = this.total.toString();
                NewSeller.ischoose = this.checkboxStatus ? 1 : 0;
                this.$emit('update:seller', NewSeller);
            },
            DelItem(){
                //删除商品
                this.$emit('DelItem');
            }
        },
        watch:{
            checkboxStatus(newVal, oldVal){//监听是否选择该商品
                var _self = this;
                this.$axios.request({
                    url: this.$url + 'Api.htm',
                    methods: 'get',
                    params:{
                        method: 'setChoose',
                        token: this.$token,
                        cid: _self.seller.id,
                        ischoose : newVal ? "1" : "0"
                    }
                }).then((res)=>{
                    if(res.data.status == 0){
                        //操作成功
                        this.PropsNew();
                    }else{
                        console.log('操作失败');
                    }
                })
            },
            total(){//监听该商品选择数量
                var _self = this;
                this.$axios.request({
                    url: this.$url + 'Api.htm',
                    methods: 'get',
                    params:{
                        method: 'setTotal',
                        token: this.$token,
                        cid: _self.seller.id,
                        total : _self.total
                    }
                }).then((res)=>{
                    if(res.data.status == 0){
                        //操作成功
                        this.PropsNew();
                    }
                })
            }
        }
	}

</script>

<style type="text/css" src="./CartItem.css"></style>