var layer,element;
 layui.use(['form','layer', 'element'],function(){ 
	  var $ = layui.jquery, layer = layui.layer,form = layui.form,element = layui.element;
			//fans注册展开事件
			element.on('collapse(fan-filter)', function(data){
				  if(data.show){
					  var node=data.title;
					  fanGroupSelect(node);
					  var gid=node.data("id");
					  $.ajax({
						     url : localhostPath+"email/fans/"+gid,
						     dataType :"html",
						     async:true,
						     data:{},
						     method : "post",
						     beforeSend:function(XMLHttpRequest){
					        },
						     success : function(html) {
						    	 $(data.content).html(html);
						    	 $(".fan-def").smartMenu(getImageMenuData(), {
									    name: "group"
								 });
						     },error:function(XMLHttpRequest, textStatus, errorThrown){
					 	    	 if(XMLHttpRequest.status==500){
					 	    		 layer.msg(XMLHttpRequest.responseText);
					 	    	 }
					 	     }
					        
					  });
				  }
				}); 
			//attendtion注册展开事件
			element.on('collapse(atten-filter)', function(data){
				  if(data.show){
					  var node=data.title;
					  attenGroupSelect(node);
					  var gid=node.data("id");
					  $.ajax({
						     url : localhostPath+"email/atten/"+gid,
						     dataType :"html",
						     async:true,
						     data:{},
						     method : "post",
						     beforeSend:function(XMLHttpRequest){
					        },
						     success : function(html) {
						    	 $(data.content).html(html);
						    	 $(".atten-def").smartMenu(getAttenImageMenuData(), {
									    name: "agroup"
								 });
						     },error:function(XMLHttpRequest, textStatus, errorThrown){
					 	    	 if(XMLHttpRequest.status==500){
					 	    		 layer.msg(XMLHttpRequest.responseText);
					 	    	 }
					 	     }
					        
					  });
				  }
				}); 
 }); 
 
 
 $(document).ready(function(){
	    //禁用右键菜单
	   /*      $(document).bind("contextmenu",function(e){
	        return false;
	    });  */
	 $(".fan-def").smartMenu(getImageMenuData(), {
		    name: "group"
		});
	 $(".atten-def").smartMenu(getAttenImageMenuData(), {
		    name: "agroup"
		});   
	 createHistoryEmailEvent();
	});
 
 var selectFan=function(a){
	 var fanid= $(a).data("id");
	 var name=$(a).find(".name").text();
	 if($("#fanUser").val()==fanid){
		 return;
	 }
	 $("#fanUser").val(fanid);
	 $("#box_title").html(name+"的来信");
	 $("#main_body").html("");
 }
 

var createHistoryEmailEvent=function(){
	$(".his_item").on("click",function(event){
		if(event.target.nodeName=='A'){
			 var emailid=$(event.target).data("id");
			  $.ajax({
				     url : localhostPath+"email/showemail/"+emailid,
				     dataType :"html",
				     async:true,
				     data:{},
				     method : "get",
				     beforeSend:function(XMLHttpRequest){
			        },
				     success : function(html) {
				    	 $html=$(html);
				    	 $("#main_body").html("");
			    		 $("#main_body").append($html);
			    		 $html.fadeIn(1500);
				     },error:function(XMLHttpRequest, textStatus, errorThrown){
			 	    	 if(XMLHttpRequest.status==500){
			 	    		 layer.msg(XMLHttpRequest.responseText);
			 	    	 }
			 	     }
			  });
		};
	})
}

var fanGroupSelect=function(a){
	$("#fansgroup-name").data("id",$(a).data("id"));
	$("#fansgroup-name").val($(a).data("title"));
}

var attenGroupSelect=function(a){
	$("#attengroup-name").data("id",$(a).data("id"));
	$("#attengroup-name").val($(a).data("title"));
}

var addgroup=function(){
	var name=$("#fansgroup-name").val();
	if(name.length==0){
		 layer.msg("分组名称不能为空哦!");
		 $("#fansgroup-name").focus();
		 return false;
	}
	if(!checkChineseAndEnglish(name)){
		layer.msg("分组名称只能为中英文哦!");
		 return false;
	}
	if(name.length>15){
		layer.msg("分组名称不能超出15字哦!");
		 return false;
	}
	layer.confirm('确认新建一个群组？', {
		  btn: ['确认', '取消'], title:false,
		  closeBtn: 0
		}, function(index, layero){
			  $.ajax({
				     url : localhostPath+"email/addfansgroup/"+name,
				     dataType :"json",
				     async:true,
				     data:{t:1},
				     method : "post",
				     beforeSend:function(XMLHttpRequest){
			        },
				     success : function(data) {
				    	    if(data.warn=="repeat"){
					    		 layer.msg("当前分组名称已经存在!");
					    		 $("#fansgroup-name").focus();
				    	    }
				    		 if(data.isPass=="ok"){
				    			 window.location.href=window.location.href;
				    		 }
				    		layer.close(index); 
				     },error:function(XMLHttpRequest, textStatus, errorThrown){
			 	    	 if(XMLHttpRequest.status==500){
			 	    		 layer.msg(XMLHttpRequest.responseText);
			 	    	 }
			 	     }
			        
			  });
		
		}, function(index){
			$("#fansgroup-name").focus();
			layer.close(index);
		});
}

