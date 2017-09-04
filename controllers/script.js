// Code goes here
(function(){
  
  var app = angular.module("githubViewer", []);
  
  var MainController = function(
                        $scope, github, 
                        $interval, $log, 
                        $anchorScroll, $location
                      ) {
  
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
    
    var decrementCountdown = function(){
      $scope.countdown -=1;
      if ($scope.countdown < 1) {
        $scope.search($scope.username);
      }
      
    }
    
    var countdownInterval = null;
    var startCountdown = function(){
      countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
    }
    
    $scope.search = function(username){
      $log.info("Searching for " + username);
      //$http.get("https://api.github.com/users/" + username)
      github.getUser(username).then(onUserComplete, onError); // Here we call our service
      if (countdownInterval) {
        $interval.cancel(countdownInterval);
        $scope.countdown = null;
      }
    }
    
    $scope.updateOrderRepo = function(orderParameter){
      $scope.orderRepo = orderParameter;
    };
    
    $scope.username = "angular";
    $scope.message = "Hello, User!";
    $scope.orderRepo = "+name";
    $scope.countdown = 5;
    startCountdown();
    
    
  };
  
  app.controller("MainController", MainController);
  
})();
