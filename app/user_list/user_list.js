'use strict';

angular.module('myApp.user_list', ['ngRoute'])
    .service('UserService', function () {
        return {
            getUsers: function () {
                var deferred = $q.deferred;

                angular.timeout(function () {
                    deferred.resolve([
                        {"userName": "andras", "role": "ADMIN"},
                        {"userName": "david", "role": "USER"}
                    ]);
                }, 500);

                return deferred.promise;
            }
        };
    })
    .factory('alma', function () {
        return {'alma': "haho"};
    })
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/user_list', {
            templateUrl: 'user_list/user_list.html',
            controller: 'UserListController'
        });
    }])

    .controller('UserListController', function ($scope, UserService) {
        UserService.getUsers()
            .then(function (users) {
                $scope.users = users;
            }, function (error) {
                $scope.errors = {
                    message: error.message
                };
            });
    });