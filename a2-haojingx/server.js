//npm install --save intersect
var express = require('express');
var app = express();
var url = require('url');
// app.use(express.static(__dirname + '/'));

// MongoDB
var mongo = require('./mongo.js');
mongo.connectToServer(function(err) {
  // Database is ready; listen on port 3000
  if (err){throw err;}
  app.listen(3000, function () {
    console.log('App listening on port 3000');
  });
});

// MongoDB auto-increment
var autoIncrement = require("mongodb-autoincrement");

// Array intersect
var intersect = require('intersect');

// Parse JSON and make sure that it's not empty
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
app.post('*', jsonParser, function (req, res, next) {
  if (!req.body) return res.sendStatus(400);
  next();
});
 
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
     extended: true
}));
app.use(express.static(__dirname + '/'));
// get index page
app.get('/', function(req, res) {
    res.sendFile('./index.html');
});

/*-------------------------- Uers ---------------------------*/
// For individual user
// create user
app.post('/user', function (req, res) {
    // validation
    if (!req.body.username) {
  	   return res.sendStatus(403);
    }
    // Query database: first, check if username already exists
    mongo.getDB().collection('users').count({
    	$or: [{username: req.body.username}]
    }, function(err, count) {
		if (count > 0) {
			// username already exists
			return res.sendStatus(403);
		}
        // Insert into database
        if (!req.body.firstname) {
          req.body.firstname = "";
        }

        if (!req.body.lastname) {
          req.body.lastname = "";
        }

        if (!req.body.sex) {
          req.body.sex = "";
        }

        if (!req.body.age) {
          req.body.age = 0;
        }

        autoIncrement.getNextSequence(mongo.getDB(), 'users', function (err, autoIndex) {
            mongo.getDB().collection('users').insertOne({
                _id: autoIndex,
                username: req.body.username,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                sex: req.body.sex,
                age: parseInt(req.body.age)
            }, function(err, result) {
                mongo.getDB().collection('users').find({
                    _id: result.insertedId
                }).toArray(function(err, docs) {
                    if (docs.length == 0) {
                      return res.sendStatus(404);
                    }
                    res.json({
                        _id: docs[0]._id,
                        username: docs[0].username,
                        firstname: docs[0].firstname,
                        lastname: docs[0].lastname,
                        sex: docs[0].sex,
                        age: docs[0].age
                    });
                });
            });
        });
    });
});

// get user
app.get('/user', function(req, res) {

    // validation
    if (!req.query.id && !req.query.username) {
        // 403: forbidden
        return res.sendStatus(403);
    }

    if(req.query.id) {
        // find the specific user by given id
        mongo.getDB().collection('users').find({
            _id: parseInt(req.query.id)
        }).toArray(function(err, docs) {
            if (docs.length == 0) {
              return res.sendStatus(404);
            }
            res.json({
                _id: docs[0]._id,
                username: docs[0].username,
                firstname: docs[0].firstname,
                lastname: docs[0].lastname,
                sex: docs[0].sex,
                age: docs[0].age
            });
        });
    }

    if (req.query.username) {
        // find the specific user by given uername
        mongo.getDB().collection('users').find({
            username: req.query.username
        }).toArray(function(err, docs) {
            if (docs.length == 0) {
              return res.sendStatus(404);
            }
            res.json({
                _id: docs[0]._id,
                username: docs[0].username,
                firstname: docs[0].firstname,
                lastname: docs[0].lastname,
                sex: docs[0].sex,
                age: docs[0].age
            });
        });
    } 
});

// delet user
app.delete('/user', function (req, res, next) {
    // validation
    if (!req.query.id) {
      return res.sendStatus(403);
    }
    // find whether user exists
    mongo.getDB().collection('users').find({
        _id: parseInt(req.query.id)
    }).toArray(function(err, docs) {
        if (docs.lenght == 0) {
            return res.sendStatus(404);
        }
        next();
    });
});

