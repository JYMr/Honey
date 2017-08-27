<template>	
	<div class="error">
		<div class="error-img"></div>
		<span><i>页面找不到了哇！！！</i></span>
	</div>
</template>

<style type="text/css">
.error{width: 100%;height: 5rem;position: fixed;top: 0;bottom: 0;margin:auto;}
.error span{font-size: 0.5rem;display: block;text-align: center;color: #666;line-height: 1rem;}
.error span i{animation:hinge 1s forwards;display: inline-block;}
.error-img{background: url(../../static/images/404.png) center center no-repeat;background-size:4rem 4rem;width: 4rem;height: 4rem;margin: 0 auto;transform: rotate(-15deg)}

@keyframes hinge {
  0% {
    transform-origin: top right;
    animation-timing-function: ease-in-out;
  }

  20%, 60%, 100% {
    transform: rotate(20deg);
    transform-origin: top left;
    animation-timing-function: ease-in-out;
  }

  40%, 80% {
    transform: rotate(10deg);
    transform-origin: top left;
    animation-timing-function: ease-in-out;
    opacity: 1;
  }

}
</style>