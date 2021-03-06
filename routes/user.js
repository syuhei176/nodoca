


var mongodb = require("mongodb"),
	BSON = mongodb.BSONPure,
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
    var doc = {};
      
    doc.name = name;

    doc.email = email;


    collection.insert(doc, function() {
    	res.redirect("/users")
    });

};

exports.update_view = function(req, res){
	var id = req.param("id");
	var collection = new mongodb.Collection(dbinterface, collection_name);
	collection.find({_id:new BSON.ObjectID(id)}, {}, {limit:1}).toArray(function(err, docs) {
		if(docs.length > 0) {
			res.render('user/update.ejs', { doc : docs[0] });
		}else{
			res.status(404).send("not found");
		}
	})
};

exports.update = function(req, res){
	var id = req.param("id");

	var name = req.param("name");

	var email = req.param("email");

	var collection = new mongodb.Collection(dbinterface, collection_name);
    var doc = {};

    doc.name = name;

    doc.email = email;

	collection.update({_id:new BSON.ObjectID(id)},
			{$set: doc},
			{safe:true,multi:false,upsert:false}, function() {
               res.redirect("/users")
			});

};


