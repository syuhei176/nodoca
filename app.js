

var express = require('express')
  , routes = require('./routes')

, user = require('./routes/user')

, book = require('./routes/book')

  , http = require('http')
  , path = require('path');

var dbinterface = require("./server/db");
dbinterface.open(function() {
	
});

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});



app.get('/', routes.index);

/*
 * user
 */
app.get('/users', user.list);
app.post('/user/create', user.create);
app.get('/user/create', user.create_view);
app.get('/user/update', user.update_view);
app.post('/user/update', user.update);

app.get('/', routes.index);

/*
 * book
 */
app.get('/books', book.list);
app.post('/book/create', book.create);
app.get('/book/create', book.create_view);
app.get('/book/update', book.update_view);
app.post('/book/update', book.update);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

