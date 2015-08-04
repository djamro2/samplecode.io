
var Framework = require('../models/framework');
var Sample = require('../models/sample');

module.exports.getAllFrameworks = function(req, res)
{
	Framework.find({}, function(error, result){
		res.json(result);
	});
}

module.exports.getFrameworkPage = function(req, res)
{
	
	var frameworkName = req.params.id;
	
	//find the framework, is not found, return an error
	Framework.find({name: frameworkName}, function(error, result){
		if (!error){
			Sample.find({framework: frameworkName}, function(error, result){
				var data = { layout: 'simplelayout', title: frameworkName + ' - Sample Code' };
				data.samples = result;
				res.render('frameworkpage', data);
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