const button = document.querySelector('button');

button.addEventListener('mouseover', ()=>{
	button.style.backgroundColor = 'grey';
});

button.addEventListener('mouseleave', ()=>{
	button.style.backgroundColor = 'white';
});

button.addEventListener('click', ()=>{
	chrome.runtime.sendMessage({message: 'login'}, function(response){
		if(response=== 'success'){
			window.location.replace('./guilds.html');
			//window.location.replace('./popup-sign-out.html');
		}
	});
	
});
