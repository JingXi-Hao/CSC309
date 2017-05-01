// mongod -dbpath=./data/
$('#cover_page').click(function() {
	location.reload();
});



/*---------------------------------------- Users --------------------------------------*/
// get all users
$('#get_all_users').click(function(){
	var url = "/users";
	getUsers(url);
});

// get users by given info
$('#get_users_by_info').click(function(){
	// clear fields
	$('#firstname').val('');
	$('#lastname').val('');
	$('#sex').val('');
	$('#age').val('');

	// update visibility
	$('.web_header').hide();
	$('#input_id_username_for_getting_user').hide();
	$('#info_table').hide();
	$('#input_for_creating_user').hide();
	$('#input_for_updating_user').hide();
	$('#input_for_getting_stores').hide();
	$('#input_for_creating_store').hide();
	$('#input_id_for_getting_store').hide();
	$('#input_for_updating_store').hide();
	$('#input_for_creating_review').hide();
	$('#input_multi_id_for_getting_review').hide();
	$('#input_for_updating_review').hide();
	$('#input_for_getting_users').show();
});

$('#get_button_for_searching').click(function(){
	//extract data
	var firstname = $('#firstname').val();
	var lastname = $('#lastname').val();
	var sex = $('#sex').val();
	var age = $('#age').val();

	// validation
	if (!firstname && !lastname && !sex && !age) {
		alert("No Information Given!!!");
	} else {
		// make url
		var url = "";
		if (firstname) {
			if (!url) {
				url = url + "firstname=" + firstname;
			} else {
				url = url + "&" + "firstname=" + firstname;
			}
		}

		if (lastname) {
			if (!url) {
				url = url + "lastname=" + lastname;
			} else {
				url = url + "&" + "lastname=" + lastname;
			}
		}

		if (sex) {
			if (!url) {
				url = url + "sex=" + sex;
			} else {
				url = url + "&" + "sex=" + sex;
			}
		}

		if (age) {
			if (!url) {
				url = url + "age=" + age;
			} else {
				url = url + "&" + "age=" + age;
			}
		}

		url = "/users?" + url;

		getUsers(url);
	}
});

// get user by id
$('#get_user_by_id').click(function() {
	$('#lable_id_username').text("User ID: ");
	$('#user_id_or_username').val('');

	$('.web_header').hide();
	$('#input_id_username_for_getting_user').show();
	$('#input_for_getting_users').hide();
	$('#input_for_creating_user').hide();
	$('#input_for_updating_user').hide();
	$('#input_for_getting_stores').hide();
	$('#input_for_creating_store').hide();
	$('#input_id_for_getting_store').hide();
	$('#input_for_updating_store').hide();
	$('#input_for_creating_review').hide();
	$('#input_multi_id_for_getting_review').hide();
	$('#input_for_updating_review').hide();
	$('#info_table').hide();
});

// get user by username
$('#get_user_by_username').click(function() {
	$('#lable_id_username').text("Username: ");
	$('#user_id_or_username').val('');

	$('.web_header').hide();
	$('#input_id_username_for_getting_user').show();
	$('#input_for_getting_users').hide();
	$('#input_for_creating_user').hide();
	$('#input_for_updating_user').hide();
	$('#input_for_getting_stores').hide();
	$('#input_for_creating_store').hide();
	$('#input_id_for_getting_store').hide();
	$('#input_for_updating_store').hide();
	$('#input_for_creating_review').hide();
	$('#input_multi_id_for_getting_review').hide();
	$('#input_for_updating_review').hide();
	$('#info_table').hide();
});

$('#get_button_for_finding_by_id_username').click(function() {
	var check = $('#lable_id_username').text();
	var value = $('#user_id_or_username').val();
	var url = "/user?"

	// validation
	if (!value) {
		alert("No Information Given!!!");
	} else {
		if (check == "User ID: ") {
			url = url + "id=" + value;
		} else if (check == "Username: ") {
			url = url + "username=" + value;
		}

		getUser(url);
	}
});

// create user
$('#create_user').click(function() {
	$('#create_username').val('');
	$('#create_firstname').val('');
	$('#create_lastname').val('');
	$('#create_sex').val('');
	$('#create_age').val('');

	$('.web_header').hide();
	$('#input_id_username_for_getting_user').hide();
	$('#input_for_getting_users').hide();
	$('#input_for_creating_user').show();
	$('#input_for_updating_user').hide();
	$('#input_for_getting_stores').hide();
	$('#input_for_creating_store').hide();
	$('#input_id_for_getting_store').hide();
	$('#input_for_updating_store').hide();
	$('#input_for_creating_review').hide();
	$('#input_multi_id_for_getting_review').hide();
	$('#input_for_updating_review').hide();
	$('#info_table').hide();
});

