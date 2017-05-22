//无叠加的样式
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


//有叠加的js
(function(){
	picCarouseOver = {
		imgs:"",		//记录图片数组
		imgNum:0,		//记录图片的数量
		container:"",	//最外层的div
		front:"",		//前一帧按钮
		next:"",		//后一帧按钮
		imgflag:0,		//当前图片的flag
		styleflag:0,	//样式列表的当前元素flag
		circle:"",		//圆形图标
		styleArray:[],	//样式列表
		//初始化
		picInit:function(){
			this.container = document.getElementsByClassName("containerOver")[0];
			if(this.container){
				this.imgs = [].slice.call(this.container.children[0].children);
				this.imgNum = this.imgs.length;
				if(!this.imgNum){
					console.log("There's no img");
					return ;
				}			
				this.addChild();
			}else{
				console.log("There's no div.container");
			}	
			//在计算图片的初始宽度时如果未加载完成回出现错误，所以尝试使用Promise，如果在添加一个加载动画更好，这里就不再加了	
			var pro = new Promise(function(resolved,rejected){
				window.onload = function(){
					resolved();
				}
			})
			pro.then(function(){
				picCarouseOver.computeStyle();
			});
				
		},
		//添加前一帧，后一帧以及圆形节点
		addChild:function(){
			this.createElement().forEach(function(item){
				this.container.appendChild(item);
			},this);
		},
		//创建上述节点
		createElement:function(){
			this.next = document.createElement("div");
			this.front = document.createElement("div");
			this.circle = document.createElement("div");
			this.next.innerHTML = '<i class="fa fa-chevron-right fa-4x"></i>';
			this.front.innerHTML = '<i class="fa fa-chevron-left fa-4x"></i>';
			this.next.style = "position:absolute;right:0;top:50%;cursor:pointer;background-color:rgba(96,96,96,0.5);z-index:100;";
			this.front.style = "position:absolute;left:0;top:50%;cursor:pointer;background-color:rgba(96,96,96,0.5);z-index:100;";
			for(var i = 0; i < this.imgNum; i++){
				this.circle.appendChild(document.createElement("div"));
			}
			this.circle.className = "circle";
			this.addEvent();
			return [this.next,this.front,this.circle];
		},
		//计算样式，形成样式列表styleArray
		computeStyle:function(){
			var cwidth = this.container.offsetWidth;
			var cheight = this.container.offsetHeight;
			var imgwidth = this.imgs[0].offsetWidth;	//图片height为100%时的宽度
			var left = (this.container.offsetWidth - imgwidth)/2;
			console.log(imgwidth,left);
			var leftstep;								//left，top，opacity的步阶
			var topstep;
			var opacitystep
			this.styleflag = leftNum = Math.round((this.imgNum-1) / 2);
			rightNum = this.imgNum - leftNum - 1;
			if(leftNum > 5){
				leftstep = left / 5;
				opacitystep = 0.2;
			}else{
				leftstep = left / leftNum;
				opacitystep = 1 / (leftNum+1); //加1是为了防止左边只有一个元素而使元素不显示
			}
			topstep = cheight * 0.05;
			this.styleArray.push("z-index:"+this.imgNum+";height:100%;top:0;left:"+left+"px;opacity:1;");
			for(let i = 1;i <= rightNum;i++){
				this.styleArray.push("z-index:"+(this.imgNum-i)+";height:"+(1-0.1*i)*100+"%;"+"top:"+i*topstep+"px;"+"left:"+(cwidth-(left-leftstep*i + imgwidth*(1-0.1*i)))+"px;"+"opacity:"+(1-opacitystep*i)+";	");
			}
			for(let i = 1;i <= leftNum;i++){
				this.styleArray.unshift("z-index:"+(this.imgNum-i)+";height:"+(1-0.1*i)*100+"%;"+"top:"+i*topstep+"px;"+"left:"+(left-leftstep*i)+"px;"+"opacity:"+(1-opacitystep*i)+";");				
			}
			this.setStyle();
			 
		},
		//样式赋值
		setStyle:function(){
			for(let n = 0;n < this.imgNum;n++){
				this.imgs[(this.imgflag + n)%this.imgNum].style = this.styleArray[(this.styleflag+n)%this.imgNum];
			}
		},
		//添加事件
		addEvent:function(){
			var circles = [].slice.call(this.circle.children);
			var thistmp = this;
			circles[0].className = "active";
			this.next.onclick = function(){
				thistmp.imgflag = (thistmp.imgflag+1)%thistmp.imgNum;
				circles[(thistmp.imgNum + thistmp.imgflag - 1) % (thistmp.imgNum )].className = "";
				circles[thistmp.imgflag].className = "active";
				thistmp.setStyle();
			}
			this.front.onclick = function(){
				thistmp.imgflag = (thistmp.imgNum+thistmp.imgflag-1)%thistmp.imgNum;
				circles[(thistmp.imgflag + 1) % thistmp.imgNum].className = "";
				circles[thistmp.imgflag].className = "active";	
				thistmp.setStyle();			
			}		
		}
	}
	window.picOverInit = picCarouseOver.picInit.bind(picCarouseOver);
})()
