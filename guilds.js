const select = document.getElementById('selectServer');
let accessToken = localStorage.getItem("token");
window.onload = guildify;
function guildify(){

	fetch("https://discord.com/api/v9/users/@me/guilds", {
		method: 'GET',
		headers: {'Authorization': `Bearer ${accessToken}`}
	}).then(response=>response.json())
	.then(data=> {
		let names = [];
		let ids = [];
		for (let i = 0; i < data.length; i++){
			var ele = document.createElement("option");
			ele.textContent = data[i].name;
			ele.value = data[i].id;
			select.appendChild(ele);
			if(localStorage.getItem(data[i].id)){
				var btn = document.createElement("button");
				btn.className = "serverBtn";
				btn.textContent = data[i].name;
				btn.value = data[i].id;
				btn.onclick = function(){
					localStorage.setItem('serverName', this.textContent);
					localStorage.setItem('serverID', this.value);
					window.location.replace('./sendLink.html');
				}
				document.getElementById("buttons").appendChild(btn);
			}
		}
	});
}
