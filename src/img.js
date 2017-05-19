(function(){
	//支持一个页面中多处使用图片轮播
	window.picInit = function(){
		var arrayContainer = [].slice.call(document.getElementsByClassName("container"));

		//为每个图片轮播模块添加下一帧与前一帧按钮以及事件
		if(arrayContainer.length){
			arrayContainer.forEach(function(item){
				addChild(item);
			});
		}else{
			console.log("There's no div.container");
		}
	}

	function addChild(container){
		createElement(container).forEach(function(item){
			container.appendChild(item);
		})
	}

	//创建前一帧，下一帧，以及圆圈元素
	function createElement(container){
		var img = container.children[0];
		var num = img.children.length;
		if(!num){
			console.log("There's no img");
			return ;
		}
		var next = document.createElement("div");
		var front = document.createElement("div");
		var circle = document.createElement("div");
		next.innerHTML = '<i class="fa fa-chevron-right fa-4x"></i>';
		front.innerHTML = '<i class="fa fa-chevron-left fa-4x"></i>';
		next.style = "position:absolute;right:0;top:50%;cursor:pointer;background-color:rgba(96,96,96,0.5);";
		front.style = "position:absolute;left:0;top:50%;cursor:pointer;background-color:rgba(96,96,96,0.5);";
		for(var i = 0; i < num; i++){
			circle.appendChild(document.createElement("div"));
		}
		circle.className = "circle";
		addEvent(img,front,next,num,circle,container);
		return [next,front,circle];
	}	

	//定义事件
	function addEvent(img,front,next,num,circle,container){
		var circles = [].slice.call(circle.children);
		circles[0].className = "active";
		next.onclick = function(){
			var right = parseInt(img.style.right);
			if(right){
				if((right / 100) == num - 1){
					right = 0;
				}else{
					right += 100;
				}
			}else{
				right = 100;
			}
			img.style.right = right + "%";
			circles[(num - 1 + right/100) % num].className = "";
			circles[right/100].className = "active";
		}
		front.onclick = function(){
			var right = parseInt(img.style.right);
			if(right){
				right -= 100;
			}else{
				right = (num - 1)*100;
			}
			img.style.right = right + "%";
			circles[(right/100 + 1) % num].className = "";
			circles[right/100].className = "active";				
		}
		var intervalEvent = setInterval(function(){
			next.click();
		},3000);
		container.onmouseover = function(){
			clearInterval(intervalEvent);
		}
		container.onmouseout = function(){
			intervalEvent = setInterval(function(){
					next.click();
				},3000);		
		}
	}
})();
