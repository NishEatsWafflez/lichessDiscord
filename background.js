const DISCORDURL = 'https://discord.com/api/oauth2/authorize';
const CLIENTID = encodeURIComponent('1089259043786326067');
const RESPONSETYPE = encodeURIComponent('token');
const REDIRECTURI = browser.identity.getRedirectURL();
//const REDIRECTURI = encodeURIComponent('https://knnnlogbccldjjlgjfhehgofmglfogho.chromiumapp.org/');
const STATE = encodeURIComponent('waterff99');
const SCOPE = encodeURIComponent('identify email guilds');

let userSignedIn = false;

function getDiscordUri(){
	const nonce = encodeURIComponent(Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15))
	const url = 
	`${DISCORDURL}?client_id=${CLIENTID}&response_type=${RESPONSETYPE}&redirect_uri=${REDIRECTURI}&state=${STATE}&scope=${SCOPE}&nonce=${nonce}`;
	console.log(url);
	return url;
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
	console.log("hello");
	const key = 'logIn';
	console.log(browser.identity.getRedirectURL());
	if (request.message === "login"){
		console.log(localStorage);
		localStorage.setItem("hi", "there");
		console.log(localStorage.getItem("hi"));
		console.log(localStorage);
		console.log(localStorage.getItem('logIn'));
		if (localStorage.getItem('logIn')=== 'trued'){
			console.log("hi");
			sendResponse("success");
			return true;
		}
		console.log("false");
		browser.identity.launchWebAuthFlow({
			url: getDiscordUri(),
			interactive: true,
		}, function(redirect_uri){
			if (browser.runtime.lastError){
				sendResponse('fail');
				console.log(browser.runtime.lastError);
			}
			sendResponse('success');
			localStorage.setItem('logIn', 'trued');
			console.log(redirect_uri);
			const halves = redirect_uri.split("token=");
			const temp = halves[1];
			const token = temp.split("&expires");
			localStorage.setItem("token", token[0]);
		});

		
		return true;
	} else if (request.message === "logout"){
		localStorage.setItem('logIn', 'false');
		sendResponse("success");
		return false;
	}

});
