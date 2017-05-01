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

var POSTSchema = new Schema(
  {
    post_id: {
      type: String,
      required: true,
      unique: true
    },
    user_id: {
      type: String,
      requried: true
    },
    title: {
      type: String, 
      required: true
    },
    descriptions: {
      type: String, 
      required: true
    },
	 date: {
      type: Date,
		required: true
    }
    comments: [{comment_id: String}]
	 tag: {
      type: String,
		required: true
    }
  },
  {
    collection: 'post'
  }
);

var COMMENTSchema = new Schema(
  {
    comment_id: {
      type: String,
      required: true,
      unique: true
    },
    user_id: {
      type: String,
      requried: true
    },
    post_id: {
		type: String,
		requried: true    
    }
	 date: {
      type: Date,
		required: true
    },
    contents: {
      type: String, 
      required: true
    }
  },
  {
    collection: 'comment'
  }
);

mongoose.connect('mongodb://localhost/Team08'); 

module.exports = mongoose.model('user', USERSchema);
module.exports = mongoose.model('post', POSTSchema);
module.exports = mongoose.model('comment', COMMENTSchema);

/*
when use the database
var users = require('./model/user');

*/ 
