(function(){
'use strict';

var app = angular.module('bidBuilders');

app
  .controller('LoginCtrl', ['$scope', '$http', 'toaster', 
  	function($scope, $http, toaster) {

	toaster.pop('success', "LOGIN", "text");

	$scope.login = function(user){
		LoginService.login(user)
	}

}]);
})();