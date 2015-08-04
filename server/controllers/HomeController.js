
var Framework = require('../models/framework');

module.exports.getHomePage = function(req, res){
	
	//data will contain some preloaded data from the server
	var data = {
	  layout: 'simplelayout',
	  title: 'SampleCode'
	};
	
	//need to pass in all frameworks for the sidebar
	Framework.find({}, function(error, result){
		data.frameworks = result;
		res.render('homepage', data);
	});  
	
};