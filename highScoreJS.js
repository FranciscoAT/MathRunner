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

test = function(){
	$("#1n").text("test")
}