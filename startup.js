var selected = "null";
var name = "";

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
	selected = g;
}

setName = function(){
	name = document.getElementById("name").value;
	localStorage.setItem("name", name);
	goToMain();
}

goToMain = function () {
	if(selected != "null" && name.length >= 3){
		if(selected == "boy")
			localStorage.avatar = "images/male1.png";
		else
			localStorage.avatar = "images/female1.png";
			
		if(localStorage.getItem("coins") == null)
			localStorage.setItem("coins", 0);
		else{
			var x = localStorage.getItem("coins");
			x++;
			localStorage.setItem("coins", x);
		}
			
		location.href= "mainMenu.html";
	}
	
	else{
		alert("Name must be longer or Gender is not Selected!");
	}
}