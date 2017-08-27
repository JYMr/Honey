/*
	Author:JY.Mr
	Version:0.0.2(2017/8/23)
*/
import Vue from 'vue';
let DialogContent = Vue.extend(require('./Toast.vue'));

let content;
let Toast = {
	show:function(option){ 
		option = option || {};

		if (typeof option === 'string') {
			option = {
				Toast: option
			};
		}

		if(content) DestroyNow(content);

		content = new DialogContent({
			data : option
		})

		content.vm = content.$mount();
		document.body.appendChild(content.vm.$el);
		content.vm.visible = true;
		content.dom = content.vm.$el;
	}
}

Toast.close = function(){
	if(!content){
		console.warn('Toast not Init');
		return;
	}
	content.vm.visible = false;
	console.log('close')
}

const DestroyNow = (content) => {
	content.vm.$el.remove();
	content.$destroy(true);

}

export default Toast