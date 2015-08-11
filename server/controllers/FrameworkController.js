
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
					data.framework = frameworkName;
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

module.exports.searchFramework = function(req, res)
{
	
	var query, sortBy, page, amount, framework;

	query = req.body.query;	
	sortBy = req.body.sort || '-date';
	page = req.body.page || 1;
	amount = req.body.amount || 20;
	framework = req.body.framework;
	
	var skipAmt = (page * amount) - amount;
	
	if (!query){
		Sample.find({framework: framework})
		.sort(sortBy)
		.limit(amount)
		.exec (function(error, result){
			res.json(result);
		});
		return;
	}
	
	if (sortBy == 'relevance')
	{
		//needs query to work
		if(!query)
		{
			res.status(500).send('Needs query to sort by relevance');
		}
		
		Sample.find(
			{ $text : { $search : query}},
			{ score : { $meta : "textScore"}}
		)
		.sort({ score: { $meta : 'textScore'} })
		.skip(skipAmt)
		.limit(amount)
		.exec (function(error, result){
			res.json(result);
		});
		return;
	}
	
	Sample.find(
		{ $text : { $search : query}, 
		  framework : framework }
	)
	.sort(sortBy)
	.skip(skipAmt)
	.limit(amount)
	.exec (function(error, result){
		res.json(result);
	});
	
}