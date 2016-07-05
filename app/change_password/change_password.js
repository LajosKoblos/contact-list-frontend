'use strict';

angular.module('myApp.change_password', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/change_password', {
            templateUrl: 'change_password/change_password.html',
            controller: 'PasswordChangeController'
        });
    }])

    .controller('PasswordChangeController', function ($scope) {

        $scope.old_pass = "";
        $scope.new_pass = "";
        $scope.new_pass1 = "";

        $scope.changePassword = function () {
            console.log("meghivva");
            console.log($scope.old_pass);
            console.log($scope.new_pass);
            console.log($scope.new_pass1);

            var passwordChangeModel = {
                "newPassword": $scope.new_pass,
                "oldPassword": $scope.old_pass
            };

            console.log(passwordChangeModel);

            //UserService.changeUserPassword(passwordChangeModel);
        };
    });