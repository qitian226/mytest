//aes加密
function encrypt(word,pkey) {
    var key = CryptoJS.enc.Utf8.parse(pkey);
    var iv = CryptoJS.enc.Utf8.parse("1234567890000000");
    var encrypted = '';
    if (typeof(word) == 'string') {
        var srcs = CryptoJS.enc.Utf8.parse(word);
        encrypted = CryptoJS.AES.encrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    } else if (typeof(word) == 'object') {//对象格式的转成json字符串
        data = JSON.stringify(word);
        var srcs = CryptoJS.enc.Utf8.parse(data);
        encrypted = CryptoJS.AES.encrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        })
    }
    return encrypted.ciphertext.toString();
}
function repairKey(str,code){
	var arr=str.match(/./g);
	var temp = new Array();  
	if(arr.length<16){
		for(var i=0;i<16;i++){
			if(i<arr.length){
				temp[i]=arr[i];
			}else{
				temp[i]=code;
			}
		}
	}
	return temp.join("");
}