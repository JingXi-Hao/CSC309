// Make sure to install these dependencies!
// Instructions are in the README.
var express = require('express');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({   // to support URL-encoded bodies
    extended: true
}));

app.use(expressValidator({
    customValidators: {        
        isVisibility: function(value) {
            var arr = ["private", "public", "after"];
            return (arr.indexOf(value) > -1);
        }
    }   
}));

// Enable CORS for the backend
// Don't do this if frontend and backend are on the same server
var cors = require('cors-express');
app.use(cors({}));

//app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/',{index: 'welcomepagenosignin.html'}));
app.engine('.html', require('ejs').__express);
app.set('views', __dirname);
app.set('view engine', 'html');

initialize validator
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(expressValidator({
    customValidators: {
        // Hint: You can re-use the regular expressions you used client-side
        // in between the forward slashes in the regular expresson search.
        // The birthday is given as an example.

        isVisibility: function(value) {
        		var arr = ["private", "public", "after"];
            return arr.indexOf(value) > -1;
        }
    }
}));

// MongoDB variables
var MongoClient = require('mongodb').MongoClient;
var mongoURL = 'mongodb://localhost:27017/dotogether';
var db;

//MongoDB connect
MongoClient.connect(mongoURL, function(err, database) {
  db = database;
  // Database is ready; listen on port 3000
  app.listen(3000, function () {
    console.log('App listening on port 3000');
  });
});

// MongoDB auto-increment
var autoIncrement = require("mongodb-autoincrement");

// SHA1
var sha1 = require('sha1');

// Reads bearer authorization token
var bearerToken = require('express-bearer-token');
app.use(bearerToken());

// JSON web token
// Reference: Phase 3 Sample
var jwt = require('jwt-simple');
var secret = 'QbSqjf3v1V2sMHyeo27W';

// Function for generating token
// Reference: Phase 3 Sample
var generateToken = function (userID) {
  var date = new Date();
  var payload = {
    userID: userID,
    exp: date.setHours(date.getHours() + 24)
  };
  return jwt.encode(payload, secret);
};

// Parse JSON and make sure that it's not empty
// Reference: Phase 3 Sample
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
app.post('*', jsonParser, function (req, res, next) {
  if (!req.body) return res.sendStatus(400);
  next();
});