$('#create_button_for_user').click(function() {
	// extract data
	var username = $('#create_username').val();
	var firstname = $('#create_firstname').val();
	var lastname = $('#create_lastname').val();
	var sex = $('#create_sex').val();
	var age = $('#create_age').val();

	var data = {"username": username, "firstname": firstname, "lastname": lastname, "sex": sex, "age": age};

	$.ajax({
		type: "POST",
		url: "/user",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(data),
		statusCode: {
			200: function(response) {
				alert("User Created Successfully!!!");
				showUser(response);
			},

			403: function(response) {
				alert("Username Provided Already Exists or Is Not Provided!!!");
			}
		}
	});
});



/*---------------------------------------- Stores --------------------------------------*/
// get all stores
$('#get_all_stores').click(function(){
	var url = "/stores";
	getStores(url);
});

// get stores by given info
$('#get_stores_by_info').click(function() {
	// clear fields
	$('#storename').val('');
	$('#category').val('');

	// update visibility
	$('.web_header').hide();
	$('#input_id_username_for_getting_user').hide();
	$('#input_for_getting_users').hide();
	$('#input_for_creating_user').hide();
	$('#input_for_updating_user').hide();
	$('#input_for_getting_stores').show();
	$('#input_for_creating_store').hide();
	$('#input_id_for_getting_store').hide();
	$('#input_for_updating_store').hide();
	$('#input_for_creating_review').hide();
	$('#input_multi_id_for_getting_review').hide();
	$('#input_for_updating_review').hide();
	$('#info_table').hide();
});

$('#get_button_for_searching_stores').click(function() {
	var storename = $('#storename').val();
	var category = $('#category').val();
	var url = "";

	// validation
	if (!storename && !category) {
		alert("No Information Given!!!");
	} else {
		if (storename) {
			if (!url) {
				url = url + "storename=" + storename;
			} else {
				url = url + "&storename=" + storename;
			}
		}

		if (category) {
			if (!url) {
				url = url + "category=" + category;
			} else {
				url = url + "&category=" + category;
			}
		}

		url = '/stores?' + url;
		getStores(url);
	}
});

// create store
$('#create_store').click(function() {
	$('#create_storename').val('');
	$('#create_category').val('');
	$('#create_Address').val('');

	$('.web_header').hide();
	$('#input_id_username_for_getting_user').hide();
	$('#input_for_getting_users').hide();
	$('#input_for_creating_user').hide();
	$('#input_for_updating_user').hide();
	$('#input_for_getting_stores').hide();
	$('#input_for_creating_store').show();
	$('#input_id_for_getting_store').hide();
	$('#input_for_updating_store').hide();
	$('#input_for_creating_review').hide();
	$('#input_multi_id_for_getting_review').hide();
	$('#input_for_updating_review').hide();
	$('#info_table').hide();
});

$('#create_button_for_store').click(function() {
	// extract data
	var storename = $('#create_storename').val();
	var category = $('#create_category').val();
	var Address = $('#create_Address').val();

	var data = {"storename": storename, "category": category, "Address": Address};

	$.ajax({
		type: "POST",
		url: "/store",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(data),
		statusCode: {
			200: function(response) {
				alert("Store Created Successfully!!!");
				showStore(response);
			},

			403: function(response) {
				alert("No Store Name Is Provided or Store Name Is Blank!!!");
			}
		}
	});
});

// get store by id
$('#get_store_by_id').click(function() {
	$('#store_id').val('');

	$('.web_header').hide();
	$('#input_id_username_for_getting_user').hide();
	$('#input_for_getting_users').hide();
	$('#input_for_creating_user').hide();
	$('#input_for_updating_user').hide();
	$('#input_for_getting_stores').hide();
	$('#input_for_creating_store').hide();
	$('#input_id_for_getting_store').show();
	$('#input_for_updating_store').hide();
	$('#input_for_creating_review').hide();
	$('#input_multi_id_for_getting_review').hide();
	$('#input_for_updating_review').hide();
	$('#info_table').hide();
});

$('#get_button_for_finding_store_by_id').click(function() {
	// extract data
	var id = $('#store_id').val();

	//validation 
	if (!id) {
		alert("No Information Given!!!");
	} else {
		var url = '/store?id=' + id;
		getStore(url);
	}
});



/*--------------------------------------- Reviews -----------------------------------*/
// create review
$('#create_review').click(function() {
	$('#create_review_uid').val('');
	$('#create_review_sid').val('');
	$('#create_review_rating').val('');
	$('#create_review_comment').val('');

	$('.web_header').hide();
	$('#input_id_username_for_getting_user').hide();
	$('#input_for_getting_users').hide();
	$('#input_for_creating_user').hide();
	$('#input_for_updating_user').hide();
	$('#input_for_getting_stores').hide();
	$('#input_for_creating_store').hide();
	$('#input_id_for_getting_store').hide();
	$('#input_for_updating_store').hide();
	$('#input_for_creating_review').show();
	$('#input_multi_id_for_getting_review').hide();
	$('#input_for_updating_review').hide();
	$('#info_table').hide();
});

