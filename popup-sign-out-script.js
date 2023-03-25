const button = document.querySelector('button');

button.addEventListener('mouseover', ()=>{
	button.style.backgroundColor = 'black';
});

button.addEventListener('mouseleave', ()=>{
	button.style.backgroundColor = 'white';
});

button.addEventListener('click', ()=>{
	chrome.runtime.sendMessage({message: 'logout'}, function(response){
		if(response=== 'success'){
			window.location.replace('./popup-sign-in.html');
		}
	});
	
});
