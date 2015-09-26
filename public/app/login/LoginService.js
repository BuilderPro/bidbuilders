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
			$state.go('dashboard'); 
		}, function(err){
			if(err) console.log("LoginService Error: ", err); 
		});
	};


}]);



})();