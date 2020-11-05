function voicetotext(num)
{
	var start=document.querySelector(`#btn-start${num}`);
	console.log(start);
	// var reset=document.querySelector('#btn-reset');
	// console.log(reset);
	window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
	var recognition = new SpeechRecognition();
	recognition.interimResults = false;
	const ans = document.querySelector(`#ans${num}`);
	console.log(ans);
	var record='';
	recognition.onresult = function(event)
	{
		var last = event.results.length-1;
		var command =  event.results[last][0].transcript;

		console.log(command);
		record=command;
		ans.textContent= record;
	}
	recognition.start();
}

/*start.addEventListener("click", function(){
		recognition.start();
	});*/
	