var delgroup=function(){
	var groupid=$("#attengroup-name").data("id");
	var groupname=$("#attengroup-name").val();
	if(!groupid || !groupname ){
		 layer.msg("你要选择一个群组哦!");
		 return;
	}
	layer.confirm("确认移除 [ "+groupname+" ] 这个群组？", {
		  btn: ['确认', '取消'], title:false,
		  closeBtn: 0
		}, function(index, layero){
			  $.ajax({
				     url : localhostPath+"email/removegroup/"+groupid,
				     dataType :"json",
				     async:true,
				     data:{},
				     method : "post",
				     beforeSend:function(XMLHttpRequest){
			        },
				     success : function(data) {
				    		 if(data.isPass=="ok"){
				    			 window.location.href=window.location.href;
				    		 }else{
				    			 layer.msg(data.warn);
				    		 }
				    		layer.close(index); 
				     },error:function(XMLHttpRequest, textStatus, errorThrown){
			 	    	 if(XMLHttpRequest.status==500){
			 	    		 layer.msg(XMLHttpRequest.responseText);
			 	    	 }
			 	     }
			        
			  });
		
		}, function(index){
			layer.close(index);
		});
	 
}
var addattengroup=function(){
	var name=$("#attengroup-name").val();
	if(name.length==0){
		 layer.msg("分组名称不能为空哦!");
		 $("#attengroup-name").focus();
		 return false;
	}
	if(!checkChineseAndEnglish(name)){
		layer.msg("分组名称只能为中英文哦!");
		 return false;
	}
	if(name.length>15){
		layer.msg("分组名称不能超出15字哦!");
		 return false;
	}
	
	layer.confirm('确认新建一个群组？', {
		  btn: ['确认', '取消'], title:false,
		  closeBtn: 0
		}, function(index, layero){
			  $.ajax({
				     url : localhostPath+"email/addfansgroup/"+name,
				     dataType :"json",
				     async:true,
				     data:{t:2},
				     method : "post",
				     beforeSend:function(XMLHttpRequest){
			        },
				     success : function(data) {
				    	    if(data.warn=="repeat"){
					    		 layer.msg("当前分组名称已经存在!");
					    		 $("#attengroup-name").focus();
				    	    }
				    		 if(data.isPass=="ok"){
				    			 window.location.href=window.location.href;
				    		 }
				    		layer.close(index); 
				     },error:function(XMLHttpRequest, textStatus, errorThrown){
			 	    	 if(XMLHttpRequest.status==500){
			 	    		 layer.msg(XMLHttpRequest.responseText);
			 	    	 }
			 	     }
			        
			  });
		
		}, function(index){
			$("#attengroup-name").focus();
			layer.close(index);
		});
}

