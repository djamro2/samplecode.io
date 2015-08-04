
var HomeController = require('./controllers/HomeController');
var SampleController = require('./controllers/SubmitController');
var SubmitController = require('./controllers/SubmitController');
var FrameworkController = require('./controllers/FrameworkController');

module.exports = function(app)
{
	//pages
	app.get('/', HomeController.getHomePage);
	app.get('/submit', SubmitController.getSubmitPage);
	app.get('/framework/:id', FrameworkController.getFrameworkPage);
	
	//api
	app.post('/api/submit', SubmitController.saveSample);
	app.get('/api/sample', SubmitController.getAllSamples);
	app.get('/api/framework', FrameworkController.getAllFrameworks);
}