var currentOperators = JSON.parse(localStorage["operator"]);
var names = new Array();		
var operator = new Array();	
var score = new Array();

function initArrays(){
	for(var i = 0; i<4; i++){
		names[i] = new Array();	
		operator[i] = new Array();
		score[i] = new Array();
	}
	
	for(var i =0; i<4; i++){
		for(var j = 0; j<10; j++){
			names[i][j] = "NO NAME";	
			operator[i][j] = "NONE";
			score[i][j] = 0;
		}
	}
	
	localStorage.setItem("arraysSetHS", true);
	localStorage["operatorHS"] = JSON.stringify(operator);
	localStorage["namesHS"] = JSON.stringify(names);
	localStorage["scoreHS"] = JSON.stringify(score);
	
	fillList();
}


function fillList(){
	for(var i = 1; i<5; i++){
		for(var j = 1; j<11; j++){
			$("#"+i+"op #"+j+"n").html(names[i-1][j-1])
			$("#"+i+"op #"+j+"s").html(score[i-1][j-1])
			$("#"+i+"op #"+j+"o").html(operator[i-1][j-1])
		}
	}
}

function fillArrays(){
	names = JSON.parse(localStorage["namesHS"]);
	operator = JSON.parse(localStorage["operatorHS"]);
	score = JSON.parse(localStorage["scoreHS"]);
}

function storeArrays(){
	localStorage["operatorHS"] = JSON.stringify(operator);
	localStorage["namesHS"] = JSON.stringify(names);
	localStorage["scoreHS"] = JSON.stringify(score);
}

function refreshLists(){
	var num = checkOperators();
	names[num][10] = localStorage.getItem("name");
	score[num][10] = localStorage.getItem("points");
	storeOnList(num);
	storeArrays();
	fillList();
}

function checkOperators(){
	var CO = "";
	var num = -1;
	if(currentOperators[0] == true){
		CO+= " + ";
		num++;
	}
	if(currentOperators[1] == true){
		CO+= " - ";
		num++;
	}
	if(currentOperators[2] == true){
		CO+= " * ";
		num++;
	}
	if(currentOperators[3] == true){
		CO+= " / ";
		num++;
	}
	
	operator[num][10] = CO;
	return num;
}

function storeOnList(op){
	var sorted = true;
	for(var i = 9; i>-1; i--){
		if(sorted){
			if(score[op][i] < score[op][i+1]){
					var tempScore = score[op][i];
					var tempName = names[op][i];
					var tempOperator = operator[op][i];
					score[op][i] = score[op][i+1];
					names[op][i] = names[op][i+1];
					operator[op][i] = operator[op][i+1];
					score[op][i+1] = tempScore;
					names[op][i+1] = tempName;
					operator[op][i+1] = tempOperator;
				}
		}
		else
			sorted = false;
	}
}

showHide = function(c){
	switch(c){
		case 0:
			$("#1op").show()
			$("#2op").hide()
			$("#3op").hide()
			$("#4op").hide()
			break;
		case 1:
			$("#1op").hide()
			$("#2op").show()
			$("#3op").hide()
			$("#4op").hide()
			break;
		case 2:
			$("#1op").hide()
			$("#2op").hide()
			$("#3op").show()
			$("#4op").hide()
			break;
		case 3:
			$("#1op").hide()
			$("#2op").hide()
			$("#3op").hide()
			$("#4op").show()
			break;
	}
}

function fromMain(){
	if(localStorage.getItem("arraysSetHS") == null)
		initArrays();
	else{
		fillArrays();
		fillList();
	}
}

function fromGame(){
	if(localStorage.getItem("arraysSetHS") == null){
		initArrays();
		fillArrays();
		refreshLists();
	}
	else{
		fillArrays();
		refreshLists();
	}
}