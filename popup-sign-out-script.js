const button = document.getElementById('logout');

button.addEventListener('click', ()=>{
	chrome.runtime.sendMessage({message: 'logout'}, function(response){
		if(response=== 'success'){
			localStorage.removeItem("token");
			window.location.replace('./popup-sign-in.html');
		}
	});
	
});
