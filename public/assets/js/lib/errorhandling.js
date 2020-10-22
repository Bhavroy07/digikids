var arr = new Array();
arr=["Invalid credentials! Please try again.","Invalid OTP","OTP expired","Passwords do not match! Try again"];
var ids=["msg-auth","msg-otp","msg-otp","msg-pass"];
function errorhandle(x){
	//console.log(x);
	var msg="<strong>"+arr[x]+"</strong>";
	document.getElementById(ids[x]).innerHTML=msg;
}

module.exports=errorhandle;