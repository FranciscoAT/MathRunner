function animate(myRunner, canvas, ctx, x) { 
	var running = true;
	drawRunner(myRunner, ctx);
	part1();
	function part1(){
		if(running == true){
			myRunner.x = x;
			ctx.clearRect(x-5,myRunner.y-5,myRunner.width+10,myRunner.height+10);
			x += 1;
			drawRunner(myRunner, ctx);
			var test = setTimeout(part1, 10);
		
			if(x == $("#background").width()-myRunner.width){
				running = false;
				clearTimeout(test);
			}
		}
	}
}	

function drawRunner(myRunner, ctx) {
	ctx.drawImage(myRunner.image, myRunner.x, myRunner.y, myRunner.width, myRunner.height);
}

var myRunner = {
image:"male1.png",
x: 0,
y: 75,
width: 80,
height: 140,
};
	  
var x = 0;
var canvas = document.getElementById('background');
canvas.height=600;
canvas.width=724;
var ctx = canvas.getContext('2d');

//drawRunner(myRunner, ctx);
ctx.drawImage("male1.png", 10,10,80,140);
//animate(myRunner, canvas, ctx, x);
