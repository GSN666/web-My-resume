/*
	船票网订单功能业务逻辑
	作者：tom
	时间：2016-10-12
*/
$(document).ready(function(){
	// 票价信息
	var priceData = [
		{
			"priceType":"普通",
			"price":315,
			"priceDetails":"280+20+15"
		},
		{
			"priceType":"学生",
			"price":299,
			"priceDetails":"265+20+15"
		},
		{
			"priceType":"军人",
			"price":275,
			"priceDetails":"235+20+15"
		},
		{
			"priceType":"儿童",
			"price":98,
			"priceDetails":"65+20+15"
		}
	];

	// 常用乘船信息数据
	var passengerData = [
		{
			id:1,
			name:'王大川',
			codeTypeId:1,
			codeType:'身份证',
			code:'2202045678951',
			mobile:'13608965458',
			isDefault:true
		},
		{
			id:2,
			name:'张三',
			codeTypeId:1,
			codeType:'身份证',
			code:'220204565671111',
			mobile:'13608961111',
			isDefault:false
		},
		{
			id:3,
			name:'李四',
			codeTypeId:2,
			codeType:'军人证',
			code:'220204565672222',
			mobile:'13608961111',
			isDefault:false
		},
		{
			id:4,
			name:'王五',
			codeTypeId:3,
			codeType:'港澳台通行证',
			code:'220204565673333',
			mobile:'13608963333',
			isDefault:false
		},
		{
			id:5,
			name:'赵六',
			codeTypeId:4,
			codeType:'其他证件',
			code:'220204565674444',
			mobile:'13608964444',
			isDefault:false
		},
		{
			id:6,
			name:'钱七',
			codeTypeId:1,
			codeType:'身份证',
			code:'220204565675555',
			mobile:'13608965555',
			isDefault:false
		},
	];

	// 证件类型下拉列表
	var certTypeHtml = '<select name="certType"><option value="1">身份证</option><option value="2">军人证</option><option value="3">港澳台通行证</option><option value="4">其他证件</option></select>';

	//票价的列表框内容
	var priceListHtml = '';

	/*
		动态生成票价信息和票价的列表框内容
	*/
	
	priceListHtml += '<select name="price">';
	$.each(priceData, function(index, val) {
		var html = '<li>' + val.priceType + '<span class="highlight">￥' + val.price + '（' + val.priceDetails + '）</span></li>';
		$('.piaojialan ul li').last().before(html);
		// 动态生成票价的列表框内容
		priceListHtml += '<option value="' + val.price + '">' + val.priceType + '&nbsp;￥' + val.price + '</option>';

	});
	priceListHtml +='</select>';
	
	/*
		显示乘船人信息列表
	*/
	var htmlStr = '';
	$.each(passengerData, function(index, val) {
		htmlStr = '';
		htmlStr += '<label>';
		htmlStr += '<input type="checkbox" id="' + val.id + '">' + val.name;
		htmlStr += '</label>'; 
		// 显示默认乘船人
		if(val.isDefault){
			$('#defaultPassenger').html(htmlStr);
		} else{// 显示其他乘船人
			$('#passengerBlock').append(htmlStr);
		}
	});
	/*
		显示隐藏其他乘船人
	*/
	$('#moreBtn').click(function(event) {
		var that = this;
		$('#passengerBlock').fadeToggle(function() {
			if(/更多/.test($(that).text())){
				$(that).text('<<收起');
			} else{
				$(that).text('更多>>');
			}
		});
	});
	var passengerCount = 0;//人数限制
	/*
		传入乘船人id,返回乘船人数
	*/
	function findPassengerById(id){
		var p;

		$.each(passengerData,function(index, val) {
			if (val.id == id) {
				p = val;
				return false;
			}
		});

		return p;
	}
	/*
		乘船人复选按钮选中添加删除订单
	*/
	$('#allPassenger :checkbox').click(function(event) {
		var id = this.id;//获得当前复选id
		if(this.checked){//选中添加订单
			//判断是否已超过5人
			if(passengerCount >= 5){
				alert('最多选择5人！');
				return false;
			}
			var p = findPassengerById(id);//通过id找到对象数据

			// 拼接html字符串

		    htmlStr = '<ul id="' + id + '">';
		    htmlStr += '<li>' + priceListHtml +'</li>';
		    htmlStr += '<li>姓名：<input type="text" name="name" size="8" value="' + p.name + '" readonly></li>';
		    htmlStr += '<li><select><option name="code" value="' + p.codeTypeId + '">' + p.codeType + '</option></select><input type="text" value="' + p.code + '" readonly></li>';
		    htmlStr += '<li>电话：<input type="text" name="mobile" value="' + p.mobile + '" readonly></li>';
		    htmlStr += '<li><input type="button" value="删除当前" class="delBtn"></li>';
		    htmlStr += '</ul>'; 
		     // 增加条目
		    $('#passengerList').append(htmlStr);
		    passengerCount ++;//计数加1
		} else{//取消选中，删除订单
			if(confirm('删除此条信息？')){
				//删除对应条目
				$('#passengerList').find('#' + id).remove();
				passengerCount --;//计数减1
				console.log('passengerCount=' + passengerCount);
			}
		}
		getTotalPrice();//价格改变
	});
	// 默认乘船人信息条目添加
	$('#defaultPassenger :checkbox').click();
	/*
		单击删除当前按钮，删除当前条目(事件委托)
	*/
	$('#passengerList').on('click', '.delBtn', function(event) {
		if (!confirm('删除此条信息？')) {
			return;
		}
		// 获得当前ul
		var ul = $(this).parents('ul');
		// 获得当前ul的id
		var id = ul.attr('id');
		// 删除ul
		ul.remove();
		// 复选取消
		if (id){
			$('#allPassenger').find('#'+id).prop('checked',false);
		}

		passengerCount --;//计数减1	
		getTotalPrice();//价格改变
	});
	/*
		手动添加乘船人
	*/
	$('#addPassBtn').click(function(event) {

		//判断人数是否已超过5人
		if (passengerCount>=5) {
			alert('最多选择5人!');
			return false;
		}
		
		passengerCount ++;//计数加1

		// 拼接html字符串
	    htmlStr = '<ul>';
	    htmlStr += '<li>' + priceListHtml +'</li>';
	    htmlStr += '<li>姓名：<input type="text" name="name" size="8"></li>';
	    htmlStr += '<li>' + certTypeHtml + '<input type="text" name="code"></li>';
	    htmlStr += '<li>电话：<input type="text" name="mobile"></li>';
	    htmlStr += '<li><input type="button" value="删除当前" class="delBtn"></li>';
	    htmlStr += '</ul>';

	    // 增加条目
	    $('#passengerList').append(htmlStr);

	    getTotalPrice();//价格改变
	});
	/*
		计算票总价格
	*/
	function getTotalPrice() {
		
		var totalPrice = 0;//总票价

		$('#passengerList select[name=price]').each(function(index, opt) {
	        totalPrice += parseFloat(opt.value);
	    });
		
		//显示票数量
		$('#ticketCountTxt').text(passengerCount);
		//显示总价格
		$('#totalPriceTxt').text(totalPrice);		
	}
	/*
		价格下拉框改变时，更新金额
	*/
	$('#passengerList').on('change', 'select[name=price]', function(event) {
		getTotalPrice();
	});	
	/*
		表单验证函数
	*/
	function checkForm(){
		//验证姓名
		var names = $('#passengerList input[name=name]');
		for(var i = 0;i < names.length;i ++){
			if(names[i].value == ''){
				alert('必须填写乘船人姓名!');
				names[i].focus();
				return false;
			}
		}
		//验证证件号码
		var codes = $('#passengerList input[name=code]');
		for(var i = 0;i < codes.length;i ++){
			if(codes[i].value == ''){
				alert('必须填写乘船人证件号码!');
				codes[i].focus();
				return false;
			}
		}
		// 手机号码验证
		var mobiles = $('#passengerList input[name=mobile]');
		for(var i = 0;i < mobiles.length;i ++){
			if(mobiles[i].value == ''){
				alert('必须填写乘船人手机号码!');
				mobiles[i].focus();
				return false;
			}
		}
		return true;
	}
	/*
		提交订单
	*/
	$('#submitBtn').click(function(event) {
		if(!checkForm())
			return;
		
		alert('订票成功！！');
	});

});	