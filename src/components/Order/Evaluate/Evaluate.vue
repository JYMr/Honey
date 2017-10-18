<template>
	<div class="order-content">
        <!-- 全部订单 开始 -->
        <div class="order-content-item active" id="scroll_list">
            <div class="order-list">
                <ul>
                    <li>
                        <div class="order-title">
                            <img src="images/order_title_icon.png">
                            Darry Ring
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
                        </ul>

                        <!-- 描述相符 -->
                        <div class="star-score clearfix">
                            <span>描述相符：</span>
							<div class="evalue clearfix">
								<span class="star"></span>
								<span></span>
								<span></span>
								<span></span>
								<span></span>
							</div>
                        </div>

                        <form method="submit" class="user-feedback">

							<!-- 买家商品评论 -->
							<textarea class="description-text" placeholder="长度在1-500个字之间写下购买体会或使用过程中带来的帮助等，可以为其他小伙伴提供参考~"></textarea>
							<div class="back-img">
								<img src="images/goods.png">
								<img src="images/goods.png">
								<img src="images/goods.png">
							</div>
							<div class="add-img">添加晒单图片<input type="file"></div>

							<!-- 是否匿名 -->
							<div class="none-name clearfix">
								<input type="checkbox" id="none-name">
								<label for="none-name" class="select-box"></label>
								<label>匿名评价</label>
							</div>

							<!-- 评价 -->
							<div class="service-manner clearfix">
								<span>服务态度：</span>
								<div class="evalue clearfix">
									<span></span>
									<span></span>
									<span></span>
									<span></span>
									<span></span>
								</div>
							</div>
							<div class="service-manner clearfix">
								<span>发货速度：</span>
								<div class="evalue clearfix">
									<span></span>
									<span></span>
									<span></span>
									<span></span>
									<span></span>
								</div>
							</div>

							<button>提交</button>

						</form>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">

	export default{

	}

</script>

<style type="text/css" src="./Evaluate.css"></style>