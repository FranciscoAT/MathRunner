localStorage.operator = new Array(false, false, false, false);


var setOperator = function (a) {
	if (localStorage.operator[a] == false) {
		localStorage.operator[a] = true;
	} else {
		localStorage.operator[a] = false;
	}
}

var getOperator = function () {
	for (var i = 0; i < localStorage.operator.length; i++) {
		$('#P').append(localStorage.operator[i])
	}
}
var test = function () {
	document.write("test");
}
