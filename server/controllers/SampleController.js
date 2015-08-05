
var Sample = require('../models/sample');

module.exports.getSamplePage = function(req, res)
{
	
	var samplePage = req.params.id;
	
	Sample.findOne( {title: samplePage}, function(error, result){
		if (!error){
			
			var data = {
				layout: 'simplelayout',
				title: samplePage
			}
			
			data.sample = result;
			
			Sample.find({ framework: result.framework}, function(errorAllSamples, resultAllSamples){
				data.allSamples = resultAllSamples;
				res.render('samplepage', data);
			});
			
		} else {
			res.render('Could not find that sample!');
		}
	});

}