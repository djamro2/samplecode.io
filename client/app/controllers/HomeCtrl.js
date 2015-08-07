/* global moment */
/* global angular */
'use strict';

var controllers = controllers || angular.module('SampleCode.controllers', []);

controllers.controller('HomeController', ['$scope', 'SubmitService', 'FrameworkService', 'SearchService',
	function($scope, SubmitService, FrameworkService, SearchService){

	var self = this;
	
	
	self.init = function(){
		//nothing yet
	};
	
	$scope.getFormattedDate = function(date){
		var formattedDate = moment( new Date(date)).format("MM/DD/YYYY hh:mma");
		return formattedDate;
	}
	
	$scope.searchAll = function(searchObj)
	{
		//uses a post to pass in an object to search the database
		SearchService.searchAllWithObject(searchObj, function(result){
			$scope.searchResult = result;
		});
	}
	
	
	self.init();
	
}]);