var operator = JSON.parse(localStorage["operator"]);

getOperator = function () {
	for(var i = 0; i<operator.length; i++){
		if(operator[0] !== true){
			$('#P').append("false")
		}
		
		else{
			$('#P').append(operator[i])
		}
	}

	$('#P').append("BREAK")
	$('#P').append(operator[0])
	$('#P').append(operator[1])
	$('#P').append(operator[2])
	$('#P').append(operator[3])
	$('#P').append(operator.length)
}