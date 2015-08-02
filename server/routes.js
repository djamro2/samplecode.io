
var HomeController = require('./controllers/HomeController');
var SubmitController = require('./controllers/SubmitController');

module.exports = function(app)
{
	app.get('/', HomeController.getHomePage);
	app.get('/submit', SubmitController.getSubmitPage);
}