/* global process */
/* global __dirname */

//packages
var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var local_codes = require('./local_codes');

//local
//var articleController = require('./server/controllers/ArticleController');

var app = express();
var hbs = exphbs.create({ /* config */ });

process.env.NODE_ENV="development";

//change some of the production stuff around (port)
if (process.env.NODE_ENV === "production")
{
  mongoose.connect('mongodb://' + local_codes.internal_ip + ':' + local_codes.data_port + '/SampleCode');
  var server = app.listen(local_codes.port, local_codes.internal_ip, function(){
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
app.get('*', function(req, res){
	  //make this 404 a lot better!
    //res.sendFile(__dirname + '/client/app/views/404.html');
    res.send('404 - Could not find that path!')
});