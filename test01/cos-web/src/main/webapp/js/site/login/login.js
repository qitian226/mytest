function toimg(){
	 $("#regimg").attr("src",localhostPath+"securitycode?temp="+ (new Date().getTime().toString(36)));
	 $("#rc").val("");
	 return false;
}
function warn(msg){
	layer.msg(msg);
}
function checkSubmit(){
	if($("#mobile").val().length==0){
		warn("请输入手机号!");
		return false;
	}else
        {
		if(checkPhone($("#mobile").val())==false){
			warn("手机号码格式不对!");
			return false;
		}
	}
	if($("#ms").val().length==0){
		warn("请输入密码!");
		return false;
	}else{
		if(isSpace($("#ms").val())==true){
			warn("密码不能包含空格!");
			return false;
		}
	}
	if($("#rc").val()==""){
		warn("请输入验证码!");
		return false;
	}else{
		var l=$("#rc").val().length;
		if(l!=4){
			warn("验证码是4位哦!");
			return false;
		}
	}
}

function ulogin(){
	if(checkSubmit()==false){
		return false;
	}
	var s_=encrypt($("#mobile").val()+";"+$("#ms").val(),repairKey($("#rc").val().toLowerCase(),"q"));
	 $.ajax({
	     url : localhostPath+"loginmem",
	     dataType : "json",
			data :{rc:$("#rc").val(),s:s_},
			method : "post",
			success : function(json) {
				if (json.isPass == "ok") {
					parent.location.reload();
					closewin();
				} else {
					var info = json.warn;
					warn(info);
					toimg();
				}
			},error:function(XMLHttpRequest, textStatus, errorThrown){
	 	    	 if(XMLHttpRequest.status==500){
	 	    		 layer.msg(XMLHttpRequest.responseText);
	 	    	 }
	 	     }
			
	 });
}