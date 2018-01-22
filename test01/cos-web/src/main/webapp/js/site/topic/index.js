 $().ready(function(){
	 $("ul li").fadeIn(2500);
	 $(".col li").on({
	 	    mouseenter:function(){
	    	      $(this).find(".entry_num").animate({opacity:1},200);
	    	      $(this).find(".grade").animate({opacity:1},200);
	 	    },
	 	    mouseleave:function(){
	    	      $(this).find(".entry_num").animate({opacity:0},200);
	    	      $(this).find(".grade").animate({opacity:0},200);
	 	    }
	 	});	
	   
	    var loading = true;
	    var n = 2;
	    if(maxnum>=2){
	        loadTopic(n);
	    }
		function loadTopic(pageIndex,isTop){
			var url_;
			if(pageIndex){
				url_=localhostPath+"topic/page?type=${topictype}&page="+pageIndex;
			}
			if(isTop){
				url_=localhostPath+"topic/page?type=${topictype}&top=is";
			}
			 $.ajax({
			     url : url_,
			     dataType :"json",
			     async:false,
			     data:{},
			     method : "post",
			     beforeSend:function(XMLHttpRequest){
		        },
			     success : function(data) {
			    		for(var i=0;i<data.length;i++){
			    			var li,a,img,div;
			    			li =$("<li></li>");
			    			$div=$("<div class=\"p_img\">");
			    		    a=$("<a class=\"ts\" href=\""+localhostPath+"topic/"+data[i].classify+"/"+data[i].id+".html\" target=\"_blank\"></a>");
			    		    img=$("<img src=\""+localhostPath+"topic/image/s/"+data[i].id+".jpg\" style=\"height:"+data[i].imgHeight+"px\">");
			    		    div=$("<div class=\"tag\">"+
				    				   "<div class=\"c_nav\">"+
				    					"<a href=\""+localhostPath+"u/"+data[i].accountName+"\" target=\"_blank\"><img   src=\""+localhostPath+"u/image/"+data[i].createBy+"\"></a>"+
				    					"</div>"+
				    					"<div class=\"content\">"+
				    					 "<div class=\"author\"><a href=\""+localhostPath+"u/"+data[i].accountName+"\" target=\"_blank\">"
				    					 +data[i].author+"</a> 采集于 <a href=\""+localhostPath+"topic/"+data[i].type+"/index.html\" target=\"_blank\">"+data[i].typeName+"</a></div>"+
				    					 "<div class=\"title\">"+data[i].title+"</div>"+
				    					"</div>"+
				    				"</div>"); 
			    		    entry_num=$("<a class=\"entry_num\">"+data[i].entryNum+" 张</a>");
			    		    grade=$("<a class=\"grade\">"+data[i].grade+"</a>");
			    		    a.append(img);
			    		    a.append(entry_num);
			    		    a.append(grade);
			    		    $div.append(a).append(div);
			    		    li.append($div);
			    		    loadHoverFun(li);
					    	$minUl = getMinUl();
					    	$minUl.append(li);
					    	li.fadeIn(2500);
			    		}
			    		if(pageIndex){
			    			n++;
			    		}
		    	        loading = true;
			     },error:function(XMLHttpRequest, textStatus, errorThrown){
			    	 if(XMLHttpRequest.status==500){
		 	    		 layer.msg(XMLHttpRequest.responseText);
		 	    	 }
		 	     }
			 }); 
		}
		$(window).on("scroll",function(){
				if(n>maxnum){
					$(window).unbind('scroll');
					return;
				}
		       $minUl = getMinUl();
			  if($minUl.height() <= $(window).scrollTop()+$(window).height()){
				  if (loading) {
				loading=false;
				loadTopic(n,null);
			   }
		   }
		});
		function getMinUl(){
			var $arrUl = $("#container .col");
			var $minUl =$arrUl.eq(0);
			$arrUl.each(function(index,elem){
				if($(elem).height()<$minUl.height()){
					$minUl = $(elem);
				}
			});
			return $minUl;
		}
	 
		var loadHoverFun=function(li){
	    	$(li).on({
	    	    mouseenter:function(){
	       	      $(this).find(".entry_num").animate({opacity:1},200);
	       	      $(this).find(".grade").animate({opacity:1},200);
	    	    },
	    	    mouseleave:function(){
	       	      $(this).find(".entry_num").animate({opacity:0},200);
	       	      $(this).find(".grade").animate({opacity:0},200);
	    	    }
	    	});
	}
 });