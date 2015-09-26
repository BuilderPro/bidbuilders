(function(){
'use strict';

var app = angular.module('bidBuilders');

app
  .controller('DashboardCtrl', ['$scope', '$http', '$state', 'userResolve', function($scope, $http, $state, ProjectService, userResolve) {

  	$http.get('/user').then(function(user){
  		$scope.user = user; 
	}, function(err){
		if(err) console.log("get User err: ", err); 
	});
	
    console.log("DashboardCtrl");


}]);
})();