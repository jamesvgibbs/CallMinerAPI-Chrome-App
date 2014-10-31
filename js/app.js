'use strict';
angular.module('Eureka.calldetail.services', []);
angular.module('Eureka.call.repositories', []);
angular.module('cmApp',
	['ui.bootstrap', 'ngStorage', 'ngGridster','ReponseInterceptors',
	'Eureka.call.repositories','Eureka.calldetail.services'])
    .config(['$httpProvider', '$logProvider', EurekaConfiguration])
	.controller('MainController', ['$scope','$location', MainCtrl])
    .run(['$rootScope', '$window', RunApp]);
	
function EurekaConfiguration($httpProvider, $logProvider) {
    $logProvider.debugEnabled(true);
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.interceptors.push('httpResponseInterceptor');
}

function RunApp($rootScope, $window) {
    //Add this to have access to a global variable
    $rootScope.API_ADDRESS = window.apiAddress; //global variable
    $window.sessionStorage.token = window.jwtToken;
    $rootScope.appVersion = window.appVersion;
    $rootScope.windowWidth = $window.outerWidth;
}

function MainCtrl($scope, $location) {

	$scope.options = {
        widget_margins: [10, 10],
        widget_base_dimensions: [140, 140],
        helper: 'clone',
        resize: {
          enabled: true,
          axes: ['x', 'y', 'both'],
          max_size: [2, 2]
        }
    };
    
    $scope.items = [1,2,3];
	
};
