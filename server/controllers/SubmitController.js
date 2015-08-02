module.exports.getSubmitPage = function(req, res){
	
	//data will contain some preloaded data from the server
	var data = {
	  layout: 'simplelayout',
	  title: 'Submit a SampleCode'
	};
	  
	res.render('submitpage', data);
	
};