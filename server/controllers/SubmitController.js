var Sample = require('../models/sample');
var moment = require('moment');

module.exports.getSubmitPage = function(req, res){
	
	//data will contain some preloaded data from the server
	var data = {
	  layout: 'simplelayout',
	  title: 'Submit a SampleCode'
	};
	  
	res.render('submitpage', data);
	
};

module.exports.saveSample = function(req, res){
	
	var sample = new Sample(req.body);
	
	//make sure that there have been no more than 3 samples in the past minute
	Sample.find( {date: { $gte : moment().add(-1, 'minutes')} }, function(error, result){
		
		var okEmail = sample.email && sample.email.length <= 100;
		var okName = sample.name && sample.name.length <= 100;
		var okDescription = sample.description && sample.description.length <= 5000;
		var okEmbeded = sample.embeded && sample.embeded.length <= 1000;
		
		if (okEmail && okName && okDescription && okEmbeded && result.length <= 3){
			sample.save(function(error, result){
				res.json(result);
			});
		} else {
			res.status(500).send('server could not save sample');
		}		
	});

	
};