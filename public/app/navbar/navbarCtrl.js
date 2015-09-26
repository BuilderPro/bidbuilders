(function(){
'use strict';

var app = angular.module('bidBuilders');

app
  .controller('NavbarCtrl', ['$scope', '$state', '$http', 
  		function($scope, $state, $http) {	

  	$http.get('/user').then(function(user){
  		$scope.user = user.data; 
  		return user.data; 
  	})

}]);
})();