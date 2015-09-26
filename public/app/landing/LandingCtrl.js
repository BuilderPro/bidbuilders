(function(){

'use strict';

var app = angular.module('bidBuilders');

app
  .controller('LandingCtrl', [function($scope, LandingService) {

  $scope.signup=function(user){
  	LandingService.signup(user);
  }

}]);
})();