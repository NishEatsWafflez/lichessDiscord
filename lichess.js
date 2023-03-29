function getLink(){
}

const discordSend = document.getElementById('discordBtn');
function sendLink(){
	var details = {
    'variant': 'standard',
    'days': '1',
    'rated': 'false'
	};
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
		fetch(localStorage.getItem(localStorage.getItem('serverID')), {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ content: data.challenge.url, })
		})
		.catch(error =>{
			alert(error);
			localStorage.removeItem(localStorage.getItem('serverID'));
		});
		let creating = browser.tabs.create({
			url:data.challenge.url
		});

		creating.then(onCreated, onError);
		close();
		//alert(data.challenge.url);
		//window.location.replace('./popup-sign-out.html');
        // check the response object for result
        // ...
		//window.location.replace('./popup-sign-out.html');
    });
}
