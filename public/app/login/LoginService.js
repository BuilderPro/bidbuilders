	(function(){

'use strict';

var app = angular.module('bidBuilders');

app.service('LoginService', ['$http', '$state', function($http, $state){

	this.login = function(user){
		$http.post('/login', 
		{
			"username": user.email, 
			"password": user.password
		}).then(function(user){
			$state.go('dashboard'); 
		}); 
	}; 

}]);



})();