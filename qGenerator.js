var operator = JSON.parse(localStorage["operator"]);

var question;

getQuestion = function(){

	document.getElementById("demo").innerHTML=operator;

	var yay = false;
	for(i=0;i<operator.length;i++)
		if(operator[i])
			yay = true;
	
	if(!yay)
		operator[0]=true;

	var num;
	do{
		num = Math.floor(Math.random()*3);
	}
	while(operator[num] == false);
	
	var operation;
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
	
	question = one + " " + operation + " " + two + " = ";
	
	document.getElementById("question").innerHTML=question;
}

getAnswer = function(){
	if(operation == "+")
		
	
	if(operation == "-")
	
	if(operation == "*")
	
	if(operation == "/")

}