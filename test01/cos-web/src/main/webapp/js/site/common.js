var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos) + "/";

var attention = function(a) {
	if (checklogin() == false) {
		return false;
	}
	$.ajax({
		url : localhostPath + "attention/u/" + $(a).data("id"),
		dataType : "json",
		async : true,
		data : {},
		method : "post",
		beforeSend : function(XMLHttpRequest) {
		},
		success : function(data) {
			if (data.isPass == 'ok') {
				window.location.reload(); 
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
var cancelAttention = function(a) {
	$.ajax({
		url : localhostPath + "cancelattention/u/" + $(a).data("id"),
		dataType : "json",
		async : true,
		data : {},
		method : "post",
		beforeSend : function(XMLHttpRequest) {
		},
		success : function(data) {
			if (data.isPass == 'ok') {
				window.location.reload(); 
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
var collectTopic = function(a) {
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
				$(a).html("已收藏");
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
var cancelCollectTopic= function(a) {
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
		   $(a).parent().parent().remove();
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

//右侧分类导航
var showTopicTags = function(a) {
	var top = $(a).offset().top;
	var height= $(a).height();
	$("#tag_type").css("top", top+height+5);
	$("#tag_type").css("right", 300);
	$("#tag_type").fadeIn(100);
	$("#tag_type").animate({
		right : 0
	}, 500);
}
var hiddenTopicTags = function() {
	$("#tag_type").fadeOut(500);
}
var login = function() {
	layer.open({
		id : "zuimei",
		type : 2,
		title : " ",
		closeBtn : 1, //不显示关闭按钮
		shade : [ 0 ],
		area : [ '560px', '500px' ],
		resize : false,
		content : [ localhostPath + "login", 'no' ], 
		end : function() { 
		}
	})
};
var checklogin = function() {
	if (getCookie("tocken_")==null) {
		login();
		return false;
	}
	return true;
}

var checkfans=function(uid){
	var result=false;
	$.ajax({
		url : localhostPath + "email/checkfans/" + uid,
		dataType : "json",
		async : false,
		data : {},
		method : "post",
		beforeSend : function(XMLHttpRequest) {
		},
		success : function(data) {
			if(data.isPass=="ok"){
			 result=true;
			}else{
			result=false;
			layer.msg(data.warn);
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
	return result;
}

var showEmail = function(uid) {
	if (checklogin() == false){
		return false;
	}
	if (checkfans(uid) == false) {
		return false;
	}
	layer.open({
		id : "email",
		type : 2,
		title : false,
		closeBtn : 0, //不显示关闭按钮
		shadeClose : true,
		shade : [ 0.1 ],
		fixed : true,
		offset : 'lb', //左下角弹出
		area : [ '320px', '580px' ],
		anim : 1,
		content : [ localhostPath + "email/" + uid, 'no' ], //iframe的url，no代表不显示滚动条
		end : function() { //此处用于演示 
		}
	})
};
var showUserSet = function(id) {
	if (checklogin() == false) {
		return false;
	}
	layer.open({
		id : "userbox",
		type : 2,
		title : "会员信息",
		closeBtn : 1, //不显示关闭按钮
		shadeClose : true,
		shade : false,
		fixed : true,
		maxmin: false,
		resize : false,
		area : [ '960px', '600px' ],
		anim : 1,
		content : [ localhostPath + "user/set", 'yes' ], //iframe的url，no代表不显示滚动条
		end : function() { //此处用于演示 
		},
		success : function(layero, index) {
		}
	})
};

var showEmailBox = function(id) {
	if (checklogin() == false) {
		return false;
	}
	layer.open({
		id : "emailbox",
		type : 2,
		title : false,
		closeBtn : 0, //不显示关闭按钮
		shadeClose : true,
		shade : [ 0.1 ],
		fixed : true,
		resize : false,
		area : [ '960px', '600px' ],
		anim : 1,
		content : [ localhostPath + "email/emailbox", 'no' ], //iframe的url，no代表不显示滚动条
		end : function() { //此处用于演示 
		},
		success : function(layero, index) {
		}
	})
};
var showFullImgBox = function(id) {	
	var index=layer.open({
		id : "imgbox",
		type : 2,
		title : false,
		closeBtn : 0, //不显示关闭按钮
		shadeClose : true,
		shade: [0.6, '#222'],
		fixed : true,
		resize : false,
		area : [ '1280px', '90%' ],
		anim : 1,
		content : [ localhostPath + "entry/fullimg?id="+id, 'no' ], //iframe的url，no代表不显示滚动条
		end : function() { //此处用于演示 
		},
		success : function(layero, index) {
			
		}
	});
	return false;
	//layer.full(index);
};
var closewin = function() {
	var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.layer.close(index); //再执行关闭   
}
var maxwin = function() {
	var index = parent.layer.getFrameIndex(window.name);
	parent.layer.full(index);
	if ($("#maxwin")) {
		$("#maxwin").remove();
	}
	$("#btn_win")
			.prepend(
					"<a id=\"restorewin\" href=\"javascript:;\"  class=\"restorewin\" onclick=\"restorewin()\"></a>");
}
var restorewin = function() {
	var index = parent.layer.getFrameIndex(window.name);
	parent.layer.restore(index);
	if ($("#restorewin")) {
		$("#restorewin").remove();
	}
	var a = $("<a id=\"maxwin\" href=\"javascript:;\"  class=\"maxwin\" onclick=\"maxwin()\"></a>");
	$("#btn_win").prepend(a);
}
function getCookie(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=")
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1)
				c_end = document.cookie.length;
			return document.cookie.substring(c_start, c_end);
		}
	}
	return null;
}

function getTimeStamp() { 
		var timestamp = Date.parse(new Date());
		timestamp = timestamp / 1000;
		return timestamp;
	}
var initScreenWidth=function(div,callback){
	 if(window.screen.width>1500){
		 $("#"+div).css("width","1500px"); 
	 } 
	 if(window.screen.width<1500){
		 $("#"+div).css("width","1260px");
	 } 
	 if (typeof callback === "function"){
        callback(); 
    }
}
var resizeBodyHandler=function(){
	var p = window.parent.document;
	var iframe=$(p).find("iframe");
	var p = window.parent.document;
	var f=$(p).find(".layui-layer-iframe");
	var div=$(p).find("#emailbox");
	$(iframe).height(f.height());
	$(div).height(f.height());
	$(document.body).height(f.height());
 }
 var getPreventReplyTocken=function(){
	return $.md5(new Date().getTime().toString());
 }
 
$(function() {
	if(getCookie("uid_")!=null){
         var nname=decodeURI(getCookie("nname_"));
         var u="\/"+decodeURI(getCookie("u_"));
         var vlevel=getCookie("vlevel_");
         var html;
         if(null==vlevel || 0==vlevel){
        	 html ="<li><a onclick=\"showUserSet()\"  class=\"set\">会员设置</a></li>" +
		 		"<li class=\"spacer\"><a></a></li>" +
		 		"<li><a onclick=\"showEmailBox()\" class=\"email_p\">私信</a></li>" +
		 		"<li><a href=\""+localhostPath+"loginout\">退出</a></li>"+
		 		"<li><a  style=\"padding:5px 2px\" target=\"_blank\" href=\""+localhostPath+"u"+u+"\">"+nname+"</a></li>";
         }else{
		     html="<li><a onclick=\"showUserSet()\"  class=\"set\">会员设置</a></li>" +
		 		"<li class=\"spacer\"><a></a></li>" +
		 		"<li><a onclick=\"showEmailBox()\" class=\"email_p\">私信</a></li>" +
		 		"<li><a href=\""+localhostPath+"loginout\">退出</a></li>"+
		 		"<li><span class=\"vip_level\">"+(null==vlevel?1:vlevel)+"</span>" +
		 		"<a  style=\"padding:5px 2px\" target=\"_blank\" href=\""+localhostPath+"u"+u+"\">"+nname+"</a></li>";
             }
		 $("#llogin").html(html);
     }else{
    	 var html="<li> <a onclick=\"login()\" class=\"login_u\">登录</a></li>";
		 $("#llogin").html(html);
     };
	
	$("#tag_type").hover(function() {
	}, function() {
		hiddenTopicTags();
	});
 
})