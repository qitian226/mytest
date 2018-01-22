var loadHoverFun=function(){
	//鼠标进
    $(".p_img").hover(function(){
      $(this).find(".collect").animate({opacity:1},200);
    },function(){
      $(this).find(".collect").animate({opacity:0},200);
    }); 
}
$().ready(function(){
	 if(window.screen.width>1500){
		 $("#main").css("width","1500px"); 
	 } 
	 if(window.screen.width<1500){
		 $("#main").css("width","1255px");
	 } 
	   $(".attention_btn").hover(function(){
	    	  if($(this).text()=="已关注"){
	    		  $(this).text("取消关注");
	    		  $(this).attr("onclick","cancelAttention(this);")
	    	  }
		    },function(){
		    	 if($(this).text()=="取消关注"){
		    		  $(this).text("已关注");
		    		  $(this).attr("onclick","attention(this);")
		    	  } 
		    });
	//
 
    var loading = true;
    var maxnum = topictype.length;
    var $div=$("#nt");
    var n=0;
    loadTopic(topictype[n]);
	function loadTopic(type){
		var url_;
		url_=localhostPath+"u/collect?userid="+userid+"&type="+type;
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
		    	 $div.append($html);
		    	 $html.fadeIn(3500);
		    	 n++;
	    	     loading = true;
	    	 	loadHoverFun();
		     },error:function(XMLHttpRequest, textStatus, errorThrown){
		    	 if(XMLHttpRequest.status==500){
	 	    		 layer.msg(XMLHttpRequest.responseText);
	 	    	 }
	 	     }
		 }); 
	}
	var bindScroll=function(){
		$(window).on("scroll",function(){
			if(n>=maxnum){
				$(window).unbind('scroll');
				return;
			}
		  if($div.height() <= $(window).scrollTop()+$(window).height()){
			  if (loading) {
			loading=false;
			loadTopic(topictype[n]);
		   }
	   }
	});
	}
	
	bindScroll();
})