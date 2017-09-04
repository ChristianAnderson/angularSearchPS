// Code goes here
(function(){ 
    
    var app = angular.module("githubViewer");

    var UserController = function( $scope, github, $routeParams ) {
    
      $scope.gotData = false;
      var onUserComplete = function(data){
        $scope.gotData = true;
        $scope.user = data;
        //$http.get($scope.user.repos_url)
        github.getRepos($scope.user).then(onRepos, onError);
      };
      
      var onRepos = function(data){
        $scope.repos = data;
        $location.hash("userDetails");
        $anchorScroll();
      }
      
      var onError = function(reason){
        $scope.error = "Could not fetch the data";
      };
      
      $scope.updateOrderRepo = function(orderParameter){
        $scope.orderRepo = orderParameter;
      };
      
      $scope.username = $routerParams.username;
      $scope.orderRepo = "+name";
      
      
    };
    
    app.controller("UserController", UserController);
    
  })();
  