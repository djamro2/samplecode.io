
var Framework = require('../models/framework');

module.exports.getAllFrameworks = function(req, res)
{
	Framework.find({}, function(error, result){
		res.json(result);
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