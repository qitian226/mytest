$().ready(function(){
	loadHoverFun();
	initScreenWidth("main",function(){
	 });
	    var loading = true;
	    var topictype="";
	    var tag="";
	    var n = 1;
	    var $ul=$("#new_t");
	    loadTopic(1);
		function loadTopic(pageIndex){
			var url_;
			url_=localhostPath+"u/topic/page?username="+username+"&page="+pageIndex+"&type="+topictype+"&tag="+tag;
			 $.ajax({
			     url : url_,
			     dataType :"html",
			     async:false,
			     data:{},
			     method : "post",
			     beforeSend:function(XMLHttpRequest){
		        },
			     success : function(html) {
			    	 $html=$(html);
			    	 $ul.append($html);
			    	 $html.fadeIn(2500);
			    	 loadHoverFun();
			    	 n++;
		    	     loading = true;
			     },error:function(XMLHttpRequest, textStatus, errorThrown){
			    	 if(XMLHttpRequest.status==500){
		 	    		 layer.msg(XMLHttpRequest.responseText);
		 	    	 }
		 	     }
			 }); 
		}
		var bindScroll=function(){
			$(window).on("scroll",function(){
				if(n>maxnum){
					$(window).unbind('scroll');
					return;
				}
		      
			  if($ul.height() <= $(window).scrollTop()+$(window).height()){
				  if (loading) {
				loading=false;
				loadTopic(n);
			   }
		   }
		});
		}
		bindScroll();
		var loadQuery=function(){
			$("#new_t").html("");
			setTotalCount();
			loadTopic(1);
			bindScroll();
		}
		var setTotalCount=function(){
			var url_;
			url_=localhostPath+"u/topic/page/count?username="+username+"&type="+topictype+"&tag="+tag;
			 $.ajax({
			     url : url_,
			     dataType :"json",
			     async:false,
			     data:{},
			     method : "post",
			     beforeSend:function(XMLHttpRequest){
		        },
			     success : function(data) {
			    	 if(data && data.isPass=="ok"){
			    		 maxnum = Math.ceil(data.count/range);
			    	 }
			     },error:function(XMLHttpRequest, textStatus, errorThrown){
			    	 if(XMLHttpRequest.status==500){
		 	    		 layer.msg(XMLHttpRequest.responseText);
		 	    	 }
		 	     }
			 }); 
			
		}
		 function loadTags(type_){
			  var url_=localhostPath+"edit/topic/loadtags";
			  $.ajax({
					url : url_,
					dataType:"html",
					data :{"type":type_},
					async:false,
					method : "post",
					success : function(html) {
					 $("#topic_tags").html(html);
					  $("#topic_tags a").on("click",function(e){
						   var a=e.target;
							if(a.tagName=="A"){
							 $("#topic_tags a").attr("class","tag");	
							 $(a).attr("class","tag-current");
							 tag=$(a).data("id");
							 loadQuery();
							 return false;
							}
						}); 
					} ,error:function(XMLHttpRequest, textStatus, errorThrown){
			 	    	 if(XMLHttpRequest.status==500){
			 	    		 layer.msg(XMLHttpRequest.responseText);
			 	    	 }else{
			 	    		 layer.msg("歇工了,出了点故障...");
							}
			 	     }
				}); 
		  };
	 
		 //效果渲染
		  $("#topic_type a").on("click",function(e){
			    var a=e.target;
				if(a.tagName=="A"){
				 $("#topic_type a").attr("class","stype");	
				 $(a).attr("class","type-current");
				 loadTags($(a).data("id"));
				 topictype=$(a).data("id");
				 tag="";
				 loadQuery();
				 return false;
				}
			});
		  $("#topic_tags a").on("click",function(e){
			    var a=e.target;
				if(a.tagName=="A"){
				 $("#topic_tags a").attr("class","tag");	
				 $(a).attr("class","tag-current");
				 tag=$(a).data("id");
				 loadQuery();
				 return false;
				}
			}); 
});