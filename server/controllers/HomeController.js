module.exports.getHomePage = function(req, res){
	
	//data will contain some preloaded data from the server
	var data = {
	  layout: 'simplelayout',
	  title: 'SampleCode'
	};
	  
	res.render('homepage', data);
	
};