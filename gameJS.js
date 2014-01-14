var canvas = document.getElementById('background');
canvas.height=600;
canvas.width=1024;
var ctx = canvas.getContext('2d');

var runner = new Image();
runner.src= localStorage.avatar;

var jetpack = new Image();
jetpack.src = "images/jetpack.png";

var obstacle = new Array();
obstacle[0] = new Image();
obstacle[1] = new Image();
obstacle[2] = new Image();

obstacle[0].src = "images/rocks.png";
obstacle[1].src = "images/log.png";
obstacle[2].src = "images/pylon.png";

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
	x: 275,
};

var obNum = 1;
var run = null;
var running = false;

function animate() {
	running = true;
	part1();
	function part1(){
		if(running){
			clearRunner();
			myRunner.x++;
			drawRunner();
			run = setTimeout(part1, 8);
		
			if(myRunner.x+myRunner.width == obstacleX[0] || myRunner.x+myRunner.width == obstacleX[1] || myRunner.x+myRunner.width == obstacleX[2]){
				running = false;
				clearTimeout(run);
				part2();
			}
			
			if(myRunner.x-1024 == myRunner.width){
				running = false;
				clearTimeout(run);
				reset();
			}
		}
	}
}

function part2(){
	getQuestion();
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
				clearRunner();
				f = true;
			}
			var flashTO = setTimeout(part3A, 350);
			t++;
			if(t == 10){
				flash = false;
				clearTimeout(flashTO);
				part3B();
			}
		}
	}
	function part3B(){
		clearPanel();
		clearObstacle(obNum);
		obNum++;
		animate();
	}
}

function part3R(){
	var jump = true;
	var down = false;
	clearRunner();
	myRunner.y --;
	drawRunner();
	part3A();
	function part3A(){
		if(jump){
			clearRunner();
			if(down == false)
				myRunner.y--
			else
				myRunner.y++

			drawRunner();
			var run = setTimeout(part3A, 10);
			
			if(myRunner.y == 340)
				down = true;
			
			if(myRunner.y == 400 && down){
				jump = false;
				part3B();
			}
		}
	}
	
	function part3B(){
		clearPanel();
		clearObstacle(obNum);
		obNum++;
		animate();
	}
}

function animateJetpack(){
	var jump = true;
	part1();
	function part1(){
		if(jump){
			clearRunner();
			myRunner.y--
			drawRunner();
			
			var jumping = setTimeout(part1, 6);
			
			if(myRunner.y == 315){
				jump = false;
				clearTimeout(jumping);
				part2();
			}
		}	
	}
	
	function part2(){
		clearRunner();
		drawJetpack();
		var q = 0;
		var f = true;
		part2A();
		function part2A(){
			if(f){
				clearJetpack();
				myRunner.x ++;
				drawJetpack();	
				var flying = setTimeout(part2A, 8);
				
				if(myRunner.x == obstacleX[0]+obstacleD.width || myRunner.x == obstacleX[1]+obstacleD.width || myRunner.x == obstacleX[2]+obstacleD.width){
					q++;
					clearObstacle(obNum);
					obNum++;
					if(q == 3){
						clearTimeout(flying);
						f = false;
						part3();
					}
				}
				
				if(myRunner.x-1024 == myRunner.height){
					clearJetpack();
					myRunner.x = 0;
					drawJetpack();
					drawObstacles();
					obNum = 1;
				}
			}
		}		
	}
	
	function part3(){
		clearJetpack();
		drawRunner();
		var down = true;
		part3A();
		function part3A(){
			if(down){
				clearRunner();
				myRunner.y++;
				drawRunner();
				var falling = setTimeout(part3A, 10);
				
				if(myRunner.y == 400){
					jump = false;
					clearTimeout(falling);
					animate();
				}
			}	
		}
	}
}

function reset(){
	clearRunner();
	myRunner.x = 0;
	drawRunner();
	drawObstacles();
	obNum = 1;
	animate();
}

function drawRunner() {
	ctx.drawImage(runner, myRunner.x, myRunner.y, myRunner.width, myRunner.height);
}

function clearRunner(){
	ctx.clearRect(myRunner.x,myRunner.y,myRunner.width,myRunner.height);
}

function drawJetpack() {
	ctx.drawImage(jetpack, myRunner.x, myRunner.y, myRunner.height, myRunner.width);
}

function clearJetpack(){
	ctx.clearRect(myRunner.x,myRunner.y,myRunner.height,myRunner.width);
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
		drawObstacle(c, (obstacleD.x*(i+1)));
		if (a == 3)
			a = c;
		else
			b = c;
	}
}

function rObstacle(){
	return Math.floor(Math.random() * 3);
}

function clearObstacle(n){
	ctx.clearRect((obstacleD.x*n), obstacleD.y, obstacleD.width, obstacleD.height);
}

function stopAnimation(){
	clearTimeout(run);
	running = false;
}

window.onload = function(){
	drawRunner();
	drawObstacles();
	animate();
}