$('#create_button_for_review').click(function() {
	var uid = $('#create_review_uid').val();
	var sid = $('#create_review_sid').val();
	var rating = $('#create_review_rating').val();
	var comment = $('#create_review_comment').val();

	var data = {"userID": uid, "storeID": sid, "rating": rating, "comment": comment};

	$.ajax({
		type: "POST",
		url: "/review",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(data),
		statusCode: {
			200: function(response) {
				alert("Review Created Successfully!!!");
				showReview(response);
			},

			403: function(response) {
				alert("StoreID or UserID Not Found, Rating Not From 0 To 10, Combination of UserID and StoreID Review Already Exists, or Missing UserID or StoreID or Rating!!!");
			}
		}
	});

});

// get review by id
$('#get_review_by_id').click(function() {
	$('#lable_multi_id').text('Review ID: ');
	$('#multi_id').val('');

	// update visibility
	$('.web_header').hide();
	$('#input_id_username_for_getting_user').hide();
	$('#input_for_getting_users').hide();
	$('#input_for_creating_user').hide();
	$('#input_for_updating_user').hide();
	$('#input_for_getting_stores').hide();
	$('#input_for_creating_store').hide();
	$('#input_id_for_getting_store').hide();
	$('#input_for_updating_store').hide();
	$('#input_for_creating_review').hide();
	$('#input_multi_id_for_getting_review').show();
	$('#input_for_updating_review').hide();
	$('#info_table').hide();

});

// get review by store id
$('#get_review_by_storeid').click(function() {
	$('#lable_multi_id').text('Store ID: ');
	$('#multi_id').val('');

	// update visibility
	$('.web_header').hide();
	$('#input_id_username_for_getting_user').hide();
	$('#input_for_getting_users').hide();
	$('#input_for_creating_user').hide();
	$('#input_for_updating_user').hide();
	$('#input_for_getting_stores').hide();
	$('#input_for_creating_store').hide();
	$('#input_id_for_getting_store').hide();
	$('#input_for_updating_store').hide();
	$('#input_for_creating_review').hide();
	$('#input_multi_id_for_getting_review').show();
	$('#input_for_updating_review').hide();
	$('#info_table').hide();
});

// get review by user id
$('#get_review_by_userid').click(function() {
	$('#lable_multi_id').text('User ID: ');
	$('#multi_id').val('');

	// update visibility
	$('.web_header').hide();
	$('#input_id_username_for_getting_user').hide();
	$('#input_for_getting_users').hide();
	$('#input_for_creating_user').hide();
	$('#input_for_updating_user').hide();
	$('#input_for_getting_stores').hide();
	$('#input_for_creating_store').hide();
	$('#input_id_for_getting_store').hide();
	$('#input_for_updating_store').hide();
	$('#input_for_creating_review').hide();
	$('#input_multi_id_for_getting_review').show();
	$('#input_for_updating_review').hide();
	$('#info_table').hide();
});


$('#get_button_for_finding_by_multi_id').click(function() {
	// extract data
	var check = $('#lable_multi_id').text();
	var id = $('#multi_id').val();

	if (!id) {
		alert("No Information Given!!!");
	} else {

		if (check == 'Review ID: ') {
			var url = '/review?id=' + id;
			
			getReview(url);

		} else if (check == 'Store ID: ') {
			var url = '/review?storeid=' + id;

			getReviews(url, 'storeid');

		} else if (check == 'User ID: ') {
			var url = '/review?userid=' + id;

			getReviews(url, 'userid');

		} 
	}
});



/*--------------------------------------- Helper Functions ---------------------------------*/
// Helper function for getting review(s)
function getUser(url) {
	$.ajax({
		type: "GET",
		url: url,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		statusCode: {
			200: function(response) {
				showUser(response);
			},

			404: function(response) {
				//console.log("No User(s) Found!!!");
				alert("No User(s) Found!!!");
			}, 

			403: function(response) {
				//console.log("No Information Given!!!");
				alert("No Information Given!!!");
			}
		}
	});
}

