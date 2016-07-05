'use strict';

var authentication = angular.module('myApp.authentication', ['ngRoute']);

authentication.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/authentication_view/login.html',
            controller: 'loginController'
        })
        .when('/logout', {
            templateUrl: '/authentication_view/login.html',
            controller: 'loginController'
        })
        //.otherwise({redirectTo: '/'});
});

authentication.controller('loginController', function ($scope, $location/*, AuthenticationService*/) {
    $scope.user = {username: '', password: ''};

    $scope.users = [
        {username: "user1", password: "passwd", token: "UserToken"},
        {username: "cheatUser", password: "cheating",  token: "cheatUserToken"},
        {username: 'admin', password: "adminpasswd", token: "adminUserToken"}
        ];


    $scope.login = function(){
        var current = {};
        for (var i in $scope.users){
            if ($scope.users[i].username == $scope.user.username && $scope.users[i].password == $scope.user.password)
                current = $scope.users[i];
        }
        console.log(current);
        if (current !== {}){
            alert("logged in");
            $scope.tokenID = current.token;
            $scope.loginError = false;
            $location.path('/users');
        }else{
            $scope.loginError = true;
        }
    }

    $scope.logout = function(){
        $scope.user = {username : '', password : ''};
        $scope.loginError = false;
        $scope.tokenID = '';
        $location.path('/');
    }
});

/*
authentication.factory('AuthenticationService', function($resource){
   return $resource('AuthenticationService');
});
*/