// delete user if exsits
app.delete('/user', function (req, res, next) {
    mongo.getDB().collection('users').deleteOne({
        _id: parseInt(req.query.id)
    }, function(err, result) {
        if (result.deletedCount == 1) {
            //res.sendStatus(200);
            next();
        } else {
            // 403: forbidden
            res.sendStatus(403);
        }
    });
});

// delete user's reviews
app.delete('/user', function(req, res) {
    mongo.getDB().collection('reviews').deleteMany({
        userID: req.query.id
    }, function(err, result) {
        //Question: what error do we need to handle here?
        return res.sendStatus(200);
    })
});

// update user
app.put('/user', function (req, res, next) {
    // validation
    if (!req.query.id) {
        return res.sendStatus(403);
    }

    mongo.getDB().collection('users').find({
        _id: parseInt(req.query.id)
    }).toArray(function(err, docs) {
        if (docs.lenght == 0) {
            return res.sendStatus(404);
        }
        next();
    });
});

app.put('/user', function (req, res) {
    // validation: needed to make the username field in html not changeble
    // if input value is null, reset to default value
    // Set update JSON
    var updateJSON = {};
    if (req.body.firstname || req.body.firstname == "") {
        updateJSON.firstname = req.body.firstname;
    } 
    if (req.body.lastname || req.body.lastname == "") {
        updateJSON.lastname = req.body.lastname;
    } 
    if (req.body.age || req.body.age == "") {
        updateJSON.age = parseInt(req.body.age);
    } 
    if (req.body.sex || req.body.sex == "") {
        updateJSON.sex = req.body.sex;
    } 
    // Update
    mongo.getDB().collection('users').updateOne({
        _id: parseInt(req.query.id)
    }, {
        $set: updateJSON
    }, function(err, result) {
        if (result.matchedCount == 1) {
            //res.sendStatus(200);
            mongo.getDB().collection('users').find({
                _id: parseInt(req.query.id)
            }).toArray(function(err, docs) {
                if (docs.length == 0) {
                    return res.sendStatus(404);
                }
                res.json({
                    _id: docs[0]._id,
                    username: docs[0].username,
                    firstname: docs[0].firstname,
                    lastname: docs[0].lastname,
                    sex: docs[0].sex,
                    age: docs[0].age
                });
            });


        } else {
            // 403: forbidden
            res.sendStatus(403);
        }
    });
});

// For general users
// get users
app.get('/users',function(req,res) {
	//get user quries into a json
	var input_query = url.parse(req.url, true).query;
    // change age type from string to integer
    if (input_query.age) {
        input_query.age = parseInt(input_query.age);
    }

	if (Object.keys(input_query).length == 0){
		//getting all the users 
		mongo.getDB().collection('users').find().sort({username: 1}).toArray(function(err, docs) {
			// if (docs.length == 0) {
			// 	// 404: not found
			// 	return res.sendStatus(404);
			// }
			var users = [];
			for (var i = 0; i < docs.length; i++) {
				users.push(parseUser(docs[i]));
			}
			res.json({
				users: users
			});	
		});

	// get users by given information
	} else {
		mongo.getDB().collection('users').find(input_query).sort({username: 1}).toArray(function(err, docs) {
			// if (docs.length == 0) {
			// 	return res.sendStatus(404);
			// }
			var users = [];
			for (var i = 0; i < docs.length; i++) {
				users.push(parseUser(docs[i]));
			}
			res.json({
				users: users
			});
		});
	}
});

/*-------------------------- Stores --------------------------*/
// For general stores
// get stores
app.get("/stores", function(req, res) {
    var input_query = url.parse(req.url, true).query;

    // get all users
    if (Object.keys(input_query).length == 0) {
        mongo.getDB().collection('stores').find().sort({storename: 1, _id: 1}).toArray(function(err, docs) {
            // if (docs.length == 0) {
            //     return res.sendStatus(404);
            // }
            var stores = [];
            for (var i = 0; i < docs.length; i++) {
                stores.push(parseStore(docs[i]));
            }
            res.json({
                stores: stores
            });
        });

    // get stores by given information
    } else {
        mongo.getDB().collection('stores').find(input_query).sort({storename: 1, _id: 1}).toArray(function(err, docs) {
            // if (docs.length == 0) {
            //     return res.sendStatus(404);
            // }
            var stores = [];
            for (var i = 0; i < docs.length; i++) {
                stores.push(parseStore(docs[i]));
            }
            res.json({
                stores: stores
            });
        });
    }
});