// Helper function for getting user(s)
function getUsers(url) {
	$.ajax({
		type: "GET",
		url: url,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		statusCode: {
			200: function(response) {
				// update visibility
				$('.web_header').hide();
				$('#input_id_username_for_getting_user').hide();
				$('#input_for_getting_users').hide();
				$('#input_for_creating_user').hide();
				$('#input_for_updating_user').hide();
				$('#input_for_getting_stores').hide();
				$('#input_for_creating_store').hide();
				$('#input_id_for_getting_store').hide();
				$('#input_for_updating_store').hide();
				$('#input_for_creating_review').hide();
				$('#input_multi_id_for_getting_review').hide();
				$('#input_for_updating_review').hide();
				$('#info_table').show();

				var users = response.users;
				var parent = $('#all_info_table');
				var parent_2 = $('#table_header');
				parent.empty();
				parent_2.empty();

				parent_2.append('Information For User(s)');

				if (users.length == 0) {
					alert("Cannot Find Any User(s)!!!")
				} else {

					for (var i = 0; i < users.length; i++) {
						var id = users[i]._id;

						parent.append(
							'<tr id="user_' + id + '">' + 
							'<td class="col-md-9">' + 
							// add post information
							'<div class="user_info" style="border:1px solid silver;margin:5px 5px 5px 5px;padding:20px 20px 20px 20px;">' + 
							'<div class="user_id">User ID: ' + users[i]._id + '</div>' + 
							'<div class="username">Username: ' + users[i].username + '</div>'+
							'<div class="firstname">Firstname: '+ users[i].firstname + '</div>' +
							'<div class="firstname">Lastname: '+ users[i].lastname + '</div>' +
							'<div class="firstname">Sex: '+ users[i].sex + '</div>' +
							'<div class="firstname">Age: '+ users[i].age + '</div>' + 
							'</div>' + 
							'</td>' + 
							// add post buttons
							'<td class="col-md-3"><div class="user_buttons" style="padding-left:10px;"><button class="update_button btn btn-primary" style="margin-left:5px;margin-right:5px;" id="user_update_' + id + '">Update</button>' + 
							'<button class="delete_button btn btn-danger" style="margin-left:5px;margin-right:5px;" id="user_delete_' + id + '">Delete</button>' + '</div>' + 
							'</td></tr>'
						);

					}
				}
			}
		}
	});
}

// Helper function for getting store(s)
function getStore(url) {
	$.ajax({
		type: "GET",
		url: url,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		statusCode: {
			200: function(response) {
				showStore(response);
			},

			404: function(response) {
				//console.log("No Store(s) Found!!!");
				alert("No Store(s) Found!!!");
			}, 

			403: function(response) {
				//console.log("No Information Given!!!");
				alert("No Information Given!!!");
			}
		}
	});
}

// Helper function for getting stores
function getStores(url) {
	$.ajax({
		type: "GET",
		url: url,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		statusCode: {
			200: function(response) {
				// update visibility
				$('.web_header').hide();
				$('#input_id_username_for_getting_user').hide();
				$('#input_for_getting_users').hide();
				$('#input_for_creating_user').hide();
				$('#input_for_updating_user').hide();
				$('#input_for_getting_stores').hide();
				$('#input_for_creating_store').hide();
				$('#input_id_for_getting_store').hide();
				$('#input_for_updating_store').hide();
				$('#input_for_creating_review').hide();
				$('#input_multi_id_for_getting_review').hide();
				$('#input_for_updating_review').hide();
				$('#info_table').show();

				var stores = response.stores;
				var parent = $('#all_info_table');
				var parent_2 = $('#table_header');
				parent.empty();
				parent_2.empty();

				parent_2.append('Information For Store(s)');

				if (stores.length == 0) {
					alert("Cannot Find Any Store(s)!!!")
				} else {

					for (var i = 0; i < stores.length; i++) {
						var id = stores[i]._id;

						parent.append(
							'<tr id="store_' + id + '">' + 
							'<td class="col-md-9">' + 
							// add post information
							'<div class="store_info" style="border:1px solid silver;margin:5px 5px 5px 5px;padding:20px 20px 20px 20px;">' + 
							'<div class="store_id">Store ID: ' + stores[i]._id + '</div>' + 
							'<div class="storename">Store Name: ' + stores[i].storename + '</div>'+
							'<div class="category">Category: '+ stores[i].category + '</div>' +
							'<div class="Address">Address: '+ stores[i].Address + '</div>' +
							'</div>' + 
							'</td>' + 
							// add post buttons
							'<td class="col-md-3"><div class="store_buttons" style="padding-left:10px;"><button class="update_button btn btn-primary" style="margin-left:5px;margin-right:5px;" id="store_update_' + id + '">Update</button>' + 
							'<button class="delete_button btn btn-danger" style="margin-left:5px;margin-right:5px;" id="store_delete_' + id + '">Delete</button>' + '</div>' + 
							'</td></tr>'
						);

					}
				}
			}
		}
	});
}

// Helper function for getting review(s)
function getReview(url) {
	$.ajax({
		type: "GET",
		url: url,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		statusCode: {
			200: function(response) {
				showReview(response);
			},

			404: function(response) {
				//console.log("No Review(s) Found!!!");
				alert("No Review(s) Found!!!");
			}, 

			403: function(response) {
				//console.log("No Information Given!!!");
				alert("No Information Given!!!");
			}
		}
	});
}

