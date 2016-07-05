'use strict';

angular.module('myApp.new_contact_group_view', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/new_contact_group_view', {
            templateUrl: 'new_contact_group_view/new_contact_group_view.html',
            controller: 'newContactGroupViewCtrl'
        });
    }])

    .controller('newContactGroupViewCtrl', function ($scope) {
        console.log("newContactGroupView controller online!")
        $scope.contactGroups = [];
        $scope.new_contact_group = "";
        $scope.status = "";


        $scope.createNewContactGroup = function () {

            if (!$scope.new_contact_group) {
                $scope.status = "Name missing";
                return
            }

            if ($scope.contactGroups.indexOf($scope.new_contact_group) == -1) {
                $scope.contactGroups.push($scope.new_contact_group);
                $scope.status = "New Contact Group created with name: " + $scope.new_contact_group;
                setTimeout($scope.goToNewlyCreatedContactGroup,1500);

            }
            else {
                $scope.status = "A contact group already exists with this name: " + $scope.new_contact_group;
            }
        }

        $scope.goToNewlyCreatedContactGroup = function () {
            window.location.href = "index.html"
        }


    });