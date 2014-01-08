var runner = new Image();
runner.src= localStorage.avatar;

var myRunner = {
x: 0,
y: 0,
width: 80,
height: 140,
};

var canvas = document.getElementById('selectedChar');
canvas.height=140;
canvas.width=80;
var ctx = canvas.getContext('2d');

function drawRunner() {
	ctx.drawImage(runner, myRunner.x, myRunner.y, myRunner.width, myRunner.height);
}

function clearRunner(){
	ctx.clearRect(myRunner.x,myRunner.y,myRunner.width,myRunner.height);
}

window.onload = function(){
	drawRunner();
}