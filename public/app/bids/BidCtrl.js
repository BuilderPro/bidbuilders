(function(){
'use strict';

var app = angular.module('bidBuilders');

app
  .controller('BidCtrl', ['$scope', '$http', 
  	function($scope, $http) {

  	console.log("BidCtrl works"); 

  	$http.get('/projects').then(function(projects){
  		$scope.projectList = projects.data; 
  		console.log("projectList", projectList)
  	})

  	$http.get('/bids').then(function(bids){
  		$scope.bids = bids.data; 
  		console.log(bids); 
  	});

  	$scope.createBid = function(bid){
  		$http.post('/bid', {
  			"project_id": bid.projectId,
			"owner": bid.owner,
			"amount": bid.amount
		}).then(function(bid){
			console.log('bid created', bid); 
			$state.go('bids'); 
		})
  	}

}]);
})();