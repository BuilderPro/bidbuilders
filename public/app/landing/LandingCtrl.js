(function(){
'use strict';

var app = angular.module('bidBuilders');

app
  .controller('LandingCtrl', ['$scope', '$state', '$http', 'toaster', 
  		function($scope, $state, $http, toaster) {	

  	$scope.signup = function(user){
  		$http.post('/signup', 
			{
				"email":user.email,
				"password":user.password,
				"userType":user.userType
			}).then(function(success){
				$state.go('dashboard'); 
			}, function(err){
				toaster.pop('danger', "Error!", "That email already exists!");
				if(err) console.log("That email already exists", err); 
		}); 
  	}; 

}]);
})();