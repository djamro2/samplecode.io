
var Sample = require('../models/sample');

module.exports.getSamplePage = function(req, res)
{
	
	var samplePage = req.params.id;
	
	Sample.findOne( {lookupTitle: samplePage}, function(error, result) {
		if (result) {
			
			var pageTitle = samplePage + ' - SampleCode';
			
			var data = {
				layout: 'simplelayout',
				title: pageTitle
			}
			
			data.sample = result;
			
			Sample.find({ framework: result.framework}, function(errorAllSamples, resultAllSamples){
				data.allSamples = resultAllSamples;
				res.render('samplepage', data);
			});
			
		} else {
			res.send('Could not find the sample: ' + samplePage);
		}
	});

}