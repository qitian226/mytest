/**
 * 校验密码：只能输入8-16个字母、数字、下划线;密码格式为头尾字母或数字,中间可包含特殊字符!  
 *
 */
function isPasswd(str)  
{
	var patrn=/^[a-zA-Z]{1}([a-zA-Z0-9]|[*_ # @ % $ &  = +]){7,14}[a-zA-Z0-9]{1}$/;
	if (!patrn.exec(str)){
	return false;
	}
	return true;
}
function isSpace(str)  
{  
	 if(str.indexOf(" ")!=-1){
		 return true;
	 }
	 return false;
}
/**
 * 替换空格
 * @paramrns
 */
function replaceSpacing(str){
	str = str.replace(/\ +/g,"");
	return str;
}

/**
 * 替换回车换行
 * @paramrns
 */
function replaceRandN(str){
	str = str.replace(/[\r\n]/g,"");   
	return str;
}

/**
 * 检查输入的一串字符是否包含汉字
 * 输入:str  字符串
 * 返回:true 或 flase; true表示包含汉字
 */
function isChinese(str)
{
 var reg=/^[\\u0391-\\uFFE5]+$/;
 return reg.test(str);
} 
/**
 * 以字母开头可以包含数字
 * @param str
 * @returns
 */
function isStartLetterAndContainNumber(str){
	return 	/^[a-zA-Z][a-zA-Z0-9]*$/.test(str);
}

/**
 * 是否包含字符和数字
 * @param str
 * @returns
 */
function isLetterAndNumber(str)
{
var reg=/^[A-Za-z0-9]*$/;
return reg.test(str);
}
/**
 * 是否全部是汉字
 * @param str
 * @returns
 */
function allIsChinese(str){
	 reg = /^[\u4e00-\u9fa5]+$/;
	 return reg.test(str);
}
/**
 * 是否全部是英文
 */
function isLetter(str)     
{       
  var  reg=/^[a-zA-Z]+$/;     
  return reg.test(str);
}

function isEmail(str){
  var reg=/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
   return reg.test(str);
}
/**
 * 是否包含特殊字符
 * @returns
 */
function isContainSpecial(str){
	 var reg = RegExp(/[(\~)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\-)(\+)(\=)(\<)(\>)(\?)(\)]+/);  
	return reg.test(str);
}
/**
 * 是否全部是数字
 * @param str
 * @returns {Boolean}
 */
function isNumber(str){
	if(/^\d+$/.test(str)){
		return true;
	}
	return false;
}
/**
 * 只包含中英文
 * @param str
 * @returns {Boolean}
 */
function checkChineseAndEnglish(str){
	 var regex = new RegExp("^([\u4e00-\u9fa5]|[a-zA-Z]){1,20}$");
	 return regex.test(str);
	 
}
/**
 * 检验手机号码
 * @param str
 * @returns
 */
function checkPhone(str){ 
    if(!(/^1(3|4|5|7|8)\d{9}$/.test(str))){ 
        return false; 
    } 
    return true;
}
/**
 * 检查字符串是否为合法QQ号码
 * @param {String} 字符串
 * @return {bool} 是否为合法QQ号码
 */
 function isQQ(str) {
     var bValidate = RegExp(/^[1-9][0-9]{4,9}$/).test(str);
     if (bValidate) {
         return true;
     }
     else
         return false;
 }
 /**
  * 检查字符串是否为合法微信号码
  * @param {String} 字符串
  * @return {bool} 是否为合法微信号码
  */
  function isWeChat(str) {
      var bValidate = RegExp(/^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/).test(str);
      if (bValidate) {
          return true;
      }
      else
          return false;
  }
  /**
   * 检查字符串是否为合法陌陌号码
   * @param {String} 字符串
   * @return {bool} 是否为合法微信号码
   */
   function isMomo(str) {
       var bValidate = RegExp(/^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/).test(str);
       if (bValidate) {
           return true;
       }
       else
           return false;
   }
   /**
    * 编码
    * @param str
    * @returns
    */
   function htmlEncode(str){
	    return $('<span/>').text(str).html();  
	}  
	/**
	 * 解码
	 * @param str
	 * @returns
	 */
  function htmlDecode(str){
	    return $('<span/>').html(str).text();  
	}  
  /**
   * 替换特殊字符
   * @param s
   * @returns
   */
  function stripScript(s) {
	  var pattern = new RegExp("[`~#$^&*()+-=|{}\\[\\]<>/?~#￥……&*（）&mdash;—|{}]");        
	  var rs = "";
	  for (var i = 0; i < s.length; i++) {   
	       rs = rs + s.substr(i, 1).replace(pattern, '');  
	    }  
	  return rs;
	}