// Helper function for getting user(s)
function getReviews(url, type) {
	$.ajax({
		type: "GET",
		url: url,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		statusCode: {
			200: function(response) {
				// update visibility
				$('.web_header').hide();
				$('#input_id_username_for_getting_user').hide();
				$('#input_for_getting_users').hide();
				$('#input_for_creating_user').hide();
				$('#input_for_updating_user').hide();
				$('#input_for_getting_stores').hide();
				$('#input_for_creating_store').hide();
				$('#input_id_for_getting_store').hide();
				$('#input_for_updating_store').hide();
				$('#input_for_creating_review').hide();
				$('#input_multi_id_for_getting_review').hide();
				$('#input_for_updating_review').hide();
				$('#info_table').show();

				var reviews = response.reviews;
				var parent = $('#all_info_table');
				var parent_2 = $('#table_header');
				parent.empty();
				parent_2.empty();

				parent_2.append('Information For Review(s)');

				if (reviews.length == 0) {
					alert("No Review(s) Found By Given Store ID or User ID!!!");
				
				} else {
					if (type == 'storeid') {
						for (var i = 0; i < reviews.length; i++) {
							
							parent.append(
								'<tr class="review_' + reviews[i].storeID + '">' + 
								'<td class="col-md-9">' + 
								// add post information
								'<div class="review_info" style="border:1px solid silver;margin:5px 5px 5px 5px;padding:20px 20px 20px 20px;">' + 
								'<div class="review_id">Review ID: ' + reviews[i]._id + '</div>' + 
								'<div class="userID">User ID: ' + reviews[i].userID + '</div>'+
								'<div class="storeID">Store ID: '+ reviews[i].storeID + '</div>' +
								'<div class="rating">Rating: '+ reviews[i].rating + '</div>' +
								'<div class="comment">Comment: '+ reviews[i].comment + '</div>' +
								'</div>' + 
								'</td>' + 

								// add post buttons
								'<td class="col-md-3"><div class="review_buttons" style="padding-left:10px;"><button class="update_button btn btn-primary" style="margin-left:5px;margin-right:5px;" id="review_update_' + reviews[i]._id + '">Update</button>' + 
								'</td></tr>'
							);

						}

						parent.append(
							'<tr class="review_' + reviews[0].storeID + '"><td class="col-md-9">' + 
							'<div class="review_buttons" style="padding-left:10px;">' + 
							'<button class="delete_button btn btn-danger" style="margin-left:5px;margin-right:5px;" id="storeid_delete_' + reviews[0].storeID + '">Delete ALL</button>' + '</div>' + 
							'</td></tr>'
						);
					} else if (type == 'userid') {

						for (var i = 0; i < reviews.length; i++) {

							parent.append(
								'<tr class="review_' + reviews[i].userID + '">' + 
								'<td class="col-md-9">' + 
								// add post information
								'<div class="review_info" style="border:1px solid silver;margin:5px 5px 5px 5px;padding:20px 20px 20px 20px;">' + 
								'<div class="review_id">Review ID: ' + reviews[i]._id + '</div>' + 
								'<div class="userID">User ID: ' + reviews[i].userID + '</div>'+
								'<div class="storeID">Store ID: '+ reviews[i].storeID + '</div>' +
								'<div class="rating">Rating: '+ reviews[i].rating + '</div>' +
								'<div class="comment">Comment: '+ reviews[i].comment + '</div>' +
								'</div>' + 
								'</td>' + 

								// add post buttons
								'<td class="col-md-3"><div class="review_buttons" style="padding-left:10px;"><button class="update_button btn btn-primary" style="margin-left:5px;margin-right:5px;" id="review_update_' + reviews[i]._id + '">Update</button>' + 
								'</td></tr>'
							);

						}

						parent.append(
							'<tr class="review_' + reviews[0].userID + '"><td class="col-md-9">' + 
							'<div class="review_buttons" style="padding-left:10px;">' + 
							'<button class="delete_button btn btn-danger" style="margin-left:5px;margin-right:5px;" id="userid_delete_' + reviews[0].userID + '">Delete ALL</button>' + '</div>' + 
							'</td></tr>'
						);
					}
				}


			},

			403: function(response) {
				//console.log("No Information Given!!!");
				alert("No Information Given!!!");
			}
		}
	});
}



