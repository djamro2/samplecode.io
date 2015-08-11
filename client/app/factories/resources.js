/* global angular */
var factories = factories || angular.module('SampleCode.factories', []);

factories.factory('SearchService', function($resource){
	return $resource('/api/search', {}, {
		update: {method: 'PUT'},
		searchAllWithObject: {method: 'POST', url: '/api/search/all', isArray: true},
		searchFrameworkWithObject: {method: 'POST', url: '/api/search/framework', isArray: true}
	});
});

factories.factory('SubmitService', function($resource){
	return $resource('/api/submit', {}, {
		update: {method: 'PUT'}
	});
});

factories.factory('FrameworkService', function($resource){
	return $resource('/api/framework', {}, {
		update: {method: 'PUT'}
	});
});