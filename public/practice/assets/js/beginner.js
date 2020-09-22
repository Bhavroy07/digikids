<<<<<<< HEAD
/*function myFunc(img)
=======
<<<<<<< HEAD
var start=document.querySelector('.btn-start');
console.log(start)
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
recognition.interimResults = false;
const words = document.querySelector(".words");
var record='';
recognition.onresult = function(event)
{
	var last = event.results.length-1;
	var command =  event.results[last][0].transcript;

	console.log(command);
	record=command;
	words.textContent='Voice Input: '+record;
}

start.addEventListener("click", function(){
	recognition.start();
});
=======
module.exports=function myFunc(img)
>>>>>>> bbab8bcf392d5adf56201f5127791d58e0d5aac8
{
    //document.getElementById("myImg").src=img.question
    return img.question
    
}*/

function atbi()
{
    alert("hii")
}
>>>>>>> 5fc3e7781550507836581c124749ed926bf7be6a
