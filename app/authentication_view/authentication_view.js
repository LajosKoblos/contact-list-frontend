'use strict';
var authentication = angular.module('myApp.authentication', ['ngRoute', 'authServiceModule']);
authentication.config(function ($routeProvider) {
    $routeProvider.when('/login', {
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
authentication.controller('loginController', function ($scope, $rootScope, $location, authService, Auth) {
    $scope.user = {userName: '', password: ''};
    $rootScope.userName=""
    $scope.error = '';
    $scope.login = function () {
        authService.login($scope.user).then(
         function (result) {
             Auth.setRole(result.role);
             var path = (result.role == 'USER') ? "/groups" : "/users";
             $location.path(path);
             console.log(result);
             $scope.error = '';
             $rootScope.userName=$scope.user.userName;
         },
         function(error){
             if (error.status == 401) {
                 $scope.error = error;
             }
             if (error.status == 500){
                 $scope.error = error;
             }
             console.log(error);
         });
        console.log("login");
    }


    $scope.logout = function () {
        authService.logout();
        $scope.user = {userName: '', password: ''};
        $scope.loginError = false;
        $scope.tokenID = '';
        $location.path('/login');
    }
});
