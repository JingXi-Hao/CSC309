var mongoose = require('mongoose');

var Schema = mongoose.Schema;

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

mongoose.connect('mongodb://localhost/Team08'); 

module.exports = mongoose.model('post', POSTSchema);


/*
when use the database
var posts = require('./model/post');
*/