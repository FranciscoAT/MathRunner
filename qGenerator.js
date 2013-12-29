var operator = JSON.parse(localStorage["operator"]);

var operation, one, two;

var correct;

var points = 0;
var coins = 0;

var energy = 100;

var questions = 0;

var difficulty = 0;

var countdown;

getQuestion = function(){

	document.getElementById("demo").innerHTML=operator;

	//little check
	var yay = false;
	for(i=0;i<operator.length;i++)
		if(operator[i])
			yay = true;
	
	if(!yay)
		operator[0]=true;
	//end little check
	
	//generating question with random operator 
	var num;
	do{
		num = Math.floor(Math.random()*4);
	}
	while(operator[num] == false);
	
	switch(difficulty){
	case(0):
		one = Math.floor(Math.random()*10 + 1), two = Math.floor(Math.random()*10 + 1);
		break;
	case(1):
		one = Math.floor(Math.random()*100+1), two = Math.floor(Math.random()*10+1);
		break;
	case(2):
		one = Math.floor(Math.random()*100+1), two = Math.floor(Math.random()*100+1);
		break;
	}
	
	prompt(operation + " " + one + " " + two);
	
	switch(num){
	case(0):
		operation = "+";
		break;
	case(1):
		operation = "-";
		if(one < two){
			var temp = one;
			one = two;
			two = temp;
		} //to avoid negative answer values, make sure larger number goes first
		break;
	case(2):
		operation = "*";
		break;
	case(3):
		operation = "/";
		one *= two; //to avoid decimal answer values, set one to the product of one and two so that the quotient is a whole number
		break;
	}
	
	var question = one + " " + operation + " " + two + " = ";
	
	document.getElementById("question").innerHTML=question;
	
	//generating answer with one correct and three incorrect answers
	var answer;
	
	switch(operation){
	case("+"):
		answer = one+two;
		break;
	case("-"):
		answer = one-two;
		break;
	case("*"):
		answer = one*two;
		break;
	case("/"):
		answer = one/two;
		break;
	}
	
	correct = Math.floor(Math.random()*4+1);
		
	$("#answer" + correct).attr("value", answer)
	
	prompt(correct);
	
	for(var i = 1; i < 5; i++)
	{
		
		if(correct != i)
		{
			prompt("loop" + i);
			
			var otherAnswer;
			
			//make sure other multiple choice answers are not the same as the correct answer
			//*****FIX THIS: make sure there are no two of the same wrong answers; make sure range of answers is sufficient for lower number answers
			do{
			if(answer == 0)
				answer = 1;
			otherAnswer = Math.floor(Math.random()*(answer*3)+answer/2);
			prompt(otherAnswer);
			}while(otherAnswer == answer)
			
			$("#answer" + i).attr("value", otherAnswer)
		}
	}
	
	prompt("hi");
	startTimer(10);
}

//****FIX THIS: timer spam; var countdown
startTimer = function(timer){
	countdown = setInterval(function(){document.getElementById("timer").innerHTML=timer;
	if(timer > 0) timer -= 1; else{clearInterval(countdown);wrongAns("timeout")}}, 1000);
}

isCorrect = function(button){
	
	if(button == correct)
		rightAns();
	else
		wrongAns();
	
	questions++;
	
	if(questions == 10)
	{
		if(difficulty < 2)
			difficulty++;
		questions = 0;
	}
	
	getQuestion();
}

rightAns = function(){
	points += 5;
	coins += 10;
	localStorage.points = points;
	localStorage.coins = coins;
	document.getElementById("test").innerHTML="CORRECT!" + localStorage.points + "coins:" + coins;
}

wrongAns = function(reason){
	energy -= 5;
	localStorage.energy = energy;
	document.getElementById("test").innerHTML="WRONG" + localStorage.energy;
	
	if(reason == "timeout")
	;
	else
	;
}
