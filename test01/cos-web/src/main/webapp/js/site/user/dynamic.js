$().ready(function(){
	initScreenWidth("main",function(){
	 });
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
var loading = true;
var n = 2;
var $div=$("#dy_container");

function loadDynamic(pageIndex){
	var div=$("#dy_container div:last-child");
	var prev_date=$(div.find(".prev_date")[0]).val();
	var url_;
	url_=localhostPath+"u/dynamic/page?userid="+userid+"&page="+pageIndex+"&prev_date="+prev_date;
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
      
	  if($div.height() <= $(window).scrollTop()+$(window).height()){
		  if (loading) {
		loading=false;
		loadDynamic(n);
	   }
   }
});
}
bindScroll();
});