window.onload = function(){
	var wraper = document.getElementById('search_wraper');
	var searchInput = document.getElementById('searchInput');
	var searchTips = document.getElementById('searchTips');
	var li = searchTips.getElementsByTagName('li');
	
	searchInput.onfocus = function(){
		searchTips.style.display = "block";

		for (var i = 0;i < li.length - 1;i ++) {
			
			(function(index){
				var a = li[index].childNodes[1];
				li[index].onclick = function() {
					searchInput.value = li[index].childNodes[0].innerHTML;
					searchInput.blur();						
				}
				a.onclick = function(e){
					e = e || window.event;
					e.stopPropagation? e.stopPropagation():e.cancelBubble=true;
					var currObj = e.target || e.srcElement;
					currObj.parentNode.outerHTML = '';					
				}
				
				document.onkeydown = function(e){
					e = e || window.event;
					if (searchTips.style.display = "block"){						
						if (e.keyCode == 38){
							tid -- ;
							if (tid < 0){
								tid = li.length - 2;
							}
						}
						if(e.keyCode == 40){
							tid ++;
							if (tid >= li.length - 1){
								tid = 0;
							}
						}
						if (e.keyCode == 13){
							searchInput.value = li[tid].childNodes[0].innerHTML;
							searchInput.blur();
							searchTips.style.display = "none";
						}
						if (e.keyCode == 27){								
							searchInput.blur();
							searchTips.style.display = "none";
						}
						for (var j = 0;j < li.length - 1;j ++) {
								li[j].className = '';
							}
							li[tid].className = 'highlight';							
					}
				}
				

			})(i);
		}
	}
	document.onclick = function (){
		searchTips.style.display = "none";
	}
	// 阻止文本框单击事件冒泡
	searchInput.onclick = function(e){
		e = e || window.event;
		e.stopPropagation? e.stopPropagation():e.cancelBubble=true;
	}
}