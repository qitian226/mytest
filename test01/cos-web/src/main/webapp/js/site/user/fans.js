$().ready(function(){
	initScreenWidth("main",function(){
	 });
var loading = true;
var n = 1;
var $ul=$("#fans");
loadFans(n); 
function loadFans(pageIndex){
	var url_;
	url_=localhostPath+"u/loadfans/page?userid="+userid+"&page="+pageIndex;
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
	    	 $html.fadeIn(3500);
	    	 n++;
    	     loading = true;
	     },error:function(XMLHttpRequest, textStatus, errorThrown){
	     }
	 }); 
};
var bindScroll=function(){
	$(window).on("scroll",function(){
		if(n>maxnum){
			$(window).unbind('scroll');
			return;
		}
      
	  if($div.height() <= $(window).scrollTop()+$(window).height()){
		  if (loading) {
		loading=false;
		loadFans(n);
	   }
   }
});
}
bindScroll();
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
});