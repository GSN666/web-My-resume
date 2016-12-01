var speed = 10;//速度

var slider = document.getElementById('slider-box');//容器
var sliderWrapper = document.getElementById('slider-wrapper');//内层容器
var slider1 = document.getElementById('slider1');//正体		

slider1.innerHTML += slider1.innerHTML; //拷贝内容一式两份
slider1.innerHTML += slider1.innerHTML; //考虑内容填不满，一式四份

//改变left位置向左移动，当left值小于等于正体内容，left复位0
function marquee() {
	var sLeft = parseInt(slider1.style.left);

	if (sLeft <= -slider1.offsetWidth/4) {				
		sLeft = 0;	
	}			

	sLeft --;
	slider1.style.left = sLeft + 'px'; 			
}

//初始化定时器
var timer = setInterval(marquee, speed);

//鼠标移上停止
slider.onmouseover = function() {
	window.clearInterval(timer);
}

//鼠标离开继续
slider.onmouseout = function() {
	timer = setInterval(marquee, speed);
}