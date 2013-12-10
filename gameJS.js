function animate(myRectangle, canvas, ctx) {
	var x = 0;
		function test(){
			setTimeout(function(){	
				myRectangle.x += x;
				$('#temp').append(myRectangle.x)
				drawRectangle(myRectangle, ctx);
				ctx.clearRect(x,75,50,25);
				x += 2;				
				test();
			},10);
		}
}	

function drawRectangle(myRectangle, ctx) {
	ctx.beginPath();
	ctx.rect(myRectangle.x, myRectangle.y, myRectangle.width, myRectangle.height);
	ctx.fillStyle = '#8ED6FF';
	ctx.fill();
	ctx.lineWidth = myRectangle.borderWidth;
	ctx.strokeStyle = 'black';
	ctx.stroke();
}

var myRectangle = {
x: 0,
y: 75,
width: 50,
height: 25,
borderWidth: 2.5
};
	  
	  
var canvas = document.getElementById('background');
var ctx = canvas.getContext('2d');

animate(myRectangle, canvas, ctx);
