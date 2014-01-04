var operator = JSON.parse(localStorage["operator"]); //to obtain selected opertors

var operation, one, two; //to generate question

var correct; //is either 1-4, the correct multiple choice answer

var points = 0; //number of points
var coins = 0; //number of coins

var energy = 100; //amount of energy

var questions = 0; //number of questions answered

var difficulty = 0; //question difficulty

var countdown; //timer variable

getQuestion = function(){

	clearInterval(countdown); //used to reset timer when new question is generated

	//****check
	document.getElementById("demo").innerHTML=operator;

	//little check
	var yay = false;
	for(i=0;i<operator.length;i++)
		if(operator[i])
			yay = true;
	
	if(!yay)
		operator[0]=true;
	//end little check
	
	//generating question with random operator chosen out of selected operators
	var num;
	do{
		num = Math.floor(Math.random()*4);
	}
	while(operator[num] == false);
	
	//********FIX THIS: difficulty
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
	//****check
	document.getElementById("question").innerHTML=question;
	
	//generating answers with one correct and three incorrect answers
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
	$("#answer" + correct).attr("value", answer) //picking one multiple choice to be correct and setting it there
	
	var otherAnswer; //the other answer being generated
	var old = []; //all the old answers already generated to make sure the multiple choice answers are all different
	
	for(var i = 1; i < 5; i++) //for filling in other multiple choice answers
	{
		if(correct != i)
		{
			old.push(otherAnswer); //add old answers onto array
			
			do{
				otherAnswer = Math.floor(Math.random()*(answer*2 + 5)+(answer/2 + 1)); //algorithm for a good range of answers
			
				var discontinue = false; //variable used to make sure multiple choice answers are all different before continuing
			
				for(var j = 0; j < old.length; j++)
					if(old[j] == otherAnswer) discontinue = true; //make sure that all the multiple choice answers are different from each other
			
			}while(otherAnswer == answer || discontinue) //make sure other multiple choice answers are not the same as the correct answer or other answers
			
			$("#answer" + i).attr("value", otherAnswer)
		}
	}
	
	startTimer(10); //timer starts after question and answer are generated
}

//****FIX THIS: timer spam; var countdown
startTimer = function(timer){
	document.getElementById("timer").innerHTML=timer; //timer appears right away without the initial delay
	timer --; //timer decreases by one because of initial delay to avoid an extra second
	countdown = setInterval(function(){
		document.getElementById("timer").innerHTML=timer;
		if(timer > 0) timer -= 1; 
		else{clearInterval(countdown);wrongAns("timeout")}
		}, 1000); //after a delay, the timer will appear and timer will begin countdown until 0
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
	//****check
	document.getElementById("test").innerHTML="CORRECT!" + localStorage.points + "coins:" + coins;
}

//****ADD THE REASONS FOR THE TIMEOUT
wrongAns = function(reason){
	energy -= 5;
	localStorage.energy = energy;
	//****check
	document.getElementById("test").innerHTML="WRONG" + localStorage.energy;
	
	if(reason == "timeout")
	;
	else
	;
}
