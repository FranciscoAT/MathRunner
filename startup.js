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

document.getElementById("demo").innerHTML=localStorage.gender;
}

setName = function(){
name = document.getElementById("name").value;
localStorage.name = document.getElementById("name").value;
goToMain();
}

getPlayer = function(){
$('#demo').append(localStorage.gender)
//document.getElementById("demo").innerHTML=localStorage.gender + "y";

$('#demo').append(localStorage.name)
}

goToMain = function () {
	if(selected !== "null" && name !=="null" || name !==""){
		location.href= "mainMenu.html";
	}
	else{
		alert("Name or Gender is not Selected!");
	}
}