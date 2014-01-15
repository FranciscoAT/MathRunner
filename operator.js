var operators = new Array(false, false, false, false);
var clicked = 0;

setOperator = function (a) {
	if (operators[a] == false) {
		operators[a] = true;
		clicked++;
	} else {
		operators[a] = false;
		clicked--;
	}
}

getOperator = function () {
	for (var i = 0; i < operators.length; i++) {
		if(operators[i] == false){
			$('#P').append("false")
		}
		
		else{
			$('#P').append(operators[i])
		}
	}
}
store = function () {
	if(clicked>0){
		localStorage["operator"] = JSON.stringify(operators);
		location.href= "game2.html"
	}
	else{
		alert("Aucun opérateurs sélectionnés!");
	}
}
	





