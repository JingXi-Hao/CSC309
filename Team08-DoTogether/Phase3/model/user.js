var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var USERSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
      unique: true
    },
    username: {
		type: String,
      required: true,
      unique: true
    }
    password: {
      type: String,
      requried: true
    },
    email: {
      type: String, 
      required: true,
      unique: true
    },
    admin: {
		type: Boolean,
		required: true
    }
    phone: {
      type: Number
    },
    age: {
      type: Number
    }
	 city: {
      type: String
    }
    province: {
      type: String
    }
    avatar: {
      type: String
    }
    gender: {
      type: String
    }
    hobbies: [{hobby: String}]
    descriptions: {
      type: String
    }
    Numposts: {
      type: Number
    },
    Numfriends: {
      type: Number
    }
	 friends: [{user_id: String}]
  },
  {
    collection: 'user'
  }
);


mongoose.connect('mongodb://localhost/Team08'); 

module.exports = mongoose.model('user', USERSchema);


/*
when use the database
var users = require('./model/user');

*/