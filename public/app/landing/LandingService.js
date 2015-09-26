(function(){

'use strict';

var app = angular.module('bidBuilders');

app
  .service('LandingService', [function($http) {

  	this.signup = function(user){
	  	$http.post('/signup', 
			{
				"email":user.email,
				"password":user.password,
				"userType":user.userType
			}).then(function(success){
				$state.go('dashboard'); 
			}, function(err){
				if(err) console.log("Signup Error, LandingService: ", err); 
		}); 
  	}; 


}]);
})();