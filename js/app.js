'use strict';

var app = angular.module('cmApp', ['ui.bootstrap', 'ngStorage'])

app.config(['$httpProvider', function ($httpProvider) {
	console.log('httpProvider start');
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
	console.log('httpProvider end');
}]);

app.value("token", "");

app.controller('MainCtrl', function($scope, $http, $timeout, $localStorage, $sessionStorage, apiGetToken) {
	console.log('controller start');
	var handleSuccess = function(data, status) {
		$scope.$storage = $sessionStorage.$default({token: data});
		$http.defaults.headers.common['Authorization'] = 'JWT ' + data;
		console.log(data);
	};

	//apiGetToken.getToken($scope.$storage.apikey, $scope.$storage.username, $scope.$storage.password, $scope.$storage.baseUrl).success(handleSuccess);
	console.log('controller end');
});

app.factory('apiGetToken', ['$http', 
	function($http){
		return {
			loadDefaults: function(scope)
			{
				scope.$storage = $localStorage.$default({
					baseUrl: 'http://localhost:14857/',
					apikey:'t1',
					username:'callmineradmin',
					password:'password'
				});
			},
			getToken: function(apikey, username, password, baseUrl){
				return $http.post(baseUrl + 'security/getToken', {
					'apiKey':  apikey
					, 'username': username
					, 'password': password
				})
				.success(function(data, status, headers, config) {
					$http.defaults.headers.common['Authorization'] = 'JWT ' + data;
					return data;
				})
				.error(function(data, status, headers, config) {
					console.log('getToken Error ' + status);
					return status;
				});
			}
		}
	}
]);

app.factory('apiGetScore', ['$http', 'apiGetToken', 
	function($http, apiGetToken){
		console.log('apiGetScore start');
		return {
			getScore: function(apikey, username, password, baseUrl, scorename, scope){
				
				var handleSuccess = function(data, status) {
					$http.defaults.headers.common.Authorization = 'JWT ' + data.replace(/['"]+/g, '');
					return $http.get(baseUrl + 'scores/Last Week/' + scorename)
						.success(function(data, status, headers, config) {
							console.log('data ' + data);
							return data;
						})
						.error(function(data, status, headers, config) {
							console.log('getScore Error ' + status);
						});
				};
				
				apiGetToken.getToken(apikey, username, password, baseUrl).success(handleSuccess);
				
			}
		}
	}
]);

app.directive('cmScore', ['$q','$http','apiGetToken', 'apiGetScore', '$sessionStorage',
	function($q, $http, apiGetToken, apiGetScore, $sessionStorage){
		console.log('cmScore start');
		return {
			restrict: 'A',
			compile: function compile(tElement, tAttrs, transclude) {
				return {
					post: function getScore(scope, iElement, iAttrs) {
						
						var handleSuccess = function(data, status){
							console.log(data);
						};
						
						var deferred = $q.defer();
						deferred.resolve('cool');
						
						// apiGetScore.getScore('t1', 'callmineradmin', 'password', 'http://localhost:14857/', iAttrs.scoreName, scope).success(handleSuccess);
						
						// var handleSuccess = function(data, status) {
							// console.log(data);//why am I getting a token back here and not the object??
						// };
						// var getData = function(){
						// console.log("getData");
							// var deffered = $q.defer();
							// apiGetScore.getScore('t1', 'callmineradmin', 'password', 'http://localhost:14857/', iAttrs.scoreName, scope).success(function(result){
								// deffered.resolve(result);
								// console.log(result);
							// });
							// return deffered.promise;
						// };
						// return { getData: getData};
					}
				}
			},
			link: function(scope, element, attrs){
				var t = attrs.scoreName;
				
			}
		};
		console.log('cmScore end');
	}
]);


var gridster;
 $(function(){
	gridster = $('.gridster > ul').gridster({
		 widget_margins: [10, 10],
		 widget_base_dimensions: [140, 140],
		 min_cols: 6,
		 resize: {
			 enabled: true
		 }
	 }).data('gridster');
});
