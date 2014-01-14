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
	fillArrays();
	for(var i = 1; i<5; i++){
		for(var j = 1; j<11; j++){
			$("#"+i+"op #"+j+"n").html(names[i-1][j-1])
			$("#"+i+"op #"+j+"s").html(score[i-1][j-1])
		}
	}
}

function fillArrays(){
	names = JSON.parse(localStorage["namesHS"]);
	operator = JSON.parse(localStorage["operatorHS"]);
	score = JSON.parse(localStorage["scoreHS"]);
}

function insertLast(){
	//var num = checkOperators();
	var num = 0;
	//names[num][11] = localStorage.getItem("name");
	//score[num][11] = localStorage.getItem("points");
	names[num][11] = "TEST";
	score[num][11] = 1;
	storeOnList(num);
	fillLists();
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
	
	operator[num][11] = CO;
	return num;
}

function storeOnlist(op){
	var sorted = true;
	for(var i = 10; i>0; i--){
		if(sorted){
			if(score[op][i]< score[op][i+1])
				var tempScore = score[op][i];
				var tempName = name[op][i];
				var tempOperator = operator[op][i];
				score[op][i] = score[op][i+1];
				name[op][i] = name[op][i+1];
				operator[op][i] = operator[op][i+1];
				score[op][i+1] = tempScore;
				name[op][i+1] = tempName;
				operator[op][i+1] = tempOperator;
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


if(localStorage.getItem("arraysSetHS") == null)
	initArrays();
else{
	fillArrays();
	fillList();
}
