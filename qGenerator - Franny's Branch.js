var operator = JSON.parse(localStorage["operator"]); //to obtain selected operators

var operation, one, two; //to generate question

var correct; //is either 1-4, the correct multiple choice answer

var points = 0; //number of points
var coins = 0; //number of coins

var energy = 100; //amount of energy

var questions = 0; //number of questions answered

var difficulty = 0; //question difficulty

var countdown; //timer function variable
var timer = 30; //time on the countdown timer

getEnergy = function(){
return energy;
}

getQuestion = function(){
	
	//GUI becomes visible and defaults to original
	document.getElementById("answerPanel").style.visibility="visible";
	$(".multiChoice").attr("style", "background-color: white");
	document.getElementById("confirm").style.visibility="hidden";
	
	//****check to view all variables in the game
	document.getElementById("variables").innerHTML="points:"+points+" coins:"+coins+" energy:"+energy + " num questions:"+questions+" difficulty:"+difficulty;
	
	clearInterval(countdown); //used to reset timer when new question is generated
	timer = 5;
	
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
	
	//hardest difficulty set first
	if(num == 0 || num == 1)
		one = Math.floor(Math.random()*100+1), two = Math.floor(Math.random()*50+1);
	else
		one = Math.floor(Math.random()*15+1), two = Math.floor(Math.random()*15+1);
	
	//difficulty changes accordingly
	switch(difficulty){
	case(0):
		one = Math.floor(Math.random()*10 + 1), two = Math.floor(Math.random()*10 + 1);
		break;
	case(1):
		if(num == 0 || num == 1)
			one = Math.floor(Math.random()*60+1), two = Math.floor(Math.random()*15+1);
		else
			one = Math.floor(Math.random()*12+1), two = Math.floor(Math.random()*12+1);
		break;
	case(2):
		break;
	case(3):
		timer = 25;
		break;
	case(4):
		timer = 20;
		break;
	case(5):
		timer = 15;
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
		operation = "x";
		break;
	case(3):
		operation = "÷";
		one *= two; //to avoid decimal answer values, set one to the product of one and two so that the quotient is a whole number
		break;
	}
	
	var question = one + " <span>" + operation + "</span> " + two + " <span>=</span> <span id=q>?</span>";
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
	case("x"):
		answer = one*two;
		break;
	case("÷"):
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
	
	startTimer(); //timer starts after question and answer are generated
}

startTimer = function(){
	document.getElementById("timer").style.color="white";
	document.getElementById("timer").innerHTML=timer; //timer appears right away without the initial delay
	timer --; //timer decreases by one because of initial delay to avoid an extra second
	countdown = setInterval(function(){
		document.getElementById("timer").innerHTML=timer;
		
		if(timer < 6) 
			document.getElementById("timer").style.color="red";
		
		if(timer > 0) timer -= 1; 
		else{clearInterval(countdown);wrongAns("timeout")}
		}, 1000); //after a delay, the timer will appear and timer will begin countdown until 0
}

isCorrect = function(button){
	
	if(button == correct)
		rightAns();
	else
		wrongAns(button);
		
	document.getElementById("confirm").style.visibility="visible";
	document.getElementById("answer" +correct).style.backgroundColor="green";	
	setTimeout(function(){document.getElementById("confirm").style.visibility="hidden";}, 200);
	setTimeout(function(){document.getElementById("confirm").style.visibility="visible";}, 300);
	setTimeout(function(){clearPanel()}, 1500);
	
	questions++;
	clearInterval(countdown);
	
	if(questions % 10 == 0 && difficulty < 5)
		difficulty++;
	
	
	//***check at the end of picking button
	document.getElementById("variables").innerHTML="points:"+points+" coins:"+coins+" energy:"+energy + " num questions:"+questions+" difficulty:"+difficulty;
}

rightAns = function(){
	points += difficulty + 1;
	coins += difficulty + 2;
	localStorage.points = points;
	localStorage.coins = coins;
	
	$("#confirm").attr("style", "background-image: url('checkmark.png')");
	
	part3R(); //animation for runner
}

wrongAns = function(reason){
	energy -= 10;
	localStorage.energy = energy;
	
	if(reason == "timeout")
	{
		document.getElementById("answer" +correct).style.backgroundColor="green";
		
		//cancels event triggered after animation to allow animation to be triggered multiple times
		var element = document.getElementById("timer");
		element.addEventListener("webkitAnimationEnd", function(){
			this.style.webkitAnimationName = '';
		}, false);
		
		element.style.webkitAnimationName = "timeout"; //triggers animation
		
		setTimeout(function(){clearPanel()}, 1500);
	}
	else
	{
		$("#confirm").attr("style", "background-image: url('xmark.png')");
		document.getElementById("answer" +reason).style.backgroundColor="red";
	}
	
	if(energy <= 0)
		gameOver();
	
	
	
	part3W(); //animation for runner
	
	//*****check at end of timeout
	document.getElementById("variables").innerHTML="points:"+points+" coins:"+coins+" energy:"+energy + " num questions:"+questions+" difficulty:"+difficulty;
}

gameOver = function(){
}

clearPanel = function(){
//	document.getElementById("answerPanel").style.visibility="hidden";
//	document.getElementById("confirm").style.visibility="hidden";
}