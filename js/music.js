$(function(){
	//??audio?§Ô
	var audio = document.getElementById("audio");
	
	//???????
	$("#menu a").on("click",function(e){
		console.log(e);
		$(this).parent().parent().find("span").removeClass("music-head-tip");
		$(this).next("span").addClass("music-head-tip");
		//?????????¨¬????§¨
	})
	//??????????
	$("#menu li").eq(0).find("a").click();
	
	//???????§¹?
	$("#menuItem a").on("click",function(){
		$("#menuItem a").removeClass("music-head-item-li-click");
		$(this).addClass("music-head-item-li-click");
	})
	
	//???li???????
	$("#menuItem li").eq(2).find("a").click();
	
	//??8???????
	$("#lock").parent().on("mouseenter",function(){
		$("#tools").css({"display":"block"});
	})
	//???8???k???
	$("#toolbody").on("mouseleave",function(){
		$("#tools").css({"display":"none"});
	})
	//?????8
	$("#lock").on("click",function(){
		//?????8???¨¬¡¦???¡¦¦Ä??
		var status = $("#lock").attr("status");
		//¦Ä???? 0
		if(status == 0){
			$("#lock").children().eq(0).removeClass("music-play-lock").addClass("music-play-locked");
			//??mouseleave??
			$("#toolbody").off("mouseleave");
			//????
			$("#lock").attr("status",1);
		}
		//???? 1
		if(status == 1){
			$("#lock").children().eq(0).removeClass("music-play-locked").addClass("music-play-lock");
			//??mouseleave??
			$("#toolbody").on("mouseleave",function(){
				$("#tools").css({"display":"none"});
			})
			//????
			$("#lock").attr("status",0);
		}
	})
	
	$("#mr,#mc").on("click",function(obj){
		var width = document.getElementById("mr").offsetWidth;
		audio.currentTime = obj.offsetX / width * audio.duration ;
		var $this = $("#pp");
		//??
		audio.play();
		$this.removeClass("music-play-pause").addClass("music-play-playing");
		audioPlugns.myRotate(1);
		//????
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
	
	//??§Õ??????
	$("#pp").on("click",function(){
		//????
		var flag = $(this).attr("flag");
		//?? 1
		if(flag == 1){
			//??
			audio.play();
			$(this).removeClass("music-play-pause").addClass("music-play-playing");
			//????
			$(this).attr("flag",0);
		}
		//?? 0
		if(flag == 0){
			audio.pause();
			$(this).removeClass("music-play-playing").addClass("music-play-pause");
			//????
			$(this).attr("flag",1);
		}
		
		audioPlugns.myRotate(flag);		
		
	})
	//?????   ??TOP??
	$(document).scroll(function(){  
		var top=$(document).scrollTop();  
		if(top<300){  
			$('#to_top').hide(); 			
		}  
		else{  
			$('#to_top').show();  
		}  
	})  
	
	//??TOP
	$('#to_top').click(function(){  
		$('body,html').animate({scrollTop:0},300);  
	})  
	
	$("#ta").on("input propertychange",function(){
		var count = $(this).val().length;
		var leaveCount = 140 - count;
		if(leaveCount < 0){
			alert("???????§°?");
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
		
		//????
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
		// 1 ????   2????    3????
		
		if(mode == 1){
			$(this).removeClass().addClass("music-mode-all");
			$("#audio").removeAttr("loop");
			$(this).attr("mode","2");
			$(this).attr("title","????");
			//?§¨??
		}
		if(mode == 2){
			$(this).removeClass().addClass("music-mode-random");
			$("#audio").removeAttr("loop");
			$(this).attr("mode","3");
			$(this).attr("title","????");
			//?§¨??
		}
		if(mode == 3){
			$(this).removeClass().addClass("music-mode-one");
			$("#audio").attr("loop","loop");
			$(this).attr("mode","1");
			$(this).attr("title","????");
		}
	})
	
	//???V??
	$("#ml").on("click",function(){
		var x = $("#tb").offset().top;
		$('body,html').animate({scrollTop:x},300);  
	})
	
	//audio??????
	var audioPlugns = {
		lrc:$("#lrc3").text()/*????*/,
		delay:0.2/*??*/,
		duration:478/*?????*/,
		now:14/*?????¦Ë?*/,
		fraction:120, /*??§¥?????§¥???????¦Ë??*/
		freq:200, /* ???¨º¨¨ms¨¦*/
		sh:0/*????????¦Ë?*/,
		__interval:null,
		__angle:0,
		/*????? server*/
		init:function(){
			$.ajax({
				url:"../source/lrc/¶Éºì³¾.lrc",
				type: "POST",
				dataType: "jsonp", //??????????`§ï
				success: function (data) {
					//var result = JSON.stringify(data); //json?§Ô?????
					console.log(data);
				}
			});
		},
		/*????*/
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
						//?????????
						if(text != ""){
							html+="<p time="+audioPlugns.parseTime(offset).toFixed(1)+">"+text+"</p>";
						}
					}
				}
			}
			$("#lc").html(html);
			return lrcArray;
		},
		/*????*/
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
		/*¨¡???*/
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
		//??†Þ?/
		renderLrc:function(ct,du){
			var pList = $("#lc").find("p");
			$("#lc").find('p').removeClass('activated');
			//??????
			var sc = document.getElementById("lc").scrollHeight;
			
			pList.each(function(index,element){
				var t = parseFloat($(this).attr("time")) - audioPlugns.delay;
				var pt = parseFloat($(this).prev().attr("time"));
				var nt = parseFloat($(this).next().attr("time"));
				
				if(ct >= t && ct <= nt){
					$(this).addClass("activated");
					var x = index*sc/pList.length - audioPlugns.fraction;
					//?????k
					audioPlugns.sh = x > 0 ? x : 0;
				}
				
				//????????
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
			//????????
			var ct = audio.currentTime;
			var du = audio.duration;
			if(audio.ended == true){
				var $this = $("#pp");
				$this.removeClass("music-play-playing").addClass("music-play-pause");
				//????
				$this.attr("flag",0);
				//audio.currentTime = 0;
				audioPlugns.myRotate(0);	
				
				//????
				audioPlugns.myMode();
			}
			
			audioPlugns.renderLrc(ct,du);
		},
		myRotate:function(f){
			//???????????????
			clearInterval(audioPlugns.__interval);
			audioPlugns.__interval = setInterval(function(){
				$("#mdp").css({
					"transform":"rotate("+audioPlugns.__angle+"deg)",
					"-ms-transform":"rotate("+audioPlugns.__angle+"deg)", /* Internet Explorer */
					"-moz-transform":"rotate("+audioPlugns.__angle+"deg)", /* Firefox */
					"-webkit-transform":"rotate("+audioPlugns.__angle+"deg)",/* Safari ? Chrome */
					"-o-transform":"rotate("+audioPlugns.__angle+"deg)" /* Opera */
				});
				
				//????+3
				audioPlugns.__angle+=3;
				
				//??????360???
				if(audioPlugns.__angle == 360)
					audioPlugns.__angle = 0;
			},50);
			
			//????????
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
			//table???
			var len = $("#tb tr").length -1;
			$("#ml").text(len)
			$("#tl").text(len)
		}
	}
	
	audioPlugns.parseLrc();
	audioPlugns.getMusicList();
	audio.addEventListener("timeupdate",audioPlugns.timeUpdate);
})