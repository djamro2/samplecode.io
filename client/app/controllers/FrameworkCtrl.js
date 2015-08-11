/* global moment */
/* global angular */
'use strict';

var controllers = controllers || angular.module('SampleCode.controllers', []);

controllers.controller('FrameworkController', ['$scope', 'SubmitService', 'FrameworkService', 'SearchService',
	function($scope, SubmitService, FrameworkService, SearchService){

	var self = this;
	
	$scope.search = {};
	
	self.init = function(){
		//nothing right now
	};
	
	$scope.getFormattedDate = function(date){
		var formattedDate = moment( new Date(date)).format("MM/DD/YYYY");
		return formattedDate;
	}
	
	$scope.searchAll = function(searchObj)
	{
		//uses a post to pass in an object to search the database
		SearchService.searchFrameworkWithObject(searchObj, function(result){
			$scope.searchResult = result;
		});
	}
	
	
	self.init();
	
}]);