// helper function for showing users newly created
function showUser(response) {
	// update visibility
	$('.web_header').hide();
	$('#input_id_username_for_getting_user').hide();
	$('#input_for_getting_users').hide();
	$('#input_for_creating_user').hide();
	$('#input_for_updating_user').hide();
	$('#input_for_getting_stores').hide();
	$('#input_for_creating_store').hide();
	$('#input_id_for_getting_store').hide();
	$('#input_for_updating_store').hide();
	$('#input_for_creating_review').hide();
	$('#input_multi_id_for_getting_review').hide();
	$('#input_for_updating_review').hide();
	$('#info_table').show();

	var parent = $('#all_info_table');
	var parent_2 = $('#table_header');
	parent.empty();
	parent_2.empty();

	parent_2.append('Information For User');

	parent.append(
		'<tr id="user_' + response['_id'] + '">' + 
		'<td class="col-md-9">' + 
		// add post information
		'<div class="user_info" style="border:1px solid silver;margin:5px 5px 5px 5px;padding:20px 20px 20px 20px;">' + 
		'<div class="user_id">User ID: ' + response['_id'] + '</div>' + 
		'<div class="username">Username: ' + response['username'] + '</div>'+
		'<div class="firstname">Firstname: '+ response['firstname'] + '</div>' +
		'<div class="lastname">Lastname: '+ response['lastname'] + '</div>' +
		'<div class="sex">Sex: '+ response['sex'] + '</div>' +
		'<div class="age">Age: '+ response['age'] + '</div>' +
		'</div>' + 
		'</td>' + 
		// add post buttons
		'<td class="col-md-3"><div class="user_buttons" style="padding-left:10px;"><button class="update_button btn btn-primary" style="margin-left:5px;margin-right:5px;" id="user_update_' + response['_id'] + '">Update</button>' + 
		'<button class="delete_button btn btn-danger" style="margin-left:5px;margin-right:5px;" id="user_delete_' + response['_id'] + '">Delete</button>' + '</div>' + 
		'</td></tr>'
	);
}

// helper function for showing stores newly created
function showStore(response) {
	// update visibility
	$('.web_header').hide();
	$('#input_id_username_for_getting_user').hide();
	$('#input_for_getting_users').hide();
	$('#input_for_creating_user').hide();
	$('#input_for_updating_user').hide();
	$('#input_for_getting_stores').hide();
	$('#input_for_creating_store').hide();
	$('#input_id_for_getting_store').hide();
	$('#input_for_updating_store').hide();
	$('#input_for_creating_review').hide();
	$('#input_multi_id_for_getting_review').hide();
	$('#input_for_updating_review').hide();
	$('#info_table').show();

	var parent = $('#all_info_table');
	var parent_2 = $('#table_header');
	parent.empty();
	parent_2.empty();

	parent_2.append('Information For Store');

	parent.append(
		'<tr id="store_' + response['_id'] + '">' + 
		'<td class="col-md-9">' + 
		// add post information
		'<div class="store_info" style="border:1px solid silver;margin:5px 5px 5px 5px;padding:20px 20px 20px 20px;">' + 
		'<div class="store_id">Store ID: ' + response['_id'] + '</div>' + 
		'<div class="storename">Storename: ' + response['storename'] + '</div>'+
		'<div class="category">Category: '+ response['category'] + '</div>' +
		'<div class="Address">Address: '+ response['Address'] + '</div>' +
		'</div>' + 
		'</td>' + 
		// add post buttons
		'<td class="col-md-3"><div class="store_buttons" style="padding-left:10px;"><button class="update_button btn btn-primary" style="margin-left:5px;margin-right:5px;" id="store_update_' + response['_id'] + '">Update</button>' + 
		'<button class="delete_button btn btn-danger" style="margin-left:5px;margin-right:5px;" id="store_delete_' + response['_id'] + '">Delete</button>' + '</div>' + 
		'</td></tr>'
	);
}

// helper function for showing reviews newly created
function showReview(response) {
	// update visibility
	$('.web_header').hide();
	$('#input_id_username_for_getting_user').hide();
	$('#input_for_getting_users').hide();
	$('#input_for_creating_user').hide();
	$('#input_for_updating_user').hide();
	$('#input_for_getting_stores').hide();
	$('#input_for_creating_store').hide();
	$('#input_id_for_getting_store').hide();
	$('#input_for_updating_store').hide();
	$('#input_for_creating_review').hide();
	$('#input_multi_id_for_getting_review').hide();
	$('#input_for_updating_review').hide();
	$('#info_table').show();

	var parent = $('#all_info_table');
	var parent_2 = $('#table_header');
	parent.empty();
	parent_2.empty();

	parent_2.append('Information For Review');

	parent.append(
		'<tr id="review_' + response['_id'] + '">' + 
		'<td class="col-md-9">' + 
		// add post information
		'<div class="review_info" style="border:1px solid silver;margin:5px 5px 5px 5px;padding:20px 20px 20px 20px;">' + 
		'<div class="review_id">Review ID: ' + response['_id'] + '</div>' + 
		'<div class="userid">User ID: ' + response['userID'] + '</div>'+
		'<div class="storeid">Store ID: '+ response['storeID'] + '</div>' +
		'<div class="rating">Rating: '+ response['rating'] + '</div>' +
		'<div class="comment">Comment: '+ response['comment'] + '</div>' +
		'</div>' + 
		'</td>' + 
		// add post buttons
		'<td class="col-md-3"><div class="review_buttons" style="padding-left:10px;"><button class="update_button btn btn-primary" style="margin-left:5px;margin-right:5px;" id="review_update_' + response['_id'] + '">Update</button>' + 
		'<button class="delete_button btn btn-danger" style="margin-left:5px;margin-right:5px;" id="review_delete_' + response['_id'] + '">Delete</button>' + '</div>' + 
		'</td></tr>'
	);
}



