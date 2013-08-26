var mongodb = require("mongodb"),
	dbinterface = require("../server/db").getMongoDBInstance()

/*
 * GET users listing.
 */

var collection_name = "users";

exports.list = function(req, res){
	var collection = new mongodb.Collection(dbinterface, collection_name);
	collection.find({},{},{limit:10}).toArray(function(err, docs) {
		res.render('user/show.ejs', {docs : docs});
	})
};

exports.create_view = function(req, res){
	res.render('user/create.ejs', { title: 'Express' });
};

exports.create = function(req, res){
	var name = req.param("name");
	var email = req.param("email");
	var collection = new mongodb.Collection(dbinterface, collection_name);
    var doc = {
    		name : name,
    		email : email
    };
    collection.insert(doc, function() {
    	res.send("true");
    });

};

