(function(){
'use strict';

var app = angular.module('bidBuilders');

app
  .controller('DashboardCtrl', ['$scope', '$http', '$state', function($scope, $http, $state, ProjectService) {

  	$http.get('/user').then(function(user){
  		$scope.user = user.data; 
	}, function(err){
		if(err) console.log("get User err: ", err); 
	});

    $http.get('/projects').then(function(projects){
    	$scope.projects = projects.data; 
    }); 


}]);
})();