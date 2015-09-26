(function(){

'use strict';

var app = angular.module('bidBuilders');

app.service('LoginService', ['$http', function($http){

	this.login = function(user){
		$http.post('/login', 
		{
			"email": user.email, 
			"password": user.password
		})
		.then(function(user){
			toaster.pop('success', "Logged In!", "You have been logged in.")
			$scope.user = user; 
		}, function(err){
			if(err){
				toaster.pop('warning', "Error", "Incorrect email or password"); 
			}
		});
	};


}])



})();