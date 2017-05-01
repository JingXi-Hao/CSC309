var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var USERSchema = new Schema(
    {
        _id: {type: Number}, //Will be different depending on your implementation, could be Number
        username: {type: String, required:true, unique:true},
        firstname: {type: String, default:""},
        lastname: {type: String, default:""},
        sex:  {type: String, default:""},
        age: {type: Number, default: 0},
    {
        collection: 'users'
    }
);

var STORESchema = new Schema(
    {
        _id: {type: Number}, 
        storename: {type: String, required:true},
        category: {type: String, default:""},
        Address: {type: String, default:""},
    {
        collection: 'stores'
    }
);

var REVIEWSchema = new Schema(
    {
        _id: {type: Number},
        userID: {type: String, required:true},
        storeID: {type: String, required:true},
        rating: {type:Number, required:true},
        comment: {type:String},
    {
        collection: 'reviews'
    }
);

mongoose.connect('mongodb://localhost/assignment2'); 

module.exports = mongoose.model('users', USERSchema);
module.exports = mongoose.model('stores', STORESchema);
module.exports = mongoose.model('reviews', REVIEWSchema);

/*
when use the database
var users = require('./model/user');

*/ 
