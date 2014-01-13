var operatorGame = JSON.parse(localStorage["operator"]);

var names = new Array();		
var operator = new Array();	
var score = new Array();

function initArrays(){		
	for(var i = 0; i++; j<4){
		for(var j = 0; j++; j<10){
			names[i][j] = "NO NAME";	
			operator[i][j] = "NONE";
			score[i][j] = 0;
		}
	}
	
	localStorage["operatorHS"] = JSON.stringify(operator);
	localStorage["namesHS"] = JSON.stringify(names);
	localStorage["scoreHS"] = JSON.stringify(score);
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


if(JSON.parse(localStorage["names"]) == null)
	initArrays();
else
	fillList();
