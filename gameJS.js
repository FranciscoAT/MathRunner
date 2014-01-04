var x = 0;
var canvas = document.getElementById('background');
canvas.height=600;
canvas.width=724;
var ctx = canvas.getContext('2d');

var runner = new Image();
runner.src= "male1.png";

var obstacle = new Array();
obstacle[0] = new Image();
obstacle[1] = new Image();
obstacle[2] = new Image();

obstacle[1].src = "red.png";


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

function animate(myRunner, canvas, ctx, x) {
	var running = true;
	drawRunner(myRunner, ctx);
	//part1();
	drawObstacles();
	
	function drawObstacles(){
		for(var i = 0; i <3; i++){
			var c = rObstacle();
			if (c==0){
				obstacle[i].src = "red.png";
			}
			else if (c==1){
				obstacle[i].src = "blue.png";
			}
			else{
				obstacle[i].src = "green.png";
			}
				
			drawObstacle(obstacle[i], (200*(i+1)));
		}	
	
	}
	function part1(){
		if(running == true){
			myRunner.x = x;
			ctx.clearRect(x,myRunner.y,myRunner.width,myRunner.height);
			x += 1;
			drawRunner(myRunner, ctx);
			var test = setTimeout(part1, 10);
		
			if(x == obstacle[0]-obstacleD.width || x == 400-obstacleD.width || x == 600-obstacleD.width){
				running = false;
				clearTimeout(test);
			}
		}
	}
}	


function drawRunner(myRunner, ctx) {
	ctx.drawImage(runner, myRunner.x, myRunner.y, myRunner.width, myRunner.height);
}

function drawObstacle(c, x){
	ctx.drawImage(c, x, obstacleD.y, obstacleD.width, obstacleD.height);
}

function rObstacle(){
	return Math.floor(Math.random() * 3);
}

window.onload = function(){	
	animate(myRunner, canvas, ctx, x);
	drawObstacle(obstacle[1], 200);
}