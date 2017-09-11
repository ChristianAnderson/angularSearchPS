// Code goes here
(function(){ 
    
    var app = angular.module("githubViewer");

    var RepoController = function( $scope, github, $routeParams ) {
    
      
    //   var onRepoComplete = function(data){
    //     $scope.repo = data;
    //     github.getRepoData($scope.repo).then(onRepoComplete, onError);
    //   };
      
      var onRepoComplete = function(data){
        $scope.repo = data;
        github.getContributors($scope.repo.contributors_url).then(onContributorsComplete, onError);
      }
      
      var onContributorsComplete = function(data){
          $scope.contributors = data;
      }

      var onError = function(reason){
        $scope.error = "Could not fetch the data";
      };
      
      //Get the Repo variable from the routeParams service which provide us any param from the url
      $scope.reponame = $routeParams.reponame;
      $scope.username = $routeParams.username;
      // use  the service to look up for the name in the service :P
      github.getRepoData($scope.username, $scope.reponame).then(onRepoComplete, onError);
      
    };
    
    app.controller("RepoController", RepoController);
    
  })();
  