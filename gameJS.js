var c=document.getElementById("background");
var ctx=c.getContext("2d");
ctx.fillStyle="#FF0000";
ctx.fillRect(75,113,30,20);
ctx.fillRect(150,113,30,20);
ctx.fillRect(225,113,30,20);

$("#runner").hide()


ctx.moveTo(0, 40);
ctx.lineTo(240, 40);
ctx.moveTo(260, 40);
ctx.lineTo(500, 40);
ctx.moveTo(495, 35);
ctx.lineTo(500, 40);
ctx.lineTo(495, 45);
ctx.stroke();