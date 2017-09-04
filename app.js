(function(){
    
    var app = angular.module("githubViewer", ["ngRoute"]);

    app.config( function($routeProvider){
        // Here is where the route code goes.
        $routeProvider
            .when("/main", {
                templateUrl: "includes/main.html",
                controller: "MainController"
            })
            .when("/user/:username", {
                templateUrl: "includes/user.html",
                controller: "UserController"
            })
            .otherwise({
                redirectTo: "/main"
            });
    });
}());