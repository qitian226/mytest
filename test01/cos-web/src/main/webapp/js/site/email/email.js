 var sendEmail=function(){
	  var message_=$("#msg_content").val();
	  if(message_.length==0){
		  layer.msg("总要说点什么哦!");
		  return false;
	  }
	  if(message_.length>500){
		  layer.msg("邮件不能超过500字哦!");
		  return false;
	  }
	  var tocken_= getPreventReplyTocken(); //防重每次提交刷新
	  $.ajax({
		     url : localhostPath+"email/sendemail/"+userid,
		     dataType :"html",
		     async:true,
		     data:{message:message_,tocken:tocken_},
		     method : "post",
		     beforeSend:function(XMLHttpRequest){
	        },
		     success : function(html) {
		    		 $html=$(html);
		    		 $("#main_body").append($html);
		    		 $html.fadeIn(1000);
		    		 $("#msg_content").val("");
		    		 $("#msg").scrollTop($("#main_body").height());
		    		 $("#msg_content").focus();
		     },error:function(XMLHttpRequest, textStatus, errorThrown){
	 	    	 if(XMLHttpRequest.status==500){
	 	    		 layer.msg(XMLHttpRequest.responseText);
	 	    	 }
	 	     }
	  });
	  return false;
  }

  var histoyEmail=function(pageIndex){
	  $.ajax({
		     url : localhostPath+"email/hisemail/"+userid,
		     dataType :"html",
		     async:true,
		     data:{page:pageIndex},
		     method : "post",
		     beforeSend:function(XMLHttpRequest){
	        },
		     success : function(html) {
		    		 $html=$(html);
			    	     if(pageIndex==1){
		    		         $("#main_body").html($html);
			    	     }else{
			    	    	 $("#main_body").append($html);
			    	    	 $("#page_btn").html("... 分隔线 ...");
			    	    	 $("#page_btn").removeClass("nextpage");
			    	    	 $("#page_btn").addClass("page_line");
			    	    	 $("#page_btn").removeAttr("onclick");
			    	    	 $("#page_btn").removeAttr("id"); 
			    	     }
		    		 $html.fadeIn(1000);
		    		 $("#msg").scrollTop($("#main_body").height());
		     },error:function(XMLHttpRequest, textStatus, errorThrown){
	 	    	 if(XMLHttpRequest.status==500){
	 	    		 layer.msg(XMLHttpRequest.responseText);
	 	    	 }
	 	     }
	  });
	  return false;
  }
  
  $(function(){
	  $("#msg_content").focus();
	  self.setInterval(function(){
		  $.ajax({
			     url : localhostPath+"email/refreshemail/"+userid,
			     dataType :"html",
			     async:true,
			     data:{},
			     method : "post",
			     beforeSend:function(XMLHttpRequest){
		        },
			     success : function(html) {
			    	 $html=$(html);
		    		 $("#main_body").append($html);
		    		 $html.fadeIn(1500);
		    		 $("#msg").scrollTop($("#main_body").height());
			    	},error:function(XMLHttpRequest, textStatus, errorThrown){
			 	    	 if(XMLHttpRequest.status==500){
			 	    		 layer.msg(XMLHttpRequest.responseText);
			 	    	 }
			 	     }
		         }
		        );
	  },60000); 
  });