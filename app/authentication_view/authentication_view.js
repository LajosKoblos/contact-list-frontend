'use strict';
var authentication = angular.module('myApp.authentication', ['ngRoute', 'authServiceModule']);

authentication.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '/authentication_view/login.html',
        controller: 'loginController'
    });
    $routeProvider.when('/users', {
        templateUrl: '/user_view/users.html',
        controller: 'userController',
        loginRequired: true
    });
    $routeProvider.when('/logout', {
        //templateUrl: '/authentication_view/login.html',
        controller: 'loginController'
    });

});

authentication.run(function ($location, $rootScope, Auth) {
    $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {
        console.log("nextRoute: " + nextRoute);
        console.log("currentRoute: " + currentRoute);
        //$location.path(nextRoute).replace();
    })
});


authentication.controller('loginController', function ($scope, $rootScope, $location, $httpWithProtection, authService) {
    $scope.user = {userName: '', password: ''};
    /*

     $scope.users = [
     {username: "user1", password: "passwd", token: "UserToken"},
     {username: "cheatUser", password: "cheating", token: "cheatUserToken"},
     {username: 'admin', password: "adminpasswd", token: "adminUserToken"}
     ];
     */

    $scope.login = function () {
        //authService.login($scope.user)
        authService.login($scope.user.userName, $scope.user.password)
            .then(function (result) {
                console.log(result);

                //var nextpath = (result.Role == 'USER') ? "/groups" : "/users";
                $rootScope.userRole = '';
                $location.path(path);
                // $scope.loginError = false;
            }, function (error) {
                console.log("exception" + error);
                $rootScope.error = error;
            });
    }

    $scope.logout = function () {
        authService.logout();
        $scope.user = {userName: '', password: ''};
        $scope.loginError = false;
        $scope.tokenID = '';
        $location.path('/');
    }
});
