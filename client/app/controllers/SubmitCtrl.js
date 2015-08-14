/* global angular */
'use strict';

var controllers = controllers || angular.module('SampleCode.controllers', []);

controllers.controller('SubmitController', ['$scope', 'SubmitService', 'FrameworkService',
	function($scope, SubmitService, FrameworkService){

	$scope.sample = {};	

	var self = this;
	
	
	self.init = function(){
		//nothing yet
	};
	
	FrameworkService.query(function(result){
		$scope.frameworks = result;
		$scope.frameworks.unshift({
			name: 'Add New Framework',
			value: 'new'
		})
		$scope.sample.framework = $scope.frameworks[1];
	});
	
	$scope.submit = function(submitObj)
	{
		SubmitService.save(submitObj, function(result){
			$scope.submittedCorrect = true;
			$scope.existingTitle = false;
		}, function(error){
			if (error.data == 'existingTitle'){
				$scope.existingTitle = true;
			}
		});
	}
	
	$scope.print = function(thing)
	{
		console.log(thing);
	}
	
	self.init();
	
}]);