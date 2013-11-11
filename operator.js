var operator = new Array(false, false, false, false);
var clicked = 0;

setOperator = function (a) {
	if (operator[a] == false) {
		operator[a] = true;
		clicked++;
	} else {
		operator[a] = false;
		clicked--;
	}
}

getOperator = function () {
	for (var i = 0; i < operator.length; i++) {
		if(operator[i] == false){
			$('#P').append("false")
		}
		
		else{
			$('#P').append(operator[i])
		}
	}
}
store = function () {
	if(clicked>0){
		localStorage["operator"] = JSON.stringify(operator);
		location.href= "game.html"
	}
	else{
		alert("No operations selected!");
	}
}



