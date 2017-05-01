var MongoClient = require('mongodb').MongoClient;

var _db;

module.exports = {

  connectToServer: function(callback) {
    MongoClient.connect('mongodb://localhost:27017/assignment2', function(err, db) {
    	
      _db = db;
      return callback(err);
    });
  },

  getDB: function() {
    return _db;
  }
  
};