$(function(){
//获取audio对象
var audio = document.getElementById("audio");

//菜单的点击事件
$("#menu a").on("click",function(e){
	console.log(e);
	$(this).parent().parent().find("span").removeClass("music-head-tip");
	$(this).next("span").addClass("music-head-tip");
	//子菜单在此动态生成，此处不实现
})
//初始化第一个菜单点击
$("#menu li").eq(0).find("a").click();

//子菜单选中时的效果
$("#menuItem a").on("click",function(){
	$("#menuItem a").removeClass("music-head-item-li-click");
	$(this).addClass("music-head-item-li-click");
})

//第三个li的点击事件触发
$("#menuItem li").eq(2).find("a").click();

//播放栏的鼠标进入事件
$("#lock").parent().on("mouseenter",function(){
	$("#tools").css({"display":"block"});
})
//播放器栏的鼠标离开事件
$("#toolbody").on("mouseleave",function(){
	$("#tools").css({"display":"none"});
})
//固定播放器栏
$("#lock").on("click",function(){
	//获取播放器栏的状态，是锁定还是未锁定
	var status = $("#lock").attr("status");
	//未锁定状态 0
	if(status == 0){
		$("#lock").children().eq(0).removeClass("music-play-lock").addClass("music-play-locked");
		//移除mouseleave事件
		$("#toolbody").off("mouseleave");
		//更改状态
		$("#lock").attr("status",1);
	}
	//锁定状态 1
	if(status == 1){
		$("#lock").children().eq(0).removeClass("music-play-locked").addClass("music-play-lock");
		//添加mouseleave事件
		$("#toolbody").on("mouseleave",function(){
			$("#tools").css({"display":"none"});
		})
		//更改状态
		$("#lock").attr("status",0);
	}
})

$("#mr,#mc").on("click",function(obj){
	var width = document.getElementById("mr").offsetWidth;
	audio.currentTime = obj.offsetX / width * audio.duration ;
	var $this = $("#pp");
	//播放
	audio.play();
	$this.removeClass("music-play-pause").addClass("music-play-playing");
	audioPlugns.myRotate(1);
	//更改状态
	$this.attr("flag",0);	
})

$("#vall,#vnow").on("click",function(obj){
	var ah = document.getElementById("vall").offsetWidth;
	var ch = obj.offsetX;

	var vol = ch < 8 ? 0 : ch;
	var width = ch < 8 ? 8 : ch;

	$("#vnow").css({"width":width});

	if(vol == 0){
		$("#va").removeClass("music-mode-voice").addClass("music-mode-voice-zero");
	}
	if(vol > 0){
		$("#va").removeClass("music-mode-voice-zero").addClass("music-mode-voice");
	}
	audio.volume = vol / ah;
})
$("#va").on("click",function(){
	var f = $(this).attr("showVoice");
	if(f==1){
		$(this).prev().css({"display":"block"});
		$(this).attr("showVoice","0");
	}
	if(f==0){
		$(this).prev().css({"display":"none"});
		$(this).attr("showVoice","1");
	}
})

$("#voicep").on("mousedown",function(obj){

})

$("#mp").on("click",function(){
	$("#pp").click();
})

//播放按钮的点击事件
$("#pp").on("click",function(){
	//播放状态
	var flag = $(this).attr("flag");
	//暂停 1
	if(flag == 1){
		//播放
		audio.play();
		$(this).removeClass("music-play-pause").addClass("music-play-playing");
		//更改状态
		$(this).attr("flag",0);
	}
	//播放 0
	if(flag == 0){
		audio.pause();
		$(this).removeClass("music-play-playing").addClass("music-play-pause");
		//更改状态
		$(this).attr("flag",1);
	}

	audioPlugns.myRotate(flag);		

})
//滚动条事件   返回TOP事件
$(document).scroll(function(){  
var top=$(document).scrollTop();  
if(top<300){  
$('#to_top').hide(); 			
}  
else{  
$('#to_top').show();  
}  
})  

//返回TOP
$('#to_top').click(function(){  
$('body,html').animate({scrollTop:0},300);  
})  

$("#ta").on("input propertychange",function(){
	var count = $(this).val().length;
	var leaveCount = 140 - count;
	if(leaveCount < 0){
		alert("已达到最大数字限制");
		$(this).val($(this).val().substring(0,139));
		return false;
	}
	$("#tac").text(leaveCount);
})

$(".music-list-table-a").on("click",function(){
	$("#tb").find(".music-list-table-a-playing").removeClass("music-list-table-a-playing").addClass("music-list-table-a");
	$(this).removeClass("music-list-table-a").addClass("music-list-table-a-playing");						
	audio.currentTime = 0;
	$("#pp").attr("flag",1);
	audio.src= $(this).attr("url");
	$("#pp").click();
	var song = $(this).parents("tr").find("td").eq(1).text();
	var singer = $(this).parents("tr").find("td").eq(3).text();
	$("#song").text(song);
	$("#singer").text(singer);

	//获取歌词
	var lrc = $(this).attr("lrc");
	audioPlugns.lrc = $("#"+lrc).text();
	audioPlugns.parseLrc();
})

$("#prev").on("click",function(){
	$("#tb").find(".music-list-table-a-playing").parents("tr").prev("tr").find(".music-list-table-a").click();
})	

$("#next").on("click",function(){
	$("#tb").find(".music-list-table-a-playing").parents("tr").next("tr").find(".music-list-table-a").click();
})

$("#modechange").on("click",function(obj){
	var mode = $(this).attr("mode");
	// 1 单曲循环   2顺序播放    3随机播放

	if(mode == 1){
		$(this).removeClass().addClass("music-mode-all");
		$("#audio").removeAttr("loop");
		$(this).attr("mode","2");
		$(this).attr("title","顺序播放");
		//实现顺序
	}
	if(mode == 2){
		$(this).removeClass().addClass("music-mode-random");
		$("#audio").removeAttr("loop");
		$(this).attr("mode","3");
		$(this).attr("title","随机播放");
		//实现随机
	}
	if(mode == 3){
		$(this).removeClass().addClass("music-mode-one");
		$("#audio").attr("loop","loop");
		$(this).attr("mode","1");
		$(this).attr("title","单曲循环");
	}
})

//转到音乐列表
$("#ml").on("click",function(){
	var x = $("#tb").offset().top;
	$('body,html').animate({scrollTop:x},300);  
})

//audio的一系列事件
var audioPlugns = {
	lrc:$("#lrc3").text()/*歌词内容*/,
	delay:0.2/*延迟*/,
	duration:478/*进度条长度*/,
	now:14/*进度条当前位置*/,
	fraction:120, /*高亮显示行在歌词显示区域中的固定位置值*/
	freq:200, /* 滚动频率（ms）*/
	sh:0/*歌词滚动条的初始位置*/,
	__interval:null,
	__angle:0,
	/*初始化数据 server*/
	init:function(){
		$.ajax({
			url:"梦幻诛仙.lrc",
			type: "POST",
			dataType: "jsonp", //指定服务器返回的数据类型
			success: function (data) {
				//var result = JSON.stringify(data); //json对象转成字符串
				console.log(data);
			}
		});
	},
	/*解析歌词*/
	parseLrc:function(){
		var arr = audioPlugns.lrc.split("\n");
		var lrcArray = [];
		var html = "";
		for(var i=0;i<arr.length;i++){
			if(arr[i] != ""){
				var tempArray = arr[i].split("]");
				if(tempArray.length >1 ){
					var offset = tempArray[0].substring(1,tempArray[0].length-1);
					var text = tempArray[1];
					lrcArray.push({"offset":offset,"text":text});
					//去掉内容为空的数据
					if(text != ""){
						html+="<p time="+audioPlugns.parseTime(offset).toFixed(1)+">"+text+"</p>";
					}
				}
			}
		}
		$("#lc").html(html);
		return lrcArray;
	},
	/*解析时间*/
	parseTime:function(time){
		var tl = time.split(":");
		switch(tl.length){
			case 1 :
				return parseFloat(tl[0]);
			case 2:
				return parseFloat(tl[0]) * 60 + parseFloat(tl[1]);
			case 3:
				return parseFloat(tl[0]) * 3600 + parseFloat(tl[1]) * 60 + parseFloat(tl[2]);
		}
	},
	/*美化时间*/
	buautifulTime:function(second){
		var h = '00',m = '00',s = '00';
		if(second >= 3600){
			if(Math.floor(second/3600)>0 && Math.floor(second/3600) < 10)
				h = '0'+ Math.floor(second/3600);
			else
				h = '' + Math.floor(second/3600);
			second = Math.floor(second%3600);
		}

		if( second < 3600 && second >=60){
			if(Math.floor(second/60)>0 && Math.floor(second/60) < 10)
				m = '0'+ Math.floor(second/60);
			else
				m = '' + Math.floor(second/60);
			second = Math.floor(second%60);
		}

		if(second<60) {
			if(second < 10)
				s = '0'+Math.floor(second);
			else
				s = Math.floor(second);
		}

		return h == '00'? (m +':' + s) : (h + ':' + m +':' + s);
	},
	/*歌词渲染*/
	renderLrc:function(ct,du){
		var pList = $("#lc").find("p");
		$("#lc").find('p').removeClass('activated');
		//滚动条的高度
		var sc = document.getElementById("lc").scrollHeight;

		pList.each(function(index,element){
			var t = parseFloat($(this).attr("time")) - audioPlugns.delay;
			var pt = parseFloat($(this).prev().attr("time"));
			var nt = parseFloat($(this).next().attr("time"));

			if(ct >= t && ct <= nt){
				$(this).addClass("activated");
				var x = index*sc/pList.length - audioPlugns.fraction;
				//设置滚动距离
				audioPlugns.sh = x > 0 ? x : 0;
			}

			//保持最后一行高亮
			if(ct >= t && isNaN(nt)){
				$(this).addClass("activated");
			}

		})

		$("#lc").animate({"scrollTop":audioPlugns.sh},audioPlugns.freq); 
		var cw= (ct/du *audioPlugns.duration + audioPlugns.now)+"px";
		$("#mc").css({"width":cw});

		$("#musicNow").html("<em>"+audioPlugns.buautifulTime(ct)+"</em> / "+audioPlugns.buautifulTime(du));		
	},
	timeUpdate:function(){
		//获得当前播放时间
		var ct = audio.currentTime;
		var du = audio.duration;
		if(audio.ended == true){
			var $this = $("#pp");
			$this.removeClass("music-play-playing").addClass("music-play-pause");
			//更改状态
			$this.attr("flag",0);
			//audio.currentTime = 0;
			audioPlugns.myRotate(0);	

			//循环模式
			audioPlugns.myMode();
		}

		audioPlugns.renderLrc(ct,du);
	},
	myRotate:function(f){
		//每次设置定时器前先清除掉之前的
		clearInterval(audioPlugns.__interval);
		audioPlugns.__interval = setInterval(function(){
			$("#mdp").css({
				"transform":"rotate("+audioPlugns.__angle+"deg)",
				"-ms-transform":"rotate("+audioPlugns.__angle+"deg)", /* Internet Explorer */
				"-moz-transform":"rotate("+audioPlugns.__angle+"deg)", /* Firefox */
				"-webkit-transform":"rotate("+audioPlugns.__angle+"deg)",/* Safari 和 Chrome */
				"-o-transform":"rotate("+audioPlugns.__angle+"deg)" /* Opera */
			});

			//旋转角度+3
			audioPlugns.__angle+=3;

			//旋转角度大于360后重置
			if(audioPlugns.__angle == 360)
				audioPlugns.__angle = 0;
		},50);

		//暂停时清除定时器
		if(f==0){
			clearInterval(audioPlugns.__interval);
		}

	},
	myMode:function(){
		var mode =$("#modechange").attr("mode");
		if(mode == 2){
			$("#next").click();
		}
		if(mode == 3){
			var len = $("#tb tr").length -2;
			var index = Math.floor(Math.random()*len);
			console.log(len +"    "+index);
			$("#tb tr:eq("+index+")").find(".music-list-table-a").click();
		}
	},
	getMusicList:function(){
		//ajax
		//...
		//table的长度
		var len = $("#tb tr").length -1;
		$("#ml").text(len)
		$("#tl").text(len)
	}
}

audioPlugns.parseLrc();
audioPlugns.getMusicList();
audio.addEventListener("timeupdate",audioPlugns.timeUpdate);
})
