'use strict';

angular.module('myApp.user_list', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/user_list', {
            templateUrl: 'user_list/user_list.html',
            controller: 'UserListController'
        });
    }])

    .controller('UserListController', function ($scope) {
        $scope.users = [
            {"username": "andras", "group": "teszt"},
            {"username": "david", "group": "alma"},
            {"username": "miki", "group": "banana"},
        ];
    });