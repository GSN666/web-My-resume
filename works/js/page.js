$(document).ready(function(){
	//获得回到顶部按钮
	var topcontrol = $('#topcontrol');
	//获得导航条对象
	var nav = $('#nav');
	//导航条高度
	var navHeight = nav.outerHeight();
	//导航条相对于网页原点的偏移量
	var navPos = nav.offset().top;
	//回到顶部按钮单击
	topcontrol.click(function(event) {
		$('html,body').animate({scrollTop:0}, 1000)
	});
	//滚动条事件
	$(window).scroll(function(event) {
		//滚动条卷去的大小
		var sTop = $(window).scrollTop();
		//动态显示隐藏回到顶部按钮
		if (sTop >= 414) {
			topcontrol.fadeIn('normal');
			nav.removeClass('bg');
			nav.removeClass('fixed');
			$('#nav li').addClass('hover');
		} else {
			topcontrol.fadeOut('nomal');
			nav.addClass('bg');
			nav.addClass('fixed');
			$('#nav li').removeClass('hover');
		}
		/*
			动态设置导航条固定
		*/ 
		if (sTop >= navPos ) {
			if (!nav.hasClass('fixed')){
				nav.addClass('fixed');
			}						
		} else {
			if (nav.hasClass('fixed')) {
				nav.removeClass('fixed');		
			}
		}

		//滚动监听高亮导航
		function highLight(target) {
			$('#nav li').removeClass('active');
			$(target).addClass('active');
		}

		// 获得对应区块对象
		var Welcome = $('#Welcome');
		var News = $('#News');
		var Evolutin = $('#Evolutin');
		var Collection = $('#Collection');
		var Contact = $('#Contact');
		// 获得对应区块的高度
		var WelcomePos = {
			start:Welcome.offset().top - navHeight,
			end:Welcome.offset().top + Welcome.outerHeight() - navHeight,		
		}
		var NewsPos = {
			start:News.offset().top - navHeight,
			end:News.offset().top + News.outerHeight() - navHeight,		
		}
		var EvolutinPos = {
			start:Evolutin.offset().top - navHeight,
			end:Evolutin.offset().top + Evolutin.outerHeight() - navHeight,		
		}
		var CollectionPos = {
			start:Collection.offset().top - navHeight,
			end:Collection.offset().top + Collection.outerHeight() - navHeight,		
		}
		var ContactPos = {
			start:Contact.offset().top - navHeight,
			end:Contact.offset().top + Contact.outerHeight() - navHeight,		
		}

		// 导航条定位判断
		if(sTop >= WelcomePos.start && sTop < WelcomePos.end){
			highLight('.Welcome');
		} else if(sTop >= NewsPos.start && sTop < NewsPos.end){
			highLight('.News');
		} else if(sTop >= EvolutinPos.start && sTop < EvolutinPos.end){
			highLight('.Evolutin');
		} else if(sTop >= CollectionPos.start && sTop < CollectionPos.end){
			highLight('.Collection');
		} else if(sTop >= ContactPos.start && sTop < ContactPos.end){
			highLight('.Contact');
		} else{
			$('#nav li').removeClass('active');
		}
		// 网页底部隐藏导航条
		var footer = $('#footer');
		var footerPos = {
			start:footer.offset().top - navHeight,	
		}
		if(sTop >= footerPos.start){
			nav.removeClass('fixed');
		} else{
			nav.addClass('fixed');
		}
	});
	//导航链接到锚点
	$('#nav a').click(function(event) {
		//获得对应区块的相对于网页原点的偏移量
		var top = $(this.hash).offset().top - navHeight;
		$('html,body').animate({scrollTop:top}, 1000);
		return false;
	});
});