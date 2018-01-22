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
			if (data.success == 'ok') {
				window.location.reload(); 
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
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
			if (data.success == 'ok') {
				window.location.reload(); 
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
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
			if (data.success == 'ok') {
				$(a).html("已收藏");
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		}
	});
}
 
var login = function() {
	layer.open({
		id : "zuimei",
		type : 2,
		title : " ",
		closeBtn : 1, //不显示关闭按钮
		shade : [ 0 ],
		area : [ '560px', '430px' ],
		resize : false,
		content : [ localhostPath + "login", 'no' ], //iframe的url，no代表不显示滚动条
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
var showEmail = function(id) {
	if (checklogin() == false) {
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
		content : [ localhostPath + "email/" + id, 'no' ], //iframe的url，no代表不显示滚动条
		end : function() { //此处用于演示 
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
		content : [ localhostPath + "emailbox", 'no' ], //iframe的url，no代表不显示滚动条
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
		 $("#"+div).css("width","1250px");
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
		 $("#llogin").html("<li><a href=\""+localhostPath+"loginout\">退出</a></li><li><a>"+nname+"</a></li>");
     }
	
	$("#tag_type").hover(function() {
	}, function() {
		hiddenTopicTags();
	});
 
})