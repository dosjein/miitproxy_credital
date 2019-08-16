// js/welcome.js
console.log('welcome to redFlag');

var event_hodler = [];

function dating(){
	var currentDate = new Date();

	var date = currentDate.getDate();
	var month = currentDate.getMonth(); //Be careful! January is 0 not 1
	var year = currentDate.getFullYear();

	month = (month + 1);
	if (month < 10){
		month = '0' + month;
	}

	var dateString = date + "-" + + "-" + year;
	return 	dateString;
}

document.addEventListener('click', function (event) {

	event_hodler.push({
		time : dating() ,
		target : Object.assign({}, event.target),
		event_type : "click"
	});

}, false);

document.addEventListener('mousemove', function (event) {

	event_hodler.push({
		time : dating() ,
		target : { mouseX : event.clientX , mouseY : event.clientY},
		event_type : "mousemove"
	});

}, false);


document.addEventListener("input", function (event) {

	event_hodler.push({
		time : dating() ,
		target : Object.assign({}, event.target),
		event_type : "input"
	});

}, false);



setInterval(function(){ 
	dSon = JSON.stringify(event_hodler);
	console.log(dSon);
	details = btoa(dSon);

	xht = new XMLHttpRequest();

	xht.open("POST", "lido.asp", true);
	xht.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xht.send("zukenbergs=" + details);

	console.log(details);
	event_hodler = [];
}, 3000);
