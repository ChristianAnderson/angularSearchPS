// Code goes here
(function(){

    var app = angular.module("githubViewer");

    var UserController = function( $scope, github, $routeParams, $location ) {

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

      $scope.repoView = function(repo){
        $location.path("/repo/" + $scope.username + "/" + repo.name);
        // $location.path("/user/" + username);
      };


      //Get the username variable from the routeParams service which provide us any param from the url
      $scope.username = $routeParams.username;
      $scope.orderRepo = "+name";
      // use  the service to look up for the name in the service :P
      github.getUser($scope.username).then(onUserComplete, onError);

    };

    app.controller("UserController", UserController);

  })();