/*-------------------------------- add event to dynamically created buttons --------------------------------*/
// update
$('#all_info_table').on('click', '.update_button', function() {
	var element_id = event.target.id.split('_');
	var check = element_id[0];
	
	if (check == "user"){
		var id = element_id[2];
		var url = '/user?id=' + id;
		updateUser(url);
	} else if (check == "store") {
		var id = element_id[2];
		var url = '/store?id=' + id;
		updateStore(url);
	} else if (check == "review") {
		var id = element_id[2];
		var url = '/review?id=' + id;
		updateReview(url);
	}
});

// update user info
$('#update_button_for_user').click(function() {
	// extract data
	var id = $('#update_userid').val();
	var username = $('#update_username').val();
	var firstname = $('#update_firstname').val();
	var lastname = $('#update_lastname').val();
	var sex = $('#update_sex').val();
	var age = $('#update_age').val();

	var data = {"_id": id, "username": username, "firstname": firstname, "lastname": lastname, "sex": sex, "age": age};

	$.ajax({
		type: "PUT",
		url: "/user?id=" + id,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(data),
		statusCode: {
			200: function(response) {
				alert("User Information Updated Successfully (Username and ID Will Not Be Modified)!!!");
				showUser(response);
			},

			404: function(response) {
				alert("No User(s) Found!!!");
			},

			403: function(response) {
				alert("Missing Required Fields or Failed to Update!!!");
			}
		}
	});
});

// update store info
$('#update_button_for_store').click(function() {
	// extract data
	var id = $('#update_storeid').val();
	var storename = $('#update_storename').val();
	var category = $('#update_category').val();
	var Address = $('#update_Address').val();

	var data = {"_id": id, "storename": storename, "category": category, "Address": Address};

	$.ajax({
		type: "PUT",
		url: "/store?id=" + id,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(data),
		statusCode: {
			200: function(response) {
				alert("Store Information Updated Successfully (ID Will Not Be Modified)!!!");
				showStore(response);
			},

			404: function(response) {
				alert("No Store(s) Found!!!");
			},

			403: function(response) {
				alert("Missing Required Fields or Failed to Update!!!");
			}
		}
	});
});

// update review info
$('#update_button_for_review').click(function() {
	// extract data
	var id = $('#update_reviewid').val();
	var userID = $('#update_userid_reivew').val();
	var storeID = $('#update_storeid_review').val();
	var rating = $('#update_rating').val();
	var comment = $('#update_comment').val();

	var data = {"_id": id, "userID": userID, "storeID": storeID, "rating": rating, "comment": comment};

	$.ajax({
		type: "PUT",
		url: "/review?id=" + id,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(data),
		statusCode: {
			200: function(response) {
				alert("Review Information Updated Successfully (Review ID, User ID, and Store ID Will Not Be Modified)!!!");
				showReview(response);
			},

			404: function(response) {
				alert("No Review(s) Found!!!");
			},

			403: function(response) {
				alert("Missing Required Fields or Failed to Update!!!");
			}
		}
	});
});

// delete
$('#all_info_table').on('click', '.delete_button', function() {
	var element_id = event.target.id.split('_');
	var check = element_id[0];

	if (check == 'user') {
		var id = element_id[2];
		var url = '/user?id=' + id;
		var row = 'user_' + id;
		if (confirm('Do you want to delete this user?') == true) {
			deleteUser(url, row);
		}
	} else if (check == 'store') {
		var id = element_id[2];
		var url = '/store?id=' + id;
		var row = 'store_' + id;
		if (confirm('Do you want to delete this store?') == true) {
			deleteStore(url, row);
		}
	} else if (check == 'review') {
		var id = element_id[2];
		var url = '/review?id=' + id;
		var row = 'review_' + id;
		if (confirm('Do you want to delete this review?') == true) {
			deleteReview(url, row);
		}
	} else if (check == 'storeid') {
		var id = element_id[2];
		var url = '/review?storeid=' + id;
		var row = 'review_' + id;
		if (confirm('Do you want to delete these reviews?') == true) {
			deleteReviews(url, row);
		}
	}
	else if (check == 'userid') {
		var id = element_id[2];
		var url = '/review?userid=' + id;
		var row = 'review_' + id;
		if (confirm('Do you want to delete these reviews?') == true) {
			deleteReviews(url, row);
		}
	}
});



