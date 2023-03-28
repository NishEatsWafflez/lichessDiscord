const options = document.querySelector('button');
const discord = document.getElementById('discord');
function getLink(){
}

let copyLink = document.getElementById('copyBtn');

options.addEventListener('mouseover', ()=>{
	options.style.backgroundColor = 'grey';
});

options.addEventListener('mouseleave', ()=>{
	options.style.backgroundColor = 'white';
});

discord.addEventListener('click', ()=>{
	//alert("HI");
	browser.runtime.sendMessage({message: 'login'}, function(response){
		if(response=== 'success'){
			window.location.replace('./guilds.html');
			//window.location.replace('./popup-sign-out.html');
		}
	});
	
});
copyLink.addEventListener('click', ()=>{
	var details = {
    'variant': 'standard',
    'days': '1',
    'rated': 'false'
	};
	let url = "";
	//alert(localStorage.getItem(localStorage.getItem('serverID')));
	var formBody = [];
	for (var property in details) {
		var encodedKey = encodeURIComponent(property);
		var encodedValue = encodeURIComponent(details[property]);
		formBody.push(encodedKey + "=" + encodedValue);
	}
	formBody = formBody.join("&");
	fetch("https://lichess.org/api/challenge/open",{
		method: "POST"
	}
	)
		.then(response => {
			if (!response.ok){
				alert(response.blob());
			} else{
				return response.json()
			}
		})
	.then(data => {
		body = data.challenge.url;
		navigator.clipboard.writeText(data.challenge.url);
		//alert(data.challenge.url);
		//window.location.replace('./popup-sign-out.html');
        // check the response object for result
        // ...
		//window.location.replace('./popup-sign-out.html');
    });
});
