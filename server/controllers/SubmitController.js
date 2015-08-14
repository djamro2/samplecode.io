
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
	  
	//need to pass in all frameworks for the sidebar
	Framework.find({}, function(error, result){
		
		Sample.find({})
			  .sort('-date')
			  .limit(10)
			  .exec(function(sampleError, sampleResult){
			
			data.recentSamples = sampleResult;
			
			data.frameworks = result;
			res.render('submitpage', data);
			
		});

	});  
	
};

module.exports.getAllSamples = function(req, res)
{
	
	Sample.find({}, function(error, result){
		res.json(result);
	});
	
};

module.exports.saveSample = function(req, res){
	
	var sample = new Sample(req.body);
	
	//make sure that there have been no more than 5 samples in the past minute
	Sample.find( {date: { $gte : moment().add(-1, 'minutes')} }, function(error, result){
		
		//set lookupTitle
		sample.lookupTitle = sample.title.cleanup();
		
		//see if that title already exists, if do not save
		Sample.find({lookupTitle: sample.lookupTitle}, function(error, result){
			
			if (result.length > 0){
				res.status(409).send('existingTitle');
			}
			
			else
			{
		
			if (result.length <= 5){
				//make new framework if needed
				if (req.body.framework.value === 'new')
				{
					sample.framework = req.body.newFramework;
					FrameworkController.saveFramework(req.body.newFramework, function(result){
						sample.save(function(error, result){
							if (!error)
								res.json(result);
							else
								res.status(500).send(error);
						});
					});
				}
				else
				{
					sample.framework = req.body.framework.name;
					sample.save(function(error, result){
						if (!error)
							res.json(result);
						else
							res.status(500).send(error);
					});				
				}
	
			} else {
				res.status(500).send('server could not save sample');
			}		
		
			}
			
		});
		
	});

	
};

String.prototype.cleanup = function() {
   return this.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-");
}