/* global angular */
'use strict';

var controllers = controllers || angular.module('SampleCode.controllers', []);

controllers.controller('HomeController', ['$scope', 'SubmitService', 'FrameworkService', 'SearchService',
	function($scope, SubmitService, FrameworkService, SearchService){

	var self = this;
	
	
	self.init = function(){
		//nothing yet
	};
	
	$scope.search = function(search)
	{
		//uses a post to pass in an object to search the database
		SearchService.findWithObject(search, function(result){
			//nothing here yet
		});
	}
	
	
	self.init();
	
}]);