'use strict'

const post_info = 
	{	
		'Title': 'Movie Night',
		'Photo': './images/MovieNight.png',
		'Date': 'Feb, 10, 2017',
		'Time': '10:45pm',
		'Location': '220 Yonge St, Toronto, Canada, ON M5B 2H1',
		'Contact Poster': '6476538902',
		'Details': 'Looking for someone who is interested in watching Harry Poter together!!!'
	};

var keys = Object.keys(post_info);

var app = app || {};

app.buildTitle = function() {
	var title = post_info[keys[0]];
	var element = document.getElementById('title');
	var header = document.createElement("h2");
	var node = document.createTextNode(title);
	header.appendChild(node);
	element.appendChild(header);
}

app.buildPhoto = function() {
	var url = post_info[keys[1]];
	var element = document.getElementById('photo');
	var image = document.createElement("img");
	image.setAttribute('id', 'act_photo');
	image.src = url;
	element.appendChild(image);
	document.getElementById('act_photo').className = "img-thumbnail";
	var button = document.createElement("BUTTON");
	var node = document.createTextNode('upload image');
	button.appendChild(node);
	button.setAttribute('id', 'upload_button');
	element.appendChild(button);
	document.getElementById('upload_button').className = "btn btn-info";
}

app.buildDate = function() {
	var date = post_info[keys[2]];
	var element = document.getElementById('date');

	var label_for_input = document.createElement('label');
	var node = document.createTextNode('Date: ');
	label_for_input.appendChild(node);
	element.appendChild(label_for_input);

	var input_box = document.createElement('input');
	input_box.setAttribute('value', date);
	input_box.setAttribute('id', 'date_input');
	element.appendChild(input_box);
	document.getElementById('date_input').className = "form-control";
}

app.buildTime = function() {
	var time = post_info[keys[3]];
	var element = document.getElementById('time');

	var label_for_input = document.createElement('label');
	var node = document.createTextNode('Time: ');
	label_for_input.appendChild(node);
	element.appendChild(label_for_input);

	var input_box = document.createElement('input');
	input_box.setAttribute('value', time);
	input_box.setAttribute('id', 'time_input');
	element.appendChild(input_box);
	document.getElementById('time_input').className = "form-control";
}

app.buildLocation = function() {
	var location = post_info[keys[4]];
	var element = document.getElementById('location');

	var label_for_input = document.createElement('label');
	var node = document.createTextNode('Location: ');
	label_for_input.appendChild(node);
	element.appendChild(label_for_input);

	var input_box = document.createElement('input');
	input_box.setAttribute('value', location);
	input_box.setAttribute('id', 'location_input');
	element.appendChild(input_box);	
	document.getElementById('location_input').className = "form-control";
}

app.buildContactPoster = function() {
	var contact = post_info[keys[5]];
	var element = document.getElementById('contact_poster');

	var label_for_input = document.createElement('label');
	var node = document.createTextNode('Contact: ');
	label_for_input.appendChild(node);
	element.appendChild(label_for_input);

	var input_box = document.createElement('input');
	input_box.setAttribute('value', contact);
	input_box.setAttribute('id', 'contact_poster_input');
	element.appendChild(input_box);	
	document.getElementById('contact_poster_input').className = "form-control";
}

app.buildDetails = function() {
	var details = post_info[keys[6]];
	var element = document.getElementById('details');

	var label_for_input = document.createElement('label');
	var node = document.createTextNode('Details: ');
	label_for_input.appendChild(node);
	element.appendChild(label_for_input);

	var text_area = document.createElement('textarea');
	text_area.innerHTML = details;
	text_area.setAttribute('rows', 3);
	text_area.setAttribute('cols', 400);
	text_area.setAttribute('id', 'details_input');
	element.appendChild(text_area);	
	document.getElementById('details_input').className = "form-control";
}

app.init = function() {
	this.buildTitle();
	this.buildPhoto();
	this.buildDate();
	this.buildTime();
	this.buildLocation();
	this.buildContactPoster();
	this.buildDetails();
}

app.init();





