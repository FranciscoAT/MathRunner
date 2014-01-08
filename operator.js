var operator = new Array(false, false, false, false);
var clicked = 0;

setOperator = function (a) {
	if (operator[a] == false) {
		operator[a] = true;
		clicked++;
	} else {
		operator[a] = false;
		clicked--;
	}
}

getOperator = function () {
	for (var i = 0; i < operator.length; i++) {
		if(operator[i] == false){
			$('#P').append("false")
		}
		
		else{
			$('#P').append(operator[i])
		}
	}
}
store = function () {
	if(clicked>0){
		localStorage["operator"] = JSON.stringify(operator);
		location.href= "game2.html"
	}
	else{
		alert("No operations selected!");
	}
}

var runner = new Image();
runner.src= "images/male1.png";

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





