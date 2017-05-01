var mongoose = require('mongoose');

var Schema = mongoose.Schema;


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


module.exports = mongoose.model('comment', COMMENTSchema);

/*
when use the database
var comments = require('./model/comment');
*/