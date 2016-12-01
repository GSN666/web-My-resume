window.onload = function() {

	// 轮播容器
	var banner = document.getElementById('banner');
	// 图片列表
	var swiper = document.getElementById('swiper-wrapper');
	// 左右箭头
	var prev = document.getElementById('prev');
	var next = document.getElementById('next');

	// 单幅图片宽度
	var imageWidth = 1170;
	// 图片数量
	var imageCount = swiper.getElementsByTagName('div').length / 2;
	// 当前索引
	var currIndex = 0;
	// 动画同步标识
	var isAnimate = false;
	//轮播容器
	var container = document.getElementById('banner');

	// 左箭头单击事件
	prev.onclick = function() {

		//判断动画是否进行中
		if (isAnimate)
			return;

		// 索引递增
		currIndex --;

		if (currIndex < 0)
			currIndex = imageCount - 3;

		animate(imageWidth);//运动		
	}

	// 右箭头单击事件
	next.onclick = function() {

		//判断动画是否进行中
		if (isAnimate)
			return;

		// 索引递减
		currIndex ++;

		if (currIndex > imageCount - 3)
			currIndex = 0;

		animate(-imageWidth); //运行		
	}

	/*运动函数*/
	function animate(offset) {		

		// 计算出新的位置
		var newLeft = parseInt(swiper.style.left) + offset;

		// 运动参数
		var time = 800;//动画过渡时间
		var interval = 40;//每隔多少毫秒执行一次
		var speed = offset / (time / interval); //每次移动的像素数

		/*go函数*/
		function go() {

			// 获得当前位置
			var left = parseInt(swiper.style.left);

			// 判断是否到达目标位置
			if (speed > 0 && left >= newLeft || speed < 0 && left <= newLeft) {
				// 终止定时器
				clearInterval(timerId);
				// 动画终止
				isAnimate = false;
				//防止误差，直接设置到目标位置
				left = swiper.style.left = newLeft + 'px';

				// 判断是否到达替身图
				if (parseInt(left) == 0) {					
					swiper.style.left = -imageWidth * (imageCount - 2) + 'px';
				}

				if ( parseInt(left) == -imageWidth * (imageCount - 1) ) {
					swiper.style.left = -imageWidth + 'px';
				}

				return;
			}

			// 递增递减位置
			swiper.style.left = left + speed + 'px';
		}

		// 定时器
		var timerId = setInterval(go,interval);	
		// 动画进行中
		isAnimate = true;
	}

	// 自动播放
	function autoPlay(){
		next.click();
	}
	var timerId = setInterval(autoPlay,2000);
	// 移上停止
	container.onmouseenter = function(){
		clearInterval(timerId);
	}
	// 离开继续
	container.onmouseleave = function(){
		timerId = setInterval(autoPlay,2000);
	}



}