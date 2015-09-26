	(function(){

'use strict';

var app = angular.module('bidBuilders');

app.service('LoginService', ['$http', function($http){

	this.login = function(user){
		$http.post('/login', 
		{
			"username": user.email, 
			"password": user.password
		}); 
	}; 


}]);



})();