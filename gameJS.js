var canvas = document.getElementById('background');
canvas.height=600;
canvas.width=1024;
var ctx = canvas.getContext('2d');

var runner = new Image();
runner.src= "male1.png";

var obstacle = new Array();
obstacle[0] = new Image();
obstacle[1] = new Image();
obstacle[2] = new Image();

obstacle[0].src = "red.png";
obstacle[1].src = "blue.png";
obstacle[2].src = "green.png";

var obstacleX = new Array();
obstacleX[0] = 0;
obstacleX[1] = 0;
obstacleX[2] = 0;


var myRunner = {
x: 0,
y: 400,
width: 80,
height: 140,
};

var obstacleD = {
y:470,
width:80,
height:70,
};

var obNum = 1;

function animate() {
	var running = true;
	drawRunner();
	drawObstacles();
	part1();
	function part1(){
		if(running){
			ctx.clearRect(myRunner.x,myRunner.y,myRunner.width,myRunner.height);
			myRunner.x++;
			drawRunner();
			var test = setTimeout(part1, 10);
		
			if(myRunner.x+myRunner.width == obstacleX[0] || myRunner.x+myRunner.width == obstacleX[1] || myRunner.x+myRunner.width == obstacleX[2]){
				running = false;
				clearTimeout(test);
				part2();
			}
		}
	}
	
	function part2(){
		var eng = localStorage.energy;
		getQuestion();
	}
}

function part3W(){
	var flash = true;
	var f = false;
	var t = 0;
	part3A();
	function part3A(){
		if(flash){
			if(f){
				drawRunner();
				f = false;
			}
			else{
				ctx.clearRect(myRunner.x,myRunner.y,myRunner.width,myRunner.height);
				f = true;
			}
			var flashTO = setTimeout(part3A, 375);
			t++;
			if(t == 8){
				flash = false;
				clearTimeout(flashTO);
				part3B();
			}
		}
	}
	function part3B(){
		ctx.clearRect((200*obNum), obstacleD.y, obstacleD.width, obstacleD.height);
		obNum++;
		//myRunner.x++;
		animate();
	}
}

function part3R(){
	//alert("CORRECT");
	answered = 0;
	part1();
}

function drawRunner() {
	ctx.drawImage(runner, myRunner.x, myRunner.y, myRunner.width, myRunner.height);
}

function drawObstacle(c, x){
	var i = obstacle[c];
	ctx.drawImage(i, x, obstacleD.y, obstacleD.width, obstacleD.height);
	obstacleX[c] = x;
}

function drawObstacles(){
	var a = 3;
	var b = 3;
	for(var i = 0; i <3; i++){
		var c = rObstacle();
		while(c == a || c== b)
			c = rObstacle();
		drawObstacle(c, (200*(i+1)));
		if (a == 3)
			a = c;
		else
			b = c;
	}
}

function rObstacle(){
	return Math.floor(Math.random() * 3);
}

window.onload = function(){	
	animate();
	//drawRunner();
	//part3W();
}