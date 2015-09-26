(function(){
'use strict';

var app = angular.module('bidBuilders');

app
  .controller('LoginCtrl', ['$scope', '$http', 'toaster', 'LoginService', 
  	function($scope, $http, toaster, LoginService) {

	$scope.login = function(user){
		LoginService.login(user);
	};

}]);
})();