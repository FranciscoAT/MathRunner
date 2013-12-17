function animate(myRectangle, canvas, ctx, x) { 
	var running = true;
	
	
	part1();
	function part1(){
		if(running == true){
			myRectangle.x = x;
			ctx.clearRect(x-5,70,60,35);
			drawRectangle(myRectangle, ctx);
			x += 1;
			
			var test = setTimeout(part1, 10);
		
			if(x == $("#background").width()-myRectangle.width){
				running = false;
				clearTimeout(test);
			}
		}
	}
}	

function drawRectangle(myRectangle, ctx) {
	ctx.beginPath();
	ctx.rect(myRectangle.x, myRectangle.y, myRectangle.width, myRectangle.height);
	ctx.fillStyle = '#8ED6FF';
	ctx.fill();

}

var myRectangle = {
x: 0,
y: 75,
width: 50,
height: 25,
};
	  
var x = 0;
var canvas = document.getElementById('background');
canvas.height=600;
canvas.width=724;
var ctx = canvas.getContext('2d');

animate(myRectangle, canvas, ctx, x);
