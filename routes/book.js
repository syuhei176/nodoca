


var mongodb = require("mongodb"),
	BSON = mongodb.BSONPure,
	dbinterface = require("../server/db").getMongoDBInstance()

/*
 * GET users listing.
 */

var collection_name = "books";

exports.list = function(req, res){
	var collection = new mongodb.Collection(dbinterface, collection_name);
	collection.find({},{},{limit:10}).toArray(function(err, docs) {
		res.render('book/show.ejs', {docs : docs});
	})
};

exports.create_view = function(req, res){
	res.render('book/create.ejs', { title: 'Express' });
};

exports.create = function(req, res){
      
	var stock = req.param("stock");

	var price = req.param("price");

	var title = req.param("title");

	var author = req.param("author");



	var collection = new mongodb.Collection(dbinterface, collection_name);
    var doc = {};
      
    doc.stock = stock;

    doc.price = price;

    doc.title = title;

    doc.author = author;


    collection.insert(doc, function() {
    	res.redirect("/books")
    });

};

exports.update_view = function(req, res){
	var id = req.param("id");
	var collection = new mongodb.Collection(dbinterface, collection_name);
	collection.find({_id:new BSON.ObjectID(id)}, {}, {limit:1}).toArray(function(err, docs) {
		if(docs.length > 0) {
			res.render('book/update.ejs', { doc : docs[0] });
		}else{
			res.status(404).send("not found");
		}
	})
};

exports.update = function(req, res){
	var id = req.param("id");

	var stock = req.param("stock");

	var price = req.param("price");

	var title = req.param("title");

	var author = req.param("author");

	var collection = new mongodb.Collection(dbinterface, collection_name);
    var doc = {};

    doc.stock = stock;

    doc.price = price;

    doc.title = title;

    doc.author = author;

	collection.update({_id:new BSON.ObjectID(id)},
			{$set: doc},
			{safe:true,multi:false,upsert:false}, function() {
               res.redirect("/books")
			});

};


