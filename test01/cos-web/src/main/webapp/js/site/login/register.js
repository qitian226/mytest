var layer,agreement_=false;

$().ready(
 function(){
	 layui.use(['form','layer'],function(){ 
		  var $ = layui.jquery, layer = layui.layer,form = layui.form;
			 form.on('checkbox(agreement)', function(data){
				 agreement_=data.elem.checked;
			}); 
	  });
   }
);

function loadimg(){
 $("#regimg").attr("src",localhostPath+"securitycode?temp="+ (new Date().getTime().toString(36)));
 $("#regcode").val("");
 return false;
}
function warn(msg){
	layer.msg(msg);
}
function checkSubmit(){
	var reguser_=$("#reguser").val();
	if(reguser_==""){
		warn("请输入用户名!");
		return false;
	}else{
		var l=reguser_.length;
		if(l<4||l>12){
			warn("用户名在4至12位之间!");
			return false;
		}
		if(isSpace(reguser_)==true){
			warn("用户名不能包含空格!");
			return false;
		}
		if(isStartLetterAndContainNumber(reguser_)==false){
			warn("用户名只能为字母和数字!");
			return false;
		}
	}
	var nickname_=$("#nick_name").val();
	 l=nickname_.length;
	if(l==0){
		warn("昵称不能为空哦!");
		return false;
	}
	if(l>10 || l<2){
		warn("昵称在2到10之间哦!");
		return false;
	}
	 if(!checkChineseAndEnglish(nickname_))
	{
		warn("昵称只能为中英文!");
		return false;
	} 
 var mobile_=$("#mobile").val();
	if(mobile_.length==0){
		warn("请输入手机号!");
		return false;
	}
	if(checkPhone(mobile_)==false){
		warn("手机号码格式错误!");
		return false;
	}
	var regpass_=$("#regpass").val();
	if(regpass_.length==0){
		warn("请输入密码!");
		return false;
	}else{
		var l=regpass_.length;
		if(l<8||l>16){
			warn("密码在8至16位之间!");
			return false;
		}
		if(isSpace(regpass_)==true){
			warn("密码不能包含空格!");
			return false;
		}
		if(isPasswd(regpass_)==false){
			warn("密码格式为头尾字母或数字,中间可包含特殊字符!");
			return false;
		}
	}
	var regcode_=$("#regcode").val().toLowerCase();
	if(regcode_==""){
		warn("请输入验证码!");
		return false;
	}else{
		var l=regcode_.length;
		if(l!=4){
			warn("验证码是4位哦!");
			return false;
		}
	}
/*	if(agreement_==false){
		warn("请阅读并同意协议哦!");
		return false;
	}*/
}
 
function regUser(){
	if(checkSubmit()==false){
		return false;
	}
	var s=encrypt($("#reguser").val()+";"+$("#regpass").val()+";"+$("#mobile").val(),repairKey($("#regcode").val().toLowerCase(),"q"));
	$.ajax({
		url : localhostPath+"reguser",
		dataType : "json",
		data :{regcode:$("#regcode").val(),s_:s,nickname:$("#nick_name").val(),agreement:agreement_},
		method : "post",
		success : function(json) {
			if (json.isPass == "pass") {
				warn("注册成功!");
				window.location.href=localhostPath+"reginfo?uid="+json.uid;
			} else {
				var info = json.warn;
				warn(info);
			}
		},error:function(XMLHttpRequest, textStatus, errorThrown){
	    	 if(XMLHttpRequest.status==500){
 	    		 layer.msg(XMLHttpRequest.responseText);
 	    	 }
 	     }
	});
}