// For individual store
// create store
app.post('/store', function(req, res) {
    // validation
    if (!req.body.storename) {
        return res.sendStatus(403);
    }

    // Insert into database
    if (!req.body.category) {
      req.body.category = "";
    }

    if (!req.body.Address) {
      req.body.Address = "";
    }

    autoIncrement.getNextSequence(mongo.getDB(), 'stores', function (err, autoIndex) {
        mongo.getDB().collection('stores').insertOne({
            _id: autoIndex,
            storename: req.body.storename,
            category: req.body.category,
            Address: req.body.Address
        }, function(err, result) {
            mongo.getDB().collection('stores').find({
                _id: result.insertedId
            }).toArray(function(err, docs) {
                if (docs.length == 0) {
                    return res.sendStatus(404);
                }
                res.json({
                    _id: docs[0]._id,
                    storename: docs[0].storename,
                    category: docs[0].category,
                    Address: docs[0].Address
                });
            });
        });
    });
});

// get store by given information by id
app.get('/store', function(req, res) {
    // validation
    if (!req.query.id) {
        return res.sendStatus(403);
    }

    mongo.getDB().collection('stores').find({
        _id: parseInt(req.query.id)
    }).toArray(function(err, docs) {
        if (docs.length == 0) {
            return res.sendStatus(404);
        }
        res.json({
            _id: docs[0]._id,
            storename: docs[0].storename,
            category: docs[0].category,
            Address: docs[0].Address
        });
    });
});

// delete store by id
app.delete('/store', function(req, res, next) {
    // validation
    if (!req.query.id) {
        return res.sendStatus(403);
    }
    // find whether store exists
    mongo.getDB().collection('stores').find({
        _id: parseInt(req.query.id)
    }).toArray(function(err, docs) {
        if (docs.length == 0) {
            return res.sendStatus(404);
        }
        next();
    });
});

// delete store if it exists
app.delete('/store', function(req, res, next) {
    mongo.getDB().collection('stores').deleteOne({
        _id: parseInt(req.query.id)
    }, function(err, result) {
        if (result.deletedCount == 1) {
            //return res.sendStatus(200);
            next();
        } else {
            return res.sendStatus(403);
        }
    });
});

// delete store's reviews
app.delete('/store', function(req, res) {
    mongo.getDB().collection('reviews').deleteMany({
        storeID: req.query.id
    }, function(err, result) {
        // Question: what error do we need to check here?
        return res.sendStatus(200);
    })
});

// update store by id
app.put('/store', function(req, res, next) {
    // validation
    if(!req.query.id) {
        return res.sendStatus(403);
    }

    mongo.getDB().collection('stores').find({
        _id: parseInt(req.query.id)
    }).toArray(function(err, docs) {
        if (docs.length == 0) {
            return res.sendStatus(404);
        }
        next();
    });
});

app.put('/store', function(req, res) {
    // if input is null, reset to default value, "" --> !req.body.category
    var updateJSON = {};
    if (req.body.storename || req.body.storename == "") {
        updateJSON.storename = req.body.storename;
    } 
    if (req.body.category || req.body.category == "") {
        updateJSON.category = req.body.category;
    } 
    if (req.body.Address || req.body.Address == "") {
        updateJSON.Address = req.body.Address;
    } 

    mongo.getDB().collection('stores').updateOne({
        _id: parseInt(req.query.id)
    }, {
        $set: updateJSON
    }, function (err, result) {
        if (result.matchedCount == 1) {
            //return res.sendStatus(200);
            mongo.getDB().collection('stores').find({
                _id: parseInt(req.query.id)
            }).toArray(function(err, docs) {
                if (docs.length == 0) {
                    return res.sendStatus(404);
                }
                res.json({
                    _id: docs[0]._id,
                    storename: docs[0].storename,
                    category: docs[0].category,
                    Address: docs[0].Address
                });
            });

        } else {
            return res.sendStatus(403);
        }
    })
});

