const DISCORDURL = 'https://discord.com/api/oauth2/authorize';
const CLIENTID = encodeURIComponent('1089259043786326067');
const RESPONSETYPE = encodeURIComponent('token');
const REDIRECTURI = encodeURIComponent('https://knnnlogbccldjjlgjfhehgofmglfogho.chromiumapp.org/');
const STATE = encodeURIComponent('waterff99');
const SCOPE = encodeURIComponent('identify email');

let userSignedIn = false;

function getDiscordUri(){
	const nonce = encodeURIComponent(Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15))
	const url = 
	`${DISCORDURL}?client_id=${CLIENTID}&response_type=${RESPONSETYPE}&redirect_uri=${REDIRECTURI}&state=${STATE}&scope=${SCOPE}&nonce=${nonce}`;
	console.log(url);
	return url;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	const key = 'logIn';
	if (request.message === "login"){
		console.log(localStorage.getItem('logIn').value);
		if (localStorage.getItem('logIn')=== 'trued'){
			console.log("hi");
			sendResponse("success");
			return true;
		}
		localStorage.setItem('myInput', 'trued');
		chrome.identity.launchWebAuthFlow({
			url: getDiscordUri(),
			interactive: true,
		}, function(redirect_uri){
			if (chrome.runtime.lastError){
				sendResponse('fail');
				console.log(chrome.runtime.lastError);
			}
			sendResponse('success');
			localStorage.setItem('logIn', 'trued');
			console.log(redirect_uri);
		});

		
		return true;
	} else if (request.message === "logout"){
		localStorage.setItem('logIn', 'false');
		sendResponse("success");
		return false;
	}

});
