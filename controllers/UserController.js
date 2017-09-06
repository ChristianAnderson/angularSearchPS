// Code goes here
(function(){ 
    
    var app = angular.module("githubViewer");

    var UserController = function( $scope, github, $routeParams ) {
    
      $scope.gotData = false;
      var onUserComplete = function(data){
        $scope.gotData = true;
        $scope.user = data;
        github.getRepos($scope.user).then(onRepos, onError);
      };
      
      var onRepos = function(data){
        $scope.repos = data;
      }
      
      var onError = function(reason){
        $scope.error = "Could not fetch the data";
      };
      
      $scope.updateOrderRepo = function(orderParameter){
        $scope.orderRepo = orderParameter;
      };
      
      $scope.username = $routeParams.username;
      $scope.orderRepo = "+name";
      github.getUser($scope.username).then(onUserComplete, onError);
      
    };
    
    app.controller("UserController", UserController);
    
  })();
  