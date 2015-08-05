
var Framework = require('../models/framework');
var FrameworkController = require('./FrameworkController');
var Sample = require('../models/sample');
var moment = require('moment');

module.exports.getSubmitPage = function(req, res)
{
	
	//data will contain some preloaded data from the server
	var data = {
	  layout: 'simplelayout',
	  title: 'Submit a SampleCode'
	};
	  
	res.render('submitpage', data);
	
};

module.exports.getAllSamples = function(req, res)
{
	
	Sample.find({}, function(error, result){
		res.json(result);
	});
	
};

module.exports.saveSample = function(req, res){
	
	var sample = new Sample(req.body);
	
	//make sure that there have been no more than 3 samples in the past minute
	Sample.find( {date: { $gte : moment().add(-1, 'minutes')} }, function(error, result){
		
		var okEmail = true;//since email is optional
		if(sample.email)
			var okEmail = sample.email.length <= 100;
					
		var okName = sample.name && sample.name.length <= 100;
		var okTitle = sample.title && sample.title.length <= 500;
		var okDescription = sample.description && sample.description.length <= 5000;
		var okEmbeded = sample.embeded && sample.embeded.length <= 1000;
		
		var okAll;
		
		if(okEmail && okName && okTitle && okDescription && okEmbeded)
			okAll = true;
		else 
			okAll = false;
		
		if (okAll && result.length <= 3){
			//make new framework if needed
			if (req.body.framework.value === 'new')
			{
				sample.framework = req.body.newFramework;
				FrameworkController.saveFramework(req.body.newFramework, function(result){
					sample.save(function(error, result){
						res.json(result);
					});
				});
			}
			else
			{
				sample.framework = req.body.framework.name;
				sample.save(function(error, result){
					res.json(result);
				});				
			}

		} else {
			res.status(500).send('server could not save sample');
		}		
	});

	
};