const submitBtn = document.getElementById('button');
submitBtn.addEventListener('click', function(){
	submit();
	window.location.replace('./sendLink.html');
});
function submit(){
	const query = document.querySelector("input").value;
	const serverID = document.getElementById("selectServer").value
	localStorage.setItem('serverID', serverID);
	localStorage.setItem(serverID, query);
}
