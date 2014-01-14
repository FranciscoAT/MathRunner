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

var typePowerup = -1;

getEnergy = function(){
return energy;
}

getQuestion = function(){
	
	//GUI becomes visible and defaults to original
	document.getElementById("answerPanel").style.visibility="visible";
	document.getElementById("confirm").style.visibility="hidden";
	document.getElementById("powerup").style.visibility="hidden";
	$(".multiChoice").attr("disabled", false);
	$(".multiChoice").attr("style", "color: blue");
	
	//sets infoBar with initial variables
	questions++;
	setInfoBar();
	
	clearInterval(countdown); //used to reset timer when new question is generated
	timer = 3;
	
	//****check
	document.getElementById("demo").innerHTML=operator;

	//*****little check
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
	
	var question = one + " <span class=q>" + operation + "</span> " + two + " <span class=q>= ?</span>";
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
	document.getElementById("timer").style.color="orange";
	document.getElementById("timer").innerHTML=timer; //timer appears right away without the initial delay
	timer --; //timer decreases by one because of initial delay to avoid an extra second
	countdown = setInterval(function(){
		document.getElementById("timer").innerHTML=timer;
		
		if(timer < 6) 
			document.getElementById("timer").style.color="red";
		
		if(timer > 0) timer -= 1; 
		else{clearInterval(countdown);isCorrect("timeout")}
		}, 1000); //after a delay, the timer will appear and timer will begin countdown until 0
}

isCorrect = function(button){
	
	$(".multiChoice").attr("disabled", true);
	
	if(button > 0 && button < 5)
	{
		if(button == correct)
			rightAns();
		else
			wrongAns(button);
			
		animateConfirm();
	}
	else if(button == "timeout")
		wrongAns("timeout");
	
	clearInterval(countdown);
	
	
	
	if(questions >= 10 && difficulty < 5)
	{
		difficulty++;
		questions = 0;
	}
	
	setInfoBar();
}

animateConfirm = function(){
	document.getElementById("confirm").style.visibility="visible";
	document.getElementById("answer" +correct).style.color="green";
	setTimeout(function(){document.getElementById("confirm").style.visibility="hidden";}, 200);
	setTimeout(function(){document.getElementById("confirm").style.visibility="visible";}, 300);
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
		document.getElementById("answer" +correct).style.color="green";
		
		//cancels event triggered after animation to allow animation to be triggered multiple times
		var element = document.getElementById("timer");
		element.addEventListener("webkitAnimationEnd", function(){
			this.style.webkitAnimationName = '';
		}, false);
		
		element.style.webkitAnimationName = "timeout"; //triggers animation
		
	}
	else
	{
		$("#confirm").attr("style", "background-image: url('xmark.png')");
		document.getElementById("answer" +reason).style.color="red";
	}
	
	if(energy <= 0)
		gameOver();
	else
		part3W(); //animation for runner
	
}

gameOver = function(){
//**********GAMEOVER DO SOMETHING
}

clearPanel = function(){
	document.getElementById("answerPanel").style.visibility="hidden";
	document.getElementById("confirm").style.visibility="hidden";
	
	var chance = 2;//Math.floor(Math.random()*30 + 1)
	
	if(chance == 1)
		powerUp("coins");
	else if (chance == 2)
		powerUp("booster");
	else if (chance == 3)
		powerUp("jetpack");
}

setInfoBar = function(){
	document.getElementById("points").innerHTML=points;
	document.getElementById("coins").innerHTML=coins;
	document.getElementById("energy").innerHTML=energy;
	document.getElementById("level").innerHTML=difficulty+1;
	document.getElementById("questions").innerHTML=questions;
	
	setEnergyBar();
}

setEnergyBar = function(){
	
	animateEnergyBar();
	//var element = document.getElementById("energyBar");
//	element.addEventListener("webkitAnimationEnd", function(){
//		this.style.webkitAnimationName = '';
//	}, false);
	
	//element.style.webkitAnimationName = "decEnergy";
	
	if(energy > 60)
		$("#energyBar").attr("style", "background-position: -" + ((100-energy)/10)*35 + "px 0px;");
	else if(energy > 30)
		$("#energyBar").attr("style", "background-position: -"+ ((60-energy)/10)*35 +"px -35px;");
	else if(energy > 0)
		$("#energyBar").attr("style", "background-position: -"+ ((30-energy)/10)*35 +"px -70px;");
	else
		$("#energyBar").attr("style", "background-position: -350px 0px;");
}

animateEnergyBar = function(){
	var element = document.getElementById("energyBar"),
		style = window.getComputedStyle(element),
		x = style.getPropertyValue("left");
		
	//possible to use pause and play css animations to  make life easier
}

powerUp = function(type){

	var x = Math.floor(Math.random()*800 + 50);
	var y = Math.floor(Math.random()*350 + 100);
	
	document.getElementById("powerup").style.top=y + "px";
	document.getElementById("powerup").style.left=x + "px";
	document.getElementById("powerup").style.visibility="visible";
	
	if(type == "jetpack")
	{
		document.getElementById("powerup").style.backgroundImage="url('images/jetPack.png')";
		typePowerup = type;
	}
	else if(type == "booster")
	{
		document.getElementById("powerup").style.backgroundImage="url('images/energy.png')";
		typePowerup = type;
	}
	else if(type == "coins")
	{
		document.getElementById("powerup").style.backgroundImage="url('images/coins.png')";
		typePowerup = type;
	}
}

triggerPowerup = function(){

	document.getElementById("powerup").style.visibility="hidden";
	
	if(typePowerup == "jetpack")
	{
		//*********TIME THIS TO BE THE SAME AS WHEN JETPACK FLIES OVER OBJECTS
		for(var i = 1; i < 4; i++)
		{
			setTimeout(function(){questions++; 
			points += difficulty + 1;
			setInfoBar();}, 1500*i);
		}	
		
		stopAnimation();
		animateJetpack();
	}
	else if(typePowerup == "booster")
	{
		if(energy > 70)
			energy = 100;
		else
			energy += 30;
		
		setInfoBar();
	}
	else if(typePowerup == "coins")
	{
		for(var i = 1; i < 16; i++)
		{
			setTimeout(function(){coins++; setInfoBar();}, 100*i);
		}	
	}
}