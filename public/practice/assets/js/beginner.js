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