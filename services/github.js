(function(){  // 1
    
    var github = function ($http){ // 2
      
      var getUser = function(username){ // 3 
        return  $http.get("https://api.github.com/users/" + username)  
                     .then(function(response){
                       return response.data; // regresa la data directamente asi que solo tienes que instanciarla
                     });
      };
      
      var getRepos = function(user){
        return  $http.get(user.repos_url)
                      .then(function(response){
                        return response.data;
                      });
      };

      var getRepoData = function(username, reponame){ // 3 
        return  $http.get("https://api.github.com/repos/"+ username +"/" + reponame)  
                     .then(function(response){
                       return response.data; // regresa la data directamente asi que solo tienes que instanciarla
                     });
      };

      var getContributors = function(contributors_url){
        return $http.get(contributors_url)
                    .then(function(response){
                      return response.data;
                    });
      };

      return{
        getUser: getUser,
        getRepos: getRepos,
        getRepoData: getRepoData,
        getContributors: getContributors
      };
      
    };
    
    // Dear Angular please give me a reference to githubViewer
    var module = angular.module("githubViewer");
    // Register your service  on your angular app.
    module.factory("github", github);  
})();