// Authentication 
// Reference: Phase 3 Sample
app.all('*', jsonParser, function (req, res, next) {
  if (req.token) {
    var decodedToken = jwt.decode(req.token, secret);
    if (decodedToken && new Date(decodedToken.exp) > new Date()) {
      // Check if user exists and is admin
      db.collection('users').find({
        _id: decodedToken.userID
      }).toArray(function(err, docs) {
        if (docs.length > 0) {
          req.userID = docs[0]._id;
          req.email = docs[0].email;
          req.username = docs[0].username;
          req.admin = docs[0].admin;
        }
        next();
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

// Create user
app.post('/users', function (req, res) {

  // Validation
  if (!req.body.email || !req.body.username || !req.body.password){
    return res.sendStatus(400);
  }
  // Query database: first, check if email or username already exists
  db.collection('users').count({
    $or: [{email: req.body.email}, {userName: req.body.username}]
  }, function(err, count) {
    if (count > 0) {
      // Email or username already exists
      return res.sendStatus(403);
    }
    // Insert into database
    autoIncrement.getNextSequence(db, 'users', function (err, autoIndex) {
      db.collection('users').insertOne({
        _id: autoIndex,
        user_id: autoIndex,
        email: req.body.email,
        username: req.body.username,
        password: sha1(req.body.username + req.body.password),
        admin: false,
        phone: "N/A",
        age: "N/A",
        city: "N/A",
        province: "N/A",
        avatar: "N/A",
        gender: "N/A",
        descriptions: "N/A",
        hobbies: []
      }, function(err, result) {
        var token = generateToken(result.insertedId);
        res.json({
          user_id: result.insertedId,
          token: token
        });
      });
    });
  });
});

//Get all user
app.get('/users/getalluser',function(req,res){
  db.collection('users').find().toArray(function(err,docs){
    var allusers = [];
    for(var i = 0; i < docs.length; i++){
      allusers.push(docs[i].username);
    }
    res.json({
      alluser:allusers
    });
  });
});

// Suspend user
app.delete('/users/:uid', function (req, res) {
  // Check if either admin or user ID matches that on token
  //console.log(req.admin);
  //console.log(req.user_id);
  //if (!req.admin && req.user_id != parseInt(req.params.uid)){
  	//console.log("This is not good");
  //    return res.sendStatus(401);
  //}
    
  // Nullify user password
  db.collection('users').updateOne({
    user_id: parseInt(req.params.uid)
  }, {
    $set: {password: null}
  }, function(err, result) {
    res.sendStatus(200);
  });
});

// Update user
app.put('/users/:uid', function (req, res, next) {
  // Check if either admin or user ID matches that on token
  if (!req.admin && req.userID != parseInt(req.params.uid))
    return res.sendStatus(401);
  // Validation
  if (!req.body.oldPassword || (!req.body.email && !req.body.password))
    return res.sendStatus(400);
  // Query database (check password)
  db.collection('users').find({
    _id: parseInt(req.params.uid),
    password: sha1(req.email + req.body.oldPassword)
  }).toArray(function(err, docs) {
    // If password not found
    if (docs.length == 0) {
      return res.sendStatus(403);
    } else {
      next();
    }
  });
});

app.put('/users/:uid', function (req, res, next) {
  // Change email, if specified
  if (req.body.email) {
    // Query database
    db.collection('users').count({
      email: req.body.email
    }, function(err, count) {
      if (count > 0) {
        // Email already exists
        return res.sendStatus(403);
      } else {
        db.collection('users').updateOne({
          _id: parseInt(req.params.uid)
        }, {
          $set: {email: req.body.email, password: sha1(req.body.email + req.body.oldPassword)}
        }, function(err, result) {
          next();
        });isVisibility
      }
    });
  } else {
    next();
  }
});

app.put('/users/:uid', function (req, res) {
  // Change password, if specified
  if (req.body.password) {
    // Query database
    // Change email for salting if needed
    if (req.body.email) {
      req.email = req.body.email;
    }
    // Update password
    db.collection('users').updateOne({
      _id: parseInt(req.params.uid)
    }, {
      $set: {password: sha1(req.email + req.body.password)}
    }, function(err, result) {
      next();
    });
  } else {
    next();
  }
});

app.put('/users/:uid', function (req, res) {
  
  var newInfo = {};
  if (req.body.gender)
    newInfo.gender = req.body.gender;
  if (req.body.city)
    newInfo.city = req.body.city;
  if (req.body.province)
    newInfo.province = req.body.province;
  if (req.body.descriptions)
    newInfo.descriptions = req.body.descriptions;
  if (req.body.city)
    newInfo.city = req.body.city;

  db.collection('users').updateOne({
    user_id : req.body.user_id
  }, {
    $set : newInfo
  });
  res.sendStatus(200);
});

// Log in
app.post('/login', function (req, res) {
  console.log(req.body.username);
  console.log(req.body.password);
  // Validation
  if (!req.body.username || !req.body.password)
    return res.sendStatus(400);
  // Query database
  db.collection('users').find({
    username: req.body.username,
    password: sha1(req.body.username + req.body.password)
  }).toArray(function(err, docs) {
    if (docs.length == 0) {
      return res.sendStatus(403);
    }
    var token = generateToken(docs[0]._id);
    res.json({
      userID: docs[0]._id,
      token: token
    });
  });
});



// Deal with admin/user_post_page and edit_post page
// Get a post
app.get('/posts/:pid', function (req, res, next) {
  db.collection('posts').find({
    post_id: parseInt(req.params.pid)
  }).toArray(function(err, docs) {
    if (docs.length == 0)
      return res.sendStatus(403);
    req.title = docs[0].title;
    req.username = docs[0].username;
    req.descriptions = docs[0].descriptions;
    req.date = docs[0].date;
    req.category = docs[0].category;
    next();
  });
});
// Get comments for this post
app.get('/posts/:pid', function (req, res) {
  db.collection('comments').find({
    post_id: parseInt(req.params.pid)
  }).toArray(function(err, docs) {
    var comments = [];
    for (var i = 0; i < docs.length; i++) {
		comments.push(docs[i]);
    }
    res.json({
      title: req.title,
      username: req.username,
      descriptions: req.descriptions,
      date: req.date,
      category: req.category,
      comments: comments
    });
  });
});

// Delete a post
app.delete('/posts/:pid', function (req, res, next) {
  db.collection('posts').deleteOne({
    post_id: parseInt(req.params.pid),
    username: req.username
  }, function(err, result) {
    if (result.deletedCount == 1) {
      // A post was deleted
      next();
    } else {
      return res.sendStatus(403);
    }
  });
});


app.delete('/posts/:pid', function (req, res) {
  db.collection('comments').deleteMany({
    post_id: parseInt(req.params.pid)
  }, function(err, result) {
    res.sendStatus(200);
  });
});

// Get all posts for a user or admin
app.get('/posts', function (req, res) {
  if (req.admin) {
    db.collection('posts').find({}).toArray(function (err, docs) {
      if (docs.length == 0) {
        return res.sendStatus(404);
      }
      var posts = [];
      for (var i = 0; i < docs.length; i++) {
        posts.push(docs[i]);
      }
      res.json({
        admin: req.admin,
        posts: posts
      });
    });
  } else {
    db.collection('posts').find({
      username: req.username
    }).toArray(function (err, docs) {
      if (docs.length == 0) {
        return res.sendStatus(404);
      }
      var posts = [];
      for (var i = 0; i < docs.length; i++) {
        posts.push(docs[i]);
      }
      res.json({
        admin: req.admin,
        posts: posts
      });
    });
  }
});

// Get all posts (for display)
app.get('/postAll', function (req, res) {
	console.log("running get postall");
	db.connection('posts').find({}, function (err, allposts) {
		if (err) throw err;
		res.send(JSON.stringify(allpost));			
	})
});

// Update a post
app.put('/posts/:pid', function (req, res) {
  // Validation: check for all theses input boxes are not empty
  if (!req.body.title && !req.body.descriptions && !req.body.category)
    return res.sendStatus(400);
  // Set update JSON
  var updateJSON = {};
  if (req.body.title)
    updateJSON.title = req.body.title;
  if (req.body.descriptions)
    updateJSON.descriptions = req.body.descriptions;
  if (req.body.category)
    updateJSON.category = req.body.category;
  // Update
  db.collection('posts').updateOne({
    post_id: parseInt(req.params.pid)
  }, {
    $set: updateJSON
  }, function(err, result) {
    if (result.matchedCount == 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(403);
    }
  });
});

// Post a comment
app.post('/comment', function (req, res) {

	var time = new Date();
   var year = time.getFullYear();
   var month = time.getMonth();
   var day = time.getDate();
   var hour = time.getHours();
   var minute = time.getMinutes();
   var sec = time.getSeconds();
   var finaltime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + sec;
   
   if (!req.body.username || !req.body.contents)
   	return res.sendStatus(400);
   autoIncrement.getNextSequence(db, 'comments', function (err, autoIndex) {
    db.collection('comments').insertOne({
      comment_id: autoIndex,
      username: req.body.username,//req.user_id
      post_id: req.body.post_id,
      date: finaltime,
      contents: req.body.contents
    }, function(err, result) {
      res.json({
      	username: req.body.username,
         date: finaltime,
         contents: req.body.contents
      });
    });
  });
});

// Create a new post
app.post('/post', function (req, res) {  
  if (!req.body.username || !req.body.title || !req.body.category || !req.body.location)
    return res.sendStatus(400);

  req.checkBody('visibility',
                'Visibility msut be one of the 3 options.').isVisibility();

  var errors = req.validationErrors();
  var mappedErrors = req.validationErrors(true);
  
  if (errors) {
    return res.sendStatus(400);
  }
  else {
    autoIncrement.getNextSequence(db, 'posts', function (err, autoIndex) {
      db.collection('posts').insertOne({
        post_id : autoIndex,
        username : req.body.username,
        title : req.body.title,
        category : req.body.category,
        location : req.body.location,
        visibility : req.body.visibility,
        descriptions : req.body.descriptions,
        attendee : [req.body.username]
      }, function(err, result) {
      	res.sendStatus(200);
      }
      );
    });
  }

});

// Join activity
app.put('/join/:pid', function (req, res) {
  if (!req.body.username) return res.sendStatus(400);

  db.collection('users').find({
      username: req.body.username
    }).toArray(function(err, docs) {
        if (docs.length < 0) {
          res.sendStatus(400);
        }
      });

  db.collection('posts').find({
      post_id: parseInt(req.params.pid)
    }).toArray(function(err, docs) {
        if (docs.length < 0) {
          res.sendStatus(400);
        }
      });

  db.collection('posts').updateOne(
   {post_id: parseInt(req.params.pid)},
   { $addToSet: {attendee: req.body.username}}
  );

  res.sendStatus(200);
});
