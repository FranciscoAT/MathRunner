var operator = new Array(false, false, false, false);


setOperator = function (a) {
	if (operator[a] == false) {
		operator[a] = true;
	} else {
		operator[a] = false;
	}
}

getOperator = function () {
	for (var i = 0; i < operator.length; i++) {
		$('#P').append(operator[i])
	}
}
store = function () {
	localStorage["operator"] = JSON.stringify(operator);
}

