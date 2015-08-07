
var Framework = require('../models/framework');
var Sample = require('../models/sample');

module.exports.getHomePage = function(req, res){
	
	//data will contain some preloaded data from the server
	var data = {
	  layout: 'simplelayout',
	  title: 'SampleCode'
	};
	
	//need to pass in all frameworks for the sidebar
	Framework.find({}, function(error, result){
		
		Sample.find({})
			  .sort('-date')
			  .limit(10)
			  .exec(function(sampleError, sampleResult){
			
			data.recentSamples = sampleResult;
			
			data.frameworks = result;
			res.render('homepage', data);
			
		});

	});  
	
};

module.exports.searchAll = function(req, res)
{
	
	var query, sortBy, page, amount;

	query = req.body.query;	
	sortBy = req.body.sort || '-date';
	page = req.body.page || 1;
	amount = req.body.amount || 20;
	
	var skipAmt = (page * amount) - amount;
	
	if (!query){
		Sample.find({})
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
		{ $text : { $search : query}}
	)
	.sort(sortBy)
	.skip(skipAmt)
	.limit(amount)
	.exec (function(error, result){
		res.json(result);
	});
	
}