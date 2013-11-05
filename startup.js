
setGender = function(g){

localStorage.gender = g;

document.getElementById("demo").innerHTML=localStorage.gender + "h";
}

setName = function(){
localStorage.name = document.getElementById("name").value;
}

getPlayer = function(){
$('#demo').append(localStorage.gender)
//document.getElementById("demo").innerHTML=localStorage.gender + "y";

$('#demo').append(localStorage.name)
}