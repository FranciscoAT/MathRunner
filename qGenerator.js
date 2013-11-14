var operator = JSON.parse(localStorage["operator"]);

var operation, one, two;

var correct;

var points = 0;

var energy = 100;

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
	
	var num;
	do{
		num = Math.floor(Math.random()*4);
	}
	while(operator[num] == false);
	
	one = Math.floor(Math.random()*10 + 1), two = Math.floor(Math.random()*10 + 1);
	
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
		switcher = true;
		one *= two; //to avoid decimal answer values, set one to the product of one and two so that the quotient is a whole number
		break;
	}
	
	var question = one + " " + operation + " " + two + " = ";
	
	document.getElementById("question").innerHTML=question;
}

getAnswer = function(){

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
	
	for(var i = 1; i < 5; i++)
	{
		if(correct != i)
			$("#answer" + i).attr("value", Math.floor(Math.random()*10+1)
	}
}

isCorrect = function(button){
	
	if(button == correct)
	{
		points += 5;
		localStorage.points = points;
		document.getElementById("test").innerHTML="CORRECT!" + localStorage.points;
	}
	else
	{
		energy -= 5;
		localStorage.energy = energy;
		document.getElementById("test").innerHTML="WRONG" + localStorage.energy;
	}
	
	getQuestion();
	getAnswer();
}