 function destroy(){
	    $("#image").cropper("destroy");
		$("#image").attr("src","");
		$("#imgurl").val("");
  }
  function publishEntry(){
	  var title=$("#title").val();
	  var imgurl=$("#imgurl").val();
	  var desc=editor.getData();
	  var topic=$("#topicId").val();
	  var entryId=$("#entry").val();
	  var url_=localhostPath+"edit/entry/publish";
	  if(entryId.length>0 && isUpdate=='is'){
		  url_=localhostPath+"edit/entry/update/"+entryId;
	  }
	  $.ajax({
			url : url_,
			dataType:"json",
			data :{"id":$("#entry").val(),"title":title,
				"imgurl":imgurl+";"+$("#dataWidth").val()+";"+$("#dataHeight").val(),
				"desc":desc,"topic":topic},
			async:false,
			method : "post",
			success : function(json) {
				if(json.isPass=="ok"){
					if(json.update=="is"){
						parent.setUpdateEntryCover(json.entry);
					}else{
					  parent.setEntryCover(json.entry);
					}
					var index = parent.layer.getFrameIndex(window.name); 
					parent.layer.close(index); 
				}else{
					layer.msg(json.warn);
				 }
				}
				,error:function(XMLHttpRequest, textStatus, errorThrown){
		 	    	 if(XMLHttpRequest.status==500){
		 	    		 layer.msg(XMLHttpRequest.responseText);
		 	    	 }
		 	     }
		});
	  return false;
  }
  function closeOpenIframe() {
	    var index = parent.layer.getFrameIndex(window.name);
	    parent.layer.close(index);
	}
  function removeEntry(){
	  var entryId=$("#entry").val();
	    $.ajax({
	 	     url : localhostPath+"edit/entry/remove/"+entryId,
	 	     dataType :"json",
	 	     async:false,
	 	     method : "post",
	 	     beforeSend:function(XMLHttpRequest){
	         },
	 	     success : function(json){
	 	    	if(json.isPass=="ok"){
	 	    		 {
	 	            	closeOpenIframe();
	 	            	parent.removeEntry(entryId);
	 	    		 }
	 	    	}else{
					layer.msg(json.warn);
				}
	 	     },error:function(XMLHttpRequest, textStatus, errorThrown){
	 	    	 if(XMLHttpRequest.status==500){
	 	    		 layer.msg(XMLHttpRequest.responseText);
	 	    	 }
	 	     }
	 	 }); 
	  return true;
}
  function delEntry(){
	  layer.confirm('确认删除这个图片？', {
		  btn: ['确定','取消'] //按钮
		}, function(index){
			removeEntry();
			layer.close(index);
		}, function(){
		   
		});
  }