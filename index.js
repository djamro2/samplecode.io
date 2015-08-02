/* global process */
/* global __dirname */

//packages
var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//local
//var articleController = require('./server/controllers/ArticleController');

var app = express();
var hbs = exphbs.create({ /* config */ });

process.env.NODE_ENV="development";

//change some of the production stuff around (port)
if (process.env.NODE_ENV === "production")
{
  mongoose.connect('mongodb://10.132.20.226:24691/SampleCode');
  var server = app.listen(4201, '10.132.20.226', function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('SampleCode listening at http://%s:%s', host, port);
  });
} 
else if (process.env.NODE_ENV === "development")
{
  
  mongoose.connect('mongodb://localhost:27017/SampleCode');
  var server = app.listen(8000, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('SampleCode.io at http://%s:%s', host, port);
  });
}

//handlebars engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('client'));
app.use('/client', express.static(__dirname + '/client'));


//needs to be after middleware
require('./server/routes')(app);

//make a 404 page to render here
//app.get('*', function(req, res){
//	  res.sendFile(__dirname + '/client/app/views/404.html');
//});