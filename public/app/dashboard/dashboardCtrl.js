(function(){
'use strict';

var app = angular.module('bidBuilders');

app
  .controller('DashboardCtrl', ['$scope', '$http', '$state', function($scope, $http, $state, ProjectService) {

  	$scope.user = $http.get('/user').then(function(success){
	}, function(err){
		if(err) console.log("get User err: ", err); 
	});

	console.log(user);

  	$scope.createProject = function(project){
  		console.log("Create project"); 
  	}


}]);
})();