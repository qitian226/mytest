$().ready(function() {
		$("#b_top").click(function() {
	        $("html, body").animate({
	            scrollTop: $("#topic").offset().top }, {duration: 500,easing: "swing"});
	        return false;
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
		 String.prototype.startWith = function(str) {
				var reg = new RegExp("^" + str);
				return reg.test(this);
			}
	});
	var closeComment = function() {
		$("#speak").animate({
			opacity : '0'
		}, '5000', function() {
			$("#speak").css("display", "none");
			$("#speak-content").html("");
		});
		$("#curent_entry_id").val(null);
	}
	var showSay = function(a) {
		$("#speak-content").html("");
		$("#curent_entry_id").val($(a).data("id"));
		if ($("#speak").css("display") == "none") {
			$("#speak").css("display", "block");
			$("#speak").animate({
				opacity : '1'
			}, '5000');
		}
	}
	var showComment = function(a) {
		closeComment();
		var entryId = $(a).data("id");
		var div = $(a).parent().parent();
		if ($(div).find(".comment_panel").length > 0) {
			$(div).find(".comment_panel").remove();
			$(a).removeClass("current_comment_logo");
			return false;
		}
		$(".comment_logo").removeClass("current_comment_logo");
		$(a).addClass("current_comment_logo");
		$("#curent_entry_id").val(entryId);
		refreshComment(entryId);
		$(".c_nav a").removeClass("focus");
		$("#focus_comment").val("");
		$("#focus_user").val("");
	}
	
	var refreshComment = function(entryId) {
		var div = $("#e_" + entryId);
		$(div).fadeIn(500, function() {
			$.ajax({
				url : localhostPath+"entry/" + entryId,
				dataType : "html",
				async : false,
				data : {},
				method : "post",
				beforeSend : function(XMLHttpRequest) {
				},
				success : function(html) {
					$(div).find(".comment_panel").remove();
					$(div).append(html);
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){
			    	 if(XMLHttpRequest.status==500){
		 	    		 layer.msg(XMLHttpRequest.responseText);
		 	    	 }
		 	     }
			});

		});
	}
	  function removeComment(a){
		  if (checklogin() == false) {
				return false;
			}
		  var id_ = $(a).data("id");
		  layer.confirm('确认删除这个评论？', {
			  btn: ['确定','取消'] //按钮
			}, function(index){
				$.ajax({
					url : localhostPath+"comment/remove/" + id_,
					dataType : "json",
					async : false,
					data : {},
					method : "post",
					beforeSend : function(XMLHttpRequest) {
					},
					success : function(json) {
						if(json.isPass=="ok"){
							refreshComment(json.entry);
							 $("#l_" + json.entry).html(json.cnum);
						}else{
							layer.msg(json.msg);
						}
					},
					error:function(XMLHttpRequest, textStatus, errorThrown){
				    	 if(XMLHttpRequest.status==500){
			 	    		 layer.msg(XMLHttpRequest.responseText);
			 	    	 }
			 	     }
				});
				layer.close(index);
			}, function(){
			   
			});
		  
	  }
 
var collect = function(a) {
	if (checklogin() == false) {
		return false;
	}
	$.ajax({
		url : localhostPath + "collect/u/" + $(a).data("id"),
		dataType : "json",
		async : true,
		data : {},
		method : "post",
		beforeSend : function(XMLHttpRequest) {
		},
		success : function(data) {
			if (data.isPass == 'ok') {
				var la=$("<a onclick=\"cancelCollectTopic(this)\" class=\"collect_btn\" data-id=\""+$(a).data("id")+"\">已收藏</a>");
				$(a).html(la);
				$("#c_num").html(data.num);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			if(XMLHttpRequest.status==500){
	    		 layer.msg(XMLHttpRequest.responseText);
	    	 }else{
	    		 layer.msg("歇工了,出了点故障...");
	    	 }
		}
	});
}
var cancelCollect= function(a) {
	if (checklogin() == false) {
		return false;
	}
	$.ajax({
		url : localhostPath + "cancelcollect/u/" + $(a).data("id"),
		dataType : "json",
		async : true,
		data : {},
		method : "post",
		beforeSend : function(XMLHttpRequest) {
		},
		success : function(data) {
			if (data.isPass == 'ok') {
				var la=$("<a onclick=\"collectTopic(this)\" class=\"collect_btn\" data-id=\""+$(a).data("id")+"\">收藏</a>");
				$(a).html(la);
				$("#c_num").html(data.num);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			if(XMLHttpRequest.status==500){
	    		 layer.msg(XMLHttpRequest.responseText);
	    	 }else{
	    		 layer.msg("歇工了,出了点故障...");
	    	 }
		}
	});
}
	var focusU = function(a) {
		$("#speak-content").attr("placeholder", "@" + $(a).data("author"));
		$("#speak-content").focus();
		$("#focus_comment").val($(a).data("id"));
		$("#focus_user").val($(a).data("user"));
		$(".c_nav a").removeClass("focus");
		$(a).addClass("focus");
	}
	var selectStar = function(a) {
		var n = $(a).data("id");
		$("#star a").each(
						function(index, element) {
							if (index < n) {
								$(element).html("<img src=\""+localhostPath+"images/ico/star.png\">");
								$(element).attr("class", 'active');
							} else {
								$(element).html("<img src=\""+localhostPath+"images/ico/star_empty.png\">");
								$(element).attr("class", '');
							}
						});
	}
 
	var commentPage = function(entry_id_, page) {
		$.ajax({
			url : localhostPath+"entry/clist/" + entry_id_ + "/" + page,
			dataType : "html",
			async : false,
			data : {},
			method : "post",
			beforeSend : function(XMLHttpRequest) {
			},
			success : function(data) {
					$("#more_page").remove();
					$("#c_list_" + entry_id_).append(data); 
				
			},error:function(XMLHttpRequest, textStatus, errorThrown){
		    	 if(XMLHttpRequest.status==500){
	 	    		 layer.msg(XMLHttpRequest.responseText);
	 	    	 }
	 	     }
		});
	}

	var submitComment = function() {
		var entry = $("#curent_entry_id").val();
		if (entry.length == 0) {
			layer.msg("选择你要评论的单片哦!");
			return false;
		}
		if (checklogin() == false) {
			return false;
		}
		var c_ = $("#speak-content").val();
		if (c_.length == 0) {
			layer.msg("总要说点什么哦!");
			$("#speak-content").focus();
			return false;
		}
		if (c_.length > 200) {
			layer.msg("desc", "发表字数只能在200字内哦!");
			return false;
		}
		c_ = stripScript(c_);
		c_ = replaceSpacing(c_);
		c_ = replaceRandN(c_);
		var focusId = $("#focus_comment").val();
		if (focusId.length > 0) { //回复
			var u_;
			u_ = $("#focus_user").val();
			$.ajax({
				url : localhostPath+"comment/submitreply?tocken="+ getPreventReplyTocken(),
				dataType : "html",
				async : true,
				data : {
					foucsuser : u_,
					c : c_,
					id : focusId
				},
				method : "post",
				beforeSend : function(XMLHttpRequest) {
				},
				success : function(data) {
					var lis=$("#c_list_"+entry).find("li[id='item_" + focusId+"']");
					$.each(lis,function(i,v){
						$(v).append(data);
					});
					$("#speak-content").val("");
				},error:function(XMLHttpRequest, textStatus, errorThrown){
			    	 if(XMLHttpRequest.status==500){
		 	    		 layer.msg(XMLHttpRequest.responseText);
		 	    	 }
		 	     }
			});
		} else {//评论
			var grade = 0;
			$("#star .active").each(function() {
				grade = grade + 20;
			});
			$.ajax({
				url : localhostPath+"entry/submitcomment?tocken="
						+ getPreventReplyTocken(),
				dataType : "json",
				async : true,
				data : {
					c : c_,
					id : entry,
					g : grade
				},
				method : "post",
				beforeSend : function(XMLHttpRequest) {
				},
				success : function(json) {
					if (json.isPass == "ok") {
						refreshComment(entry);
						$("#l_" + entry).html(json.cnum);
						if (grade > 0) {
							$("#star a").each(function(index, element) {
								$(element).removeAttr("onclick");
							});
						}
						refreshCommentNum(entry);
						$("#speak-content").val("");
					} else {
						refreshComment(entry);
					}
				},error:function(XMLHttpRequest, textStatus, errorThrown){
			    	 if(XMLHttpRequest.status==500){
		 	    		 layer.msg(XMLHttpRequest.responseText);
		 	    	 }
		 	     }
			});
		}
		return false;
	}
	var refreshCommentNum = function(entry_id_) {
		$.ajax({
			url : localhostPath+"entry/getnum",
			dataType : "json",
			async : true,
			data : {
				id : entry_id_
			},
			method : "post",
			beforeSend : function(XMLHttpRequest) {
			},
			success : function(data) {
				$("#l_" + entry_id_).html(data.cnum);
			},error:function(XMLHttpRequest, textStatus, errorThrown){
		    	 if(XMLHttpRequest.status==500){
	 	    		 layer.msg(XMLHttpRequest.responseText);
	 	    	 }
	 	     }
		});

	}
	var praiseComment = function(a) {
		if (checklogin() == false) {
			return false;
		}
		var id_ = $(a).data("id");
		$.ajax({
			url : localhostPath+"comment/praise",
			dataType : "json",
			async : true,
			data : {
				id : id_
			},
			method : "post",
			beforeSend : function(XMLHttpRequest) {
			},
			success : function(json) {
				$(a).prev().html(json.data);
			},error:function(XMLHttpRequest, textStatus, errorThrown){
		    	 if(XMLHttpRequest.status==500){
	 	    		 layer.msg(XMLHttpRequest.responseText);
	 	    	 }
	 	     }
		});
	}