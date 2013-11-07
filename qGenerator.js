var operator = JSON.parse(localStorage["operator"]);

getQuestion = function(){

document.getElementById("question").innerHTML=operator[0] + ""+ operator[1] + operator[2] + operator[3] +"y";
$('#demo').append(operator[0] +"y")


	var operation;
	
	var num;
	
	do{
		num = Math.floor(Math.random()*3);
	}
	while(operator[num] == false);
	
	switch(num){
	case(0):
	operation = "+";
	break;
	case(1):
	operation = "-";
	break;
	case(2):
	operation = "*";
	break;
	case(3):
	operation = "/";
	break;
	}
	
	var one = Math.floor(Math.random()*10 + 1), two = Math.floor(Math.random()*10 + 1);
	
	var question = one + " " + operation + " " + two + " = ";
	
	$('#question').append(question)
}