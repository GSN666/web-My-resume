/*头部轮播*/
	
var banner = document.getElementById('banner');// 轮播容器
// 图片列表
var list = document.getElementById('list');
// 单幅图片宽度
var imageHeight = 600;
// 图片数量
var imageCount = list.getElementsByTagName('img').length;
// 当前索引
var currIndex = 0;
// 动画同步标识
var isAnimate = false;
	
/*运动函数*/
function animate(offset) {		

	// 计算出新的位置
	var newTop = parseInt(list.style.top) + offset;

	// 运动参数
	var time = 800;//动画过渡时间
	var interval = 40;//每隔多少毫秒执行一次
	var speed = offset / (time / interval); //每次移动的像素数

	/*go函数*/
	function go() {

		// 获得当前位置
		var top = parseInt(list.style.top);

		// 判断是否到达目标位置
		if (speed > 0 && top >= newTop || speed < 0 && top <= newTop) {
			// 终止定时器
			clearInterval(timerId);
			// 动画终止
			isAnimate = false;
			//防止误差，直接设置到目标位置
			top = list.style.top = newTop + 'px';

			// 判断是否到达替身图
			if (parseInt(top) == 0) {					
				list.style.top = -imageHeight * (imageCount - 2) + 'px';
			}

			if ( parseInt(top) == -imageHeight * (imageCount - 1) ) {
				list.style.top = -imageHeight + 'px';
			}

			return;
		}

		// 递增递减位置
		list.style.top = top + speed + 'px';
	}

	// 定时器
	var timerId = setInterval(go,interval);	
	// 动画进行中
	isAnimate = true;
}
// 自动播放
function autoPlay(){
	//判断动画是否进行中
	if (isAnimate)
		return;

	// 索引递减
	currIndex ++;

	if (currIndex > imageCount - 3)
		currIndex = 0;

	animate(-imageHeight); //运行	
}
var timerId = setInterval(autoPlay,2000);
