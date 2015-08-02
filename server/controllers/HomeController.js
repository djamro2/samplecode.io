module.exports.getHomePage = function(req, res){
	
	//data will contain some preloaded data from the server
	var data = {
	  layout: 'home-layout'
	};
	  
	res.render('homepage');
	
};