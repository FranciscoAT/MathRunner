var selected = "null";
var name = "null";

setGender = function(g){
	if (selected == "boy"){
		if(g == "boy"){
			g = "null";
		}
		else{
			$("#boy").toggleClass('colorToggle')
		}
	}
	else if(selected == "girl"){
		if(g == "girl"){
			g = "null";
		}
		else{
			$("#girl").toggleClass('colorToggle')
		}
	}	
	localStorage.gender = g;
	selected = g;
}

setName = function(){
name = document.getElementById("name").value;
localStorage.name = document.getElementById("name").value;
goToMain();
}

goToMain = function () {
	if(selected !== "null" && name !=="null" || name !==""){
		if(selected == "boy")
			localStorage.avatar = "images/male1.png";
		else
			localStorage.avatar = "images/female1.png";
		location.href= "mainMenu.html";
	}
	else{
		alert("Name or Gender is not Selected!");
	}
}