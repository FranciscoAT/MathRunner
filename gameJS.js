function animate(myRectangle, canvas, ctx, x) {
	setTimeout(function(){	
		myRectangle.x += x;
		drawRectangle(myRectangle, ctx);
		//ctx.clearRect(x,75,50,25);
		alert("test");
		x += 2;	
	},1000);
	animate(myRectangle, canvas, ctx, x);
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
	  
var x = 0;
var canvas = document.getElementById('background');
var ctx = canvas.getContext('2d');

//drawRectangle(myRectangle, ctx);

animate(myRectangle, canvas, ctx, x);
