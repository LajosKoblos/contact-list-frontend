'use strict';

angular.module('myApp.user_creation', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/user_creation', {
            templateUrl: 'user_creation/user_creation.html',
            controller: 'UserCreationController'
        });
    }])

    .controller('UserCreationController', function ($scope) {
        $scope.username = "";
        $scope.password = "";
        $scope.role = "USER";

        $scope.createUser = function(){
            var userResource = {
                userName : $scope.username,
                password : $scope.password,
                role : $scope.role
            };

            console.log(userResource);
            //UserService.createUser(userResource);
        };
    });