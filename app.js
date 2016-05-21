var app = angular.module('myDemoApp', ['ngRoute', 'angularWidgets'])

.config(['$routeProvider', function($routeProvider){

    $routeProvider.when('/home', {
      templateUrl: "views/home.html",
      controller: 'homeController'
    })
    .otherwise({redirectTo : '/home'});
}])
