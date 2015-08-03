
var HomeController = require('./controllers/HomeController');
var SubmitController = require('./controllers/SubmitController');
var FrameworkController = require('./controllers/FrameworkController');

module.exports = function(app)
{
	app.get('/', HomeController.getHomePage);
	app.get('/submit', SubmitController.getSubmitPage);
	app.post('/api/submit', SubmitController.saveSample);
	app.get('/api/framework', FrameworkController.getAllFrameworks);
}