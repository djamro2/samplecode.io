
var Framework = require('../models/framework');
var Sample = require('../models/sample');

module.exports.getAllFrameworks = function(req, res)
{
	Framework.find({}).sort('name').exec(function(error, result){
		res.json(result);
	});
}

module.exports.getFrameworkPage = function(req, res)
{
	
	var frameworkName = req.params.id;
	
	//find the framework, is not found, return an error
	Framework.find({name: frameworkName}, function(frameworkError, frameworkResult){
		if (!frameworkError){
			Sample.find({framework: frameworkName})
				  .sort('title') //get alphabetical order for frameworks
				  .exec(function(error, result){
				
				var data = { layout: 'simplelayout', title: frameworkName + ' - Sample Code' };
				data.samples = result;
				
				//will call Sample.find again to resort, and get last ten
				//is inefficient, change later
				Sample.find({framework: frameworkName})
					  .sort('-date')
					  .limit(10)
					  .exec(function(sampleError, sampleResult){
					
					data.recentSamples = sampleResult;
					res.render('frameworkpage', data);
					
				});
			
			});
		} else {
			var data = { layout: 'simplelayout', title: 'error' };
			res.render('There was an error finding this framework/language');
		}
	});
	
}

module.exports.saveFramework = function(frameworkName, callback)
{
	//need to put the name into an object, and pass that object into Framework()
	var frameworkObj = {}; 
	frameworkObj.name = frameworkName;
	
	var framework = new Framework(frameworkObj);
	framework.save(function(error, result){
		callback(result);
	});
}