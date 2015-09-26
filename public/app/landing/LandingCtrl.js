(function(){
'use strict';

var app = angular.module('bidBuilders');

app
  .controller('LandingCtrl', ['$scope', '$state', 'LandingService', function($scope, LandingService, $state) {	

  	$scope.signup = function(user){
  		LandingService.signup(user).then(function(success){
  			$state.go('dashboard'); 
  		})
  	}
}]);
})();