/*----------------------------------- Helper For Dynamically Added Elements --------------------------------*/
// helper function for updating user
function updateUser(url) {
	$.ajax({
		type: "GET",
		url: url,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		statusCode: {
			200: function(response) {
				var user = response;
				$('#update_userid').val(user._id);
				$('#update_username').val(user.username);
				$('#update_firstname').val(user.firstname);
				$('#update_lastname').val(user.lastname);
				$('#update_sex').val(user.sex);
				$('#update_age').val(user.age);

				// update visibility
				$('.web_header').hide();
				$('#input_id_username_for_getting_user').hide();
				$('#input_for_getting_users').hide();
				$('#input_for_creating_user').hide();
				$('#input_for_updating_user').show();
				$('#input_for_getting_stores').hide();
				$('#input_for_creating_store').hide();
				$('#input_id_for_getting_store').hide();
				$('#input_for_updating_store').hide();
				$('#input_for_creating_review').hide();
				$('#input_multi_id_for_getting_review').hide();
				$('#input_for_updating_review').hide();
				$('#info_table').hide();

			},

			404: function(response) {
				alert("No User(s) Found!!!")
			},
			// no need for this check since we do not require an input id
			403: function(response) {
				alert("No Information Given!!!");
			}
		}
	});
}

// helper funtion for updating store
function updateStore(url) {
	$.ajax({
		type: "GET",
		url: url,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		statusCode: {
			200: function(response) {
				var store = response;
				$('#update_storeid').val(store._id);
				$('#update_storename').val(store.storename);
				$('#update_category').val(store.category);
				$('#update_Address').val(store.Address);

				// update visibility
				$('.web_header').hide();
				$('#input_id_username_for_getting_user').hide();
				$('#input_for_getting_users').hide();
				$('#input_for_creating_user').hide();
				$('#input_for_updating_user').hide();
				$('#input_for_getting_stores').hide();
				$('#input_for_creating_store').hide();
				$('#input_id_for_getting_store').hide();
				$('#input_for_updating_store').show();
				$('#input_for_creating_review').hide();
				$('#input_multi_id_for_getting_review').hide();
				$('#input_for_updating_review').hide();
				$('#info_table').hide();

			},

			404: function(response) {
				alert("No Store(s) Found!!!");
			},
			// no need for this check since we do not require an input id
			403: function(response) {
				alert("No Information Given!!!");
			}
		}
	});
}

// helper funtion for updating review by id
function updateReview(url) {
	$.ajax({
		type: "GET",
		url: url,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		statusCode: {
			200: function(response) {
				var review = response;
				$('#update_reviewid').val(review._id);
				$('#update_userid_reivew').val(review.userID);
				$('#update_storeid_review').val(review.storeID);
				$('#update_rating').val(review.rating);
				$('#update_comment').val(review.comment);

				// update visibility
				$('.web_header').hide();
				$('#input_id_username_for_getting_user').hide();
				$('#input_for_getting_users').hide();
				$('#input_for_creating_user').hide();
				$('#input_for_updating_user').hide();
				$('#input_for_getting_stores').hide();
				$('#input_for_creating_store').hide();
				$('#input_id_for_getting_store').hide();
				$('#input_for_updating_store').hide();
				$('#input_for_creating_review').hide();
				$('#input_multi_id_for_getting_review').hide();
				$('#input_for_updating_review').show();
				$('#info_table').hide();

			},

			404: function(response) {
				alert("No Review(s) Found!!!");
			},
			// no need for this check since we do not require an input id
			403: function(response) {
				alert("No Information Given!!!");
			}
		}
	});
}


// helper function for deleting user
function deleteUser(url, row) {
	$.ajax({
		type: "DELETE",
		url: url,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		statusCode: {
			200: function(response) {
				document.getElementById(row).classList.toggle('hide');
				alert("User Deleted Successfully!!!");
			},

			404: function(response) {
				alert("No User(s) Found!!!");
			},

			403: function(response) {
				alert("Failed to Delete!!!");
			}
		}
	});
}

// helper function for deleting store
function deleteStore(url, row) {
	$.ajax({
		type: "DELETE",
		url: url,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		statusCode: {
			200: function(response) {
				document.getElementById(row).classList.toggle('hide');
				alert("Store Deleted Successfully!!!");
			},

			404: function(response) {
				alert("No Store(s) Found!!!");
			},

			403: function(response) {
				alert("Failed to Delete!!!");
			}
		}
	});
}

// helper function for deleting review
function deleteReview(url, row) {
	$.ajax({
		type: "DELETE",
		url: url,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		statusCode: {
			200: function(response) {
				document.getElementById(row).classList.toggle('hide');
				alert("Review Deleted Successfully!!!");
			},

			404: function(response) {
				alert("No Review(s) Found!!!");
			},

			403: function(response) {
				alert("Failed to Delete!!!");
			}
		}
	});
}

// helper function for deleting reviews
function deleteReviews(url, row) {
	$.ajax({
		type: "DELETE",
		url: url,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		statusCode: {
			200: function(response) {
				$('.' + row).hide();
				alert("Review(s) Deleted Successfully!!!");
			},

			404: function(response) {
				alert("No Review(s) Found!!!");
			},

			403: function(response) {
				alert("Failed to Delete!!!");
			}
		}
	});
}
