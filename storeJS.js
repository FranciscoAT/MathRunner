var runner = new Image();
runner.src= localStorage.avatar;

var myRunner = {
x: 0,
y: 0,
width: 80,
height: 140,
};

var canvas = document.getElementById('temp');
canvas.height=140;
canvas.width=80;
var ctx = canvas.getContext('2d');

var money = 1;

function drawRunner() {
	ctx.drawImage(runner, myRunner.x, myRunner.y, myRunner.width, myRunner.height);
}

function clearRunner(){
	ctx.clearRect(myRunner.x,myRunner.y,myRunner.width,myRunner.height);
}

function checkFunds(f){
	if(money > 0)
		changeChar(f);
}

function changeChar(c){
	switch (c) {
		case "m1": 
			localStorage.avatar = "images/male1.png";
			runner.src= localStorage.avatar;
			break;
		case "m2": 
			localStorage.avatar = "images/blue.png";
			runner.src= localStorage.avatar;
			break;
		case "m3": 
			localStorage.avatar = "images/red.png";
			runner.src= localStorage.avatar;
			break;
		case "f1": 
			localStorage.avatar = "images/female1.png";
			runner.src= localStorage.avatar;
			break;
		case "f2": 
			localStorage.avatar = "images/green.png";
			runner.src= localStorage.avatar;
			break;
		case "f3": 
			localStorage.avatar = "images/yellow.png";
			runner.src= localStorage.avatar;
			break;
	}
	runner.onload = function(){
		clearRunner();
		drawRunner();
	}
}

window.onload = function(){
	drawRunner();
}