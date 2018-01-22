$().ready(function(){
	initScreenWidth("main",function(){
	 });

var loading = true;
var n = 2;
var $div=$("#photos");

function loadAttention(pageIndex){
	var url_;
	url_=localhostPath+"u/attention/page?userid="+userid+"&page="+pageIndex;
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
	    	 loadHoverFun();
	    	 n++;//计数
	    		 // 重置加载flag
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
		loadAttention(n);
	   }
   }
});
}
loadHoverFun();
bindScroll();
});