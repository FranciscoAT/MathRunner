var operatorGame = JSON.parse(localStorage["operator"]);

var names = new Array();		
var operator = new Array();	
var score = new Array();

function initArrays(){
	for(var i =0; i++; i<4){
		alert("forLoop 1");
		for(var j = 0; j++; j<10){
			names[i][j] = "NO NAME";	
			operator[i][j] = "NONE";
			score[i][j] = 0;
			
			alert("NAME ["+i+"]["+j+"] "+names[i][j]);
		}
	}
	
	localStorage.setItem("intSetHS", true);
	localStorage["operatorHS"] = JSON.stringify(operator);
	localStorage["namesHS"] = JSON.stringify(names);
	localStorage["scoreHS"] = JSON.stringify(score);
	
	//fillList();
}

function fillList(){
	fillArrays();
	for(var i = 1; i++; i<5){
		for(var j = 1; j++; j<11){
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



initArrays();
