(function(){
'use strict';

var app = angular.module('bidBuilders');

app
  .controller('LandingCtrl', [function($scope,LandingService) {

  	var user = {};

  	$scope.signup = function(user){
  		LandingService.signup(user); 
  	}
    


}]);
})();