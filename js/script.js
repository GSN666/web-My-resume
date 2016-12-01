$(document).ready(function(){
	// 预加载
	$(window).load(function(){
	    $('.preloader').delay(1000).fadeOut("slow");    
	});

	// 主内容区背景幻灯片
	$('body').backstretch([
		"images/tm-bg-slide-1.jpg", 
		"images/tm-bg-slide-2.jpg",
		"images/tm-bg-slide-3.jpg"
	], 	{duration: 3200, fade: 1300});

	//轮播插件 
	var mySwiper = new Swiper('.swiper-container',{
	    loop: true,
		autoplay: 2000,
		pagination: '.swiper-pagination',			
		paginationClickable: '.swiper-pagination',
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		autoplayDisableOnInteraction: false
	});

	// 技术圆的设置
	var colors = [
			['#ced7df', '#76b852'], ['#ced7df', '#76b852'], ['#ced7df', '#76b852'], ['#ced7df', '#76b852']
		];
	for (var i = 1; i <= 5; i++) {
		var child = document.getElementById('circles-' + i),
			percentage = 90 - (i * 10);
			
		Circles.create({
			id:         ('circles-' + i),
			percentage: percentage,
			radius:     80,
			width:      10,
			number:   	percentage / 10,
			text:       '%',
			colors:     colors[i - 1]
		});
	}
});