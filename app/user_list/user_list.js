'use strict';

angular.module('myApp.user_list', ['ngRoute','userServiceModule'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/user_list', {
            templateUrl: 'user_list/user_list.html',
            controller: 'UserListController'
        });
    }])

    .controller('UserListController', function ($scope,userService) {
        userService.getUsers().then(function(data){
            $scope.users = data;
            console.log($scope.users);
        });

        /*$scope.users = [
            {"username": "andras", "group": "teszt"},
            {"username": "david", "group": "alma"},
            {"username": "miki", "group": "banana"},
        ];*/
    });