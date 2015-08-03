'use strict';

var controllers = controllers || angular.module('SampleCode.controllers', []);

controllers.controller('SubmitController', ['$scope', 'SubmitService', 'FrameworkService',
	function($scope, SubmitService, FrameworkService){

	var self = this;
	
	self.init = function(){
		
	};
	
	FrameworkService.query(function(result){
		$scope.frameworks = result;
		$scope.frameworks.unshift({
			name: 'Add New Framework',
			value: 'new'
		})
		$scope.sample.framework = $scope.frameworks[1];
		console.log($scope.frameworks);
	});
	
	$scope.submit = function(submitObj)
	{
		SubmitService.save(submitObj, function(result){
			$scope.submittedCorrect = true;
		}, function(error){
			
		});
	}
	
	self.init();
	
}]);