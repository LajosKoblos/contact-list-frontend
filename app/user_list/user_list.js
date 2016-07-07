'use strict';

angular.module('myApp.user_list', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/user_list', {
            templateUrl: 'user_list/user_list.html',
            controller: 'UserListController'
        });
    }])
    .controller('UserListController', function ($scope, userService) {
        userService.getUsers()
            .then(function (users) {
                $scope.users = users;
            }, function (error) {
                $scope.errors = {
                    message: error.message
                };
            });
    });