/*-------------------------- Reviews ---------------------------*/
// create review
app.post('/review', function(req, res, next) {
    // validation
    if (!req.body.userID || !req.body.storeID || !req.body.rating) {
        return res.sendStatus(403);
    }

    // check whether rating is between 0 and 10 (inclusive) and it is a number
    if (isNaN(req.body.rating) || (parseInt(req.body.rating) < 0 || parseInt(req.body.rating) > 10)) {
        return res.sendStatus(403);
    }

    // check user existence
    mongo.getDB().collection('users').find({
        _id: parseInt(req.body.userID)
    }).toArray(function(err, docs) {
        if (docs.length == 0) {
            return res.sendStatus(403);
        }
        next();
    });

});

// check store existence
app.post('/review', function(req, res, next) {
    mongo.getDB().collection('stores').find({
        _id: parseInt(req.body.storeID)
    }).toArray(function(err, docs) {
        if (docs.length == 0) {
            return res.sendStatus(403);
        }
        next();
    });
})

// store new review to dataset
app.post('/review', function(req, res) {
    mongo.getDB().collection('reviews').find({
        $and: [{userID: req.body.userID}, {storeID: req.body.storeID}]
    }).toArray(function(err, docs) {
        if (docs.length > 0) {
            return res.sendStatus(403);
        }

        if (!req.body.comment) {
            req.body.comment = "";
        }

        autoIncrement.getNextSequence(mongo.getDB(), 'reviews', function (err, autoIndex) {
            mongo.getDB().collection('reviews').insertOne({
                _id: autoIndex,
                userID: req.body.userID,
                storeID: req.body.storeID,
                rating: parseInt(req.body.rating),
                comment: req.body.comment
            }, function(err, result) {
                mongo.getDB().collection('reviews').find({
                    _id: result.insertedId
                }).toArray(function(err, docs) {
                    if (docs.length == 0) {
                        return res.sendStatus(404);
                    }
                    res.json({
                        _id: docs[0]._id,
                        userID: docs[0].userID,
                        storeID: docs[0].storeID,
                        rating: docs[0].rating,
                        comment: docs[0].comment
                    });
                });
            });
        });

    });
});

// get review/reviews
app.get('/review', function(req, res) {
    // validation
    if (!req.query.id && !req.query.storeid && !req.query.userid) {
        return res.sendStatus(403);
    }

    if (req.query.id) {
        mongo.getDB().collection('reviews').find({
            _id: parseInt(req.query.id)
        }).toArray(function(err, docs) {
            if (docs.length == 0) {
                return res.sendStatus(404);
            }
            res.json({
                _id: docs[0]._id,
                userID: docs[0].userID,
                storeID: docs[0].storeID,
                rating: docs[0].rating,
                comment: docs[0].comment
            });
        });
    } 

    if (req.query.storeid) {
        mongo.getDB().collection('reviews').find({
            storeID: req.query.storeid
        }).toArray(function(err, docs) {
            // if (docs.length == 0) {
            //     return res.sendStatus(404);
            // }
            var reviews = [];
            for (var i = 0; i < docs.length; i++) {
                reviews.push(parseReview(docs[i]));
            }
            res.json({
                reviews: reviews
            });
        });
    } 

    if (req.query.userid) {
        mongo.getDB().collection('reviews').find({
            userID: req.query.userid
        }).toArray(function(err, docs) {
            // if (docs.length == 0) {
            //     return res.sendStatus(404);
            // }
            var reviews = [];
            for (var i = 0; i < docs.length; i++) {
                reviews.push(parseReview(docs[i]));
            }
            res.json({
                reviews: reviews
            });
        });
    }
});

