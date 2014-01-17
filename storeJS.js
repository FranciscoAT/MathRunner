var runner = new Image();
runner.src= localStorage.avatar;

var myRunner = {
x: 0,
y: 0,
width: 80,
height: 140,
};

var canvas = document.getElementById('currentRunner');
canvas.height=140;
canvas.width=80;
var ctx = canvas.getContext('2d');


if(localStorage.getItem("m2") == null){
	localStorage.setItem("m1",1);
	localStorage.setItem("m2",0);
	localStorage.setItem("m3",0);
	localStorage.setItem("f1",1);
	localStorage.setItem("f2",0);
	localStorage.setItem("f3",0);
}

function drawRunner() {
	ctx.drawImage(runner, myRunner.x, myRunner.y, myRunner.width, myRunner.height);
}

function clearRunner(){
	ctx.clearRect(myRunner.x,myRunner.y,myRunner.width,myRunner.height);
}

function checkFunds(f,c){
	if(localStorage.getItem(f) == 0){
		if(localStorage.getItem("coins") >= c){
			localStorage.setItem(f, 1);
			changeChar(f);
			var money = localStorage.getItem("coins");
			money -= c;
			localStorage.setItem("coins", money);
			currentMoney();
		}
		else
			alert("Vous besoin avoir un autre "+(c-(localStorage.getItem("coins")))+" pièces");
	}
	else
		changeChar(f);
}

function changeChar(c){
	switch (c) {
		case "m1": 
			localStorage.avatar = "images/male1.png";
			runner.src= localStorage.avatar;
			break;
		case "m2": 
			localStorage.avatar = "images/male3.png";
			runner.src= localStorage.avatar;
			$("#m2p").text("Posséder")
			break;
		case "m3": 
			localStorage.avatar = "images/male2.png";
			runner.src= localStorage.avatar;
			$("#m3p").text("Posséder")
			break;
		case "f1": 
			localStorage.avatar = "images/female1.png";
			runner.src= localStorage.avatar;
			break;
		case "f2": 
			localStorage.avatar = "images/female3.png";
			runner.src= localStorage.avatar;
			$("#f2p").text("Posséder")
			break;
		case "f3": 
			localStorage.avatar = "images/female2.png";
			runner.src= localStorage.avatar;
			$("#f3p").text("Posséder")
			break;
	}
	runner.onload = function(){
		clearRunner();
		drawRunner();
	}
}

function currentMoney(){
	$('#moneyP').text(localStorage.getItem("coins"))
}

function resetStore(){
	localStorage.setItem("m1",1);
	localStorage.setItem("m2",0);
	localStorage.setItem("m3",0);
	localStorage.setItem("f1",1);
	localStorage.setItem("f2",0);
	localStorage.setItem("f3",0);
	changeChar("m1");
	localStorage.setItem("coins",0);
	currentMoney();
	changeOwned();
}

function changeOwned(){
	if(localStorage.getItem("m2") == 1)
		$("#m2p").text("Posséder")
	else
		$("#m2p").text("$120")
		
	if(localStorage.getItem("m3") == 1)
		$("#m3p").text("Posséder")
	else
		$("#m3p").text("$50")
		
	if(localStorage.getItem("f2") == 1)
		$("#f2p").text("Posséder")
	else
		$("#f2p").text("$80")
		
	if(localStorage.getItem("f3") == 1)
		$("#f3p").text("Posséder")
	else
		$("#f3p").text("$100")
}

window.onload = function(){
	drawRunner();
	changeOwned();
}