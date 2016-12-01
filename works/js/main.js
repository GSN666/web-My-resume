$(document).ready(function(){
	/*登录/注册按钮*/
	$('.log').click(function(event) {
		$('#login').fadeIn(500);
	});
	$('.reg').click(function(event) {
		$('#register').fadeIn(500);
	});
	$('#login').click(function(event) {
		$(this).hide();
	});
	$('#register').click(function(event) {
		$(this).hide();
	});
	$('.reg_login_panel').click(function(event) {
		return false;
	});
	// 关闭按钮
	$('#login p').click(function(event) {
		$('#login').hide();
	});
	$('#register p').click(function(event) {
		$('#register').hide();
	});
});