// delete review/reviews
app.delete('/review', function(req, res) {
    // validation
    if (!req.query.id && !req.query.storeid && !req.query.userid) {
        return res.sendStatus(403);
    }

    if (req.query.id) {
        mongo.getDB().collection('reviews').find({
            _id: parseInt(req.query.id)
        }).toArray(function(err, docs) {
            if (docs.length == 0) {
                return res.sendStatus(404);
            }
            
            mongo.getDB().collection('reviews').deleteOne({
                _id: parseInt(req.query.id)
            }, function(err, result) {
                if (result.deletedCount == 1) {
                    return res.sendStatus(200);
                } else {
                    return res.sendStatus(403);
                }
            });
        });
    }

    if (req.query.storeid) {
        mongo.getDB().collection('reviews').find({
            storeID: req.query.storeid
        }).toArray(function(err, docs) {
            if (docs.length == 0) {
                return res.sendStatus(404);
            }
            
            mongo.getDB().collection('reviews').deleteMany({
                storeID: req.query.storeid
            }, function(err, result) {
                if (result.deletedCount > 0) {
                    return res.sendStatus(200);
                } else {
                    return res.sendStatus(403);
                }
            });
        });
    } 

    if (req.query.userid) {
        mongo.getDB().collection('reviews').find({
            userID: req.query.userid
        }).toArray(function(err, docs) {
            if (docs.length == 0) {
                return res.sendStatus(404);
            }
            
            mongo.getDB().collection('reviews').deleteMany({
                userID: req.query.userid
            }, function(err, result) {
                if (result.deletedCount > 0) {
                    return res.sendStatus(200);
                } else {
                    return res.sendStatus(403);
                }
            });
        });
    }
});

// update review by id
app.put('/review', function(req, res, next) {
    // validation
    if (!req.query.id) {
        return res.sendStatus(403);
    }

    mongo.getDB().collection('reviews').find({
        _id: parseInt(req.query.id)
    }).toArray(function(err, docs) {
        if (docs.length == 0) {
            return res.sendStatus(404);
        }
        next();
    });
});

app.put('/review', function(req, res) {
    // validation
    if (!req.body.rating) {
        return res.sendStatus(403);
    }

    // check whether rating is between 0 and 10 (inclusive)
    if (isNaN(req.body.rating) || (parseInt(req.body.rating) < 0 || parseInt(req.body.rating) > 10)) {
        return res.sendStatus(403);
    }

    // reset to default for not required field
    var updateJSON = {};
    if (req.body.rating) {
        updateJSON.rating = parseInt(req.body.rating);
    }
    if (req.body.comment || req.body.comment == "") {
        updateJSON.comment = req.body.comment;
    } 

    mongo.getDB().collection('reviews').updateOne({
        _id: parseInt(req.query.id)
    }, {
        $set: updateJSON 
    }, function(err, result) {
        if (result.matchedCount == 1) {
            //return res.sendStatus(200);
            mongo.getDB().collection('reviews').find({
                _id: parseInt(req.query.id)
            }).toArray(function(err, docs) {
                if (docs.length == 0) {
                    return res.sendStatus(404);
                }
                res.json({
                    _id: docs[0]._id,
                    userID: docs[0].userID,
                    storeID: docs[0].storeID,
                    rating: docs[0].rating,
                    comment: docs[0].comment
                });
            });
        } else {
            return res.sendStatus(403);
        }
    });
});

/*--------------------- Helper function --------------------*/
// parse user information
var parseUser = function(user) {
    return {
        _id: user._id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        sex: user.sex,
        age: user.age
    }
};

// parse store information
var parseStore = function(store) {
    return {
        _id: store._id,
        storename: store.storename,
        category: store.category,
        Address: store.Address
    }
};

// parse review information
var parseReview = function(review) {
    return {
        _id: review._id,
        userID: review.userID,
        storeID: review.storeID,
        rating: review.rating,
        comment: review.comment
    }
};




