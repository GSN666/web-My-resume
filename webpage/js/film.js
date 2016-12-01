window.onload = function() {

	//获得对象
	var pic = document.getElementById('pic');
	var content = document.getElementById('content');
	var biaoti = document.getElementById('biaoti');
	var imgs = pic.getElementsByTagName('img');
	var divs = document.getElementsByClassName('wenzi');

	// 设置图片的自定义属性
	for (var i = 0; i < imgs.length; i++) {
		imgs[i].setAttribute('tid', i);
	}

	// 事件委托，pic父元素单击事件
	pic.onclick = function(e) {

		e = e || window.event;

		// 获得事件源
		var currObj = e.target || e.srcElement;

		// 如果事件源不是图片，停止执行
		if (currObj.nodeName != 'IMG') return;

		// 获得图片自定义属性
		var tid = currObj.getAttribute('tid');

		// 设置所有的图片失去高亮，内容全部隐藏
		for (var j = 0; j < imgs.length; j++) {
			imgs[j].className = '';
			divs[j].style.display = 'none';
		}

		// 当前图片高亮
		currObj.className = 'select';
		// 当前内容显示
		divs[tid].style.display = 'block';
	}

}