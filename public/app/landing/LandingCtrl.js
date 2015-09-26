(function(){
'use strict';

var app = angular.module('bidBuilders');

app
  .controller('LandingCtrl', ['$scope', '$state', '$http', function($scope, $state, $http) {	

  	$scope.signup = function(user){
  		$http.post('/signup', 
			{
				"email":user.email,
				"password":user.password,
				"userType":user.userType
			}).then(function(success){
				$state.go('dashboard'); 
			}, function(err){
				if(err) console.log("Signup Error, LandingCtrl: ", err); 
		}); 
  	}; 

}]);
})();