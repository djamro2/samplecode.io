'use strict';

var controllers = controllers || angular.module('SampleCode.controllers', []);

controllers.controller('SubmitController', ['$scope', 'SubmitService', 
	function($scope, SubmitService){

	var self = this;
	
	self.init = function(){
		//nothing yet	
	};
	
	$scope.submit = function(submitObj)
	{
		SubmitService.save(submitObj);
	}
	
	self.init();
	
}]);