var delgroup=function(){
	var groupid=$("#attengroup-name").data("id");
	var groupname=$("#attengroup-name").val();
	if(!groupid || !groupname ){
		 layer.msg("你要选择一个群组哦!");
		 return;
	}
	layer.confirm("确认移除 [ "+groupname+" ] 这个群组？", {
		  btn: ['确认', '取消'], title:false,
		  closeBtn: 0
		}, function(index, layero){
			  $.ajax({
				     url : localhostPath+"email/removegroup/"+groupid,
				     dataType :"json",
				     async:true,
				     data:{},
				     method : "post",
				     beforeSend:function(XMLHttpRequest){
			        },
				     success : function(data) {
				    		 if(data.isPass=="ok"){
				    			 window.location.href=window.location.href;
				    		 }else{
				    			 layer.msg(data.warn);
				    		 }
				    		layer.close(index); 
				     },error:function(XMLHttpRequest, textStatus, errorThrown){
			 	    	 if(XMLHttpRequest.status==500){
			 	    		 layer.msg(XMLHttpRequest.responseText);
			 	    	 }
			 	     }
			        
			  });
		
		}, function(index){
			layer.close(index);
		});
	 
}
 
  var sendEmail=function(){
	  var content=$("#msg_content").val();
	  if(content.length==0){
		  layer.msg("输入点什么哦");
		  return false;
	  }
	  if(content.length>500){
		  layer.msg("邮件内容不能超出500字!");
		  return false;
	  }
	  if($(fanUser).val().length==0){
		  layer.msg("要选择个粉哦");
		  return false;
	  }
	  $.ajax({
		     url : localhostPath+"email/sendemail/"+$(fanUser).val()+"?tocken="+getPreventReplyTocken(),
		     dataType :"html",
		     async:true,
		     data:{message:$("#msg_content").val()},
		     method : "post",
		     beforeSend:function(XMLHttpRequest){
	        },
		     success : function(html) {
		    		 $html=$(html);
		    		 $("#main_body").append($html);
		    		 $html.fadeIn(1500);
		    		 $("#msg_content").val("");
		    		 $("#msg").scrollTop($("#main_body").height());
		     },error:function(XMLHttpRequest, textStatus, errorThrown){
	 	    	 if(XMLHttpRequest.status==500){
	 	    		 layer.msg(XMLHttpRequest.responseText);
	 	    	 }
	 	     }
	  });
	  return false;
  }
  var histoyEmail=function(pageIndex){
	  if($(fanUser).val().length==0){
		  layer.msg("要选择个联系人哦!");
		  return;
	  }
	  $.ajax({
		     url : localhostPath+"email/hisemail/"+$("#fanUser").val(),
		     dataType :"html",
		     async:true,
		     data:{page:pageIndex},
		     method : "post",
		     beforeSend:function(XMLHttpRequest){
	        },
		     success : function(html) {
		    	 if(pageIndex==1){
		    	  $("#main_body").html("");
		    	  $html=$(html);
		    	  $("#main_body").append($html);
		    	  $html.fadeIn(1500);
		    	  $("#msg").scrollTop($("#main_body").height());
		    	 }else{
			    	  $(".nextpage").each(function(){
			    		  $(this).removeAttr("onclick");
			    		  $(this).html("... 时间分割线 ...")
			    	  })
		    		 $html=$(html);
		    		 $("#main_body").append($html);
		    		 $html.fadeIn(1500);
		    		 $("#msg").scrollTop($("#main_body").height());
		    	 }
		     },error:function(XMLHttpRequest, textStatus, errorThrown){
	 	    	 if(XMLHttpRequest.status==500){
	 	    		 layer.msg(XMLHttpRequest.responseText);
	 	    	 }
	 	     }
	  });
	  return false;
  }
  var moreHistoyEmail=function(){
	  if($(fanUser).val().length==0){
		  layer.msg("要选择个粉哦");
		  return;
	  }
	  $.ajax({
		     url : localhostPath+"email/hisemail/"+$("#fanUser").val(),
		     dataType :"html",
		     async:true,
		     data:{page:pageIndex},
		     method : "post",
		     beforeSend:function(XMLHttpRequest){
	        },
		     success : function(html) {
			    	  $(".nextpage").each(function(){
			    		  $(this).removeAttr("onclick");
			    		  $(this).html("... 时间分割线 ...")
			    	  })
		    		 $html=$(html);
		    		 $("#main_body").append($html);
		    		 $html.fadeIn(1500);
		    		 $("#msg").scrollTop($("#main_body").height());
		    		 pageIndex++;
		     },error:function(XMLHttpRequest, textStatus, errorThrown){
	 	    	 if(XMLHttpRequest.status==500){
	 	    		 layer.msg(XMLHttpRequest.responseText);
	 	    	 }
	 	     }
	  });
	  return false;
  }
  //历史信息翻页
  var pageTitleIndex=1;
  var moreEmail=function(){
	  $.ajax({
		     url : localhostPath+"email/hisemailtitle/"+pageTitleIndex,
		     dataType :"html",
		     async:true,
		     data:{page:pageIndex},
		     method : "post",
		     beforeSend:function(XMLHttpRequest){
	        },
		     success : function(html) {
			    	  $(".nextpage").each(function(){
			    		  $(this).removeAttr("onclick");
			    		  $(this).html("... 时间分割线 ...")
			    	  })
		    		 $html=$(html);
		    		 $("#week_before").append($html);
		    		 $html.fadeIn(1500);
		    		 $("#layui_tab").scrollTop($("#week_before").height());
		    		 pageTitleIndex++;
		    		 createHistoryEmailEvent();
		     },error:function(XMLHttpRequest, textStatus, errorThrown){
	 	    	 if(XMLHttpRequest.status==500){
	 	    		 layer.msg(XMLHttpRequest.responseText);
	 	    	 }
	 	     }
	  });
	  return false;
  }
