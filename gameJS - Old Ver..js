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

function animate() {
        var x = 0;
        var running = true;
        drawRunner();
        drawObstacles();
        part1();
        function part1(){
                if(running == true){
                        myRunner.x = x;
                        ctx.clearRect(x,myRunner.y,myRunner.width,myRunner.height);
                        x += 1;
                        drawRunner(myRunner, ctx);
                        var test = setTimeout(part1, 10);
                
                        if(x+myRunner.width == obstacleX[0] || x+myRunner.width == obstacleX[1] || x+myRunner.width == obstacleX[2]){
                                running = false;
                                clearTimeout(test);
                                part2();
                        }
                }
        }
        
        function part2(){
                getQuestion();
        }
        
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
}