'use strict'

var app = app || {};

app.POST1 = {
	info: ['Date: Feb, 10, 2017',
		   'Time: 10:45pm', 
		   'Location: 220 Yonge St, Toronto, Canada, ON M5B 2H1', 
		   'Contact Poster: 6476538902', 
		   'Details: Looking for someone who is interested in watching Harry Poter together!!!']
};

app.POST2 = {
	info: ['Date: Jan, 20, 2017',
		   'Time: 6:00pm',
		   'Location: 20 College St, Toronto, Canada, ON M5B 3C4',
		   'Contact Poster: 6476538902',
		   'Details: Looking for someone who is interested in studying together!!!']
}

app.buildPost1Info = function() {
	var element = document.getElementById('post1_info');
	var keys = Object.keys(app.POST1);
	var info = app.POST1[keys[0]];
	for (let i = 0; i < info.length; i++) {
		element.appendChild(document.createTextNode(info[i]));
		element.appendChild(document.createElement("br"));
	}
}

app.buildPost1Button = function() {
	var element = document.getElementById('post1_buttons');
	var node = document.createTextNode("Edit");
	var button = document.createElement("BUTTON");
	button.setAttribute("id", "movie_night_edit");
	button.appendChild(node);
	element.appendChild(button);
	document.getElementById("movie_night_edit").className = "btn btn-primary";
	var node2 = document.createTextNode("Delete");
	var button2 = document.createElement("BUTTON");
	button2.setAttribute("id", "movie_night_delete");
	button2.appendChild(node2);
	element.appendChild(button2);
	document.getElementById("movie_night_delete").className = "btn btn-danger";
}

app.buildPost2Info = function() {
	var element = document.getElementById('post2_info');
	var keys = Object.keys(app.POST2);
	var info = app.POST2[keys[0]];
	for (let i = 0; i < info.length; i++) {
		element.appendChild(document.createTextNode(info[i]));
		element.appendChild(document.createElement("br"));
	}
}

app.buildPost2Button = function() {
	var element = document.getElementById('post2_buttons');
	var node = document.createTextNode("Edit");
	var button = document.createElement("BUTTON");
	button.setAttribute("id", "study_night_edit");
	button.appendChild(node);
	element.appendChild(button);
	document.getElementById("study_night_edit").className = "btn btn-primary";
	var node2 = document.createTextNode("Delete");
	var button2 = document.createElement("BUTTON");
	button2.setAttribute("id", "study_night_delete");
	button2.appendChild(node2);
	element.appendChild(button2);
	document.getElementById("study_night_delete").className = "btn btn-danger";
}

app.init = function() {
	this.buildPost1Info();
	this.buildPost1Button();
	this.buildPost2Info();
	this.buildPost2Button();
}

app.init();

// add event to button
document.getElementById('movie_night_edit').onclick = function() {
	location.href = './movie_night_post.html';
};

// document.getElementById('study_night_edit').onclick = function() {
// 	location.href = './study_night_post.html';
// };

document.getElementById('movie_night_delete').addEventListener(
  'click', function() {
  	if (confirm('Do you want to delete this post?') == true) {
    	document.getElementById('post1').classList.toggle('hide');
    }
});

document.getElementById('study_night_delete').addEventListener(
  'click', function() {
    if (confirm('Do you want to delete this post?') == true) {
    	document.getElementById('post2').classList.toggle('hide');
    }
});









