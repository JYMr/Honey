<template>
	<div class="order">
	    <header>
	        <div class="header-left">
	            <img src="images/left_arrow.png" alt="">
	        </div>
	        全部订单
	    </header>

	    <div class="order-tab">
	        <div class="order-tab-item active">全部</div>
	        <div class="order-tab-item">全部</div>
	        <div class="order-tab-item">全部</div>
	        <div class="order-tab-item">全部</div>
	        <div class="order-tab-item">全部</div>
	    </div>

	    <div class="order-content">
	        <!-- 全部订单 开始 -->
	        <div class="order-content-item active" id="scroll_list">
	            <div class="order-list">
	                <ul>
	                    <li>
	                        <div class="order-title">
	                            <img src="images/order_title_icon.png">
	                            Darry Ring
	                            <span class="order-action">待收货</span>
	                        </div>
	                        <ul>
	                            <!-- 订单商品 开始 -->
	                            <li>
	                                <div class="produst-img"><img src="images/goods.png" alt=""></div>
	                                <div class="produst-data">
	                                    <h4>18K铂金钻石镶嵌情侣对戒</h4>
	                                    <div class="produst-data-info">
	                                        <span class="price">￥33098.00</span>
	                                        <span class="num">x1</span>
	                                    </div>
	                                </div>
	                            </li>
	                            <!-- 订单商品 结束 -->
	                        </ul>
	                        <div class="order-total">
	                            共1件商品，合计￥39882.00(含运费￥0.00)
	                        </div>
	                        <div class="order-btn">
	                            <a href="javascript:;" class="fr btn btn-sm-outline">确认收货</a>
	                        </div>
	                    </li>
	                </ul>
	                <div class="order-list-more">
	                    上拉加载更多数据
	                </div>
	            </div>
	        </div>
	        <!-- 全部订单 结束 -->
	        <div class="order-content-item"></div>
	        <div class="order-content-item"></div>
	        <div class="order-content-item"></div>
	        <div class="order-content-item"></div>
	    </div>
	</div>
</template>

<script type="text/javascript">
	
export default{

}

</script>

<style type="text/css" src="./Order.css"></style>