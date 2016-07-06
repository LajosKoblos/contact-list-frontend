'use strict';

angular.module('myApp.new_contact_group_view', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/groups/new', {
            templateUrl: 'new_contact_group_view/new_contact_group_view.html',
            controller: 'newContactGroupViewCtrl'
        });
    }])

    .controller('newContactGroupViewCtrl', function ($scope, contactGroupService) {





        //
        // console.log("newContactGroupView controller online!")
        // $scope.contactGroups = [];
        // $scope.new_contact_group = "";
        // $scope.status = "";


        $scope.createNewContactGroup = function (new_contact_group) {

            // console.log("newContactGroupViewCtrl createNewContactGroup function ")

            var newGroup = contactGroupService.createGroup("newName", "new_contact_group").then(function (data) {
                // $scope.groups = data;

                console.log(newGroup);
                console.log(new_contact_group);
            });

            // if (!$scope.new_contact_group) {
            //     $scope.status = "Name missing";
            //     return
            // }
            //
            // if ($scope.contactGroups.indexOf($scope.new_contact_group) == -1) {
            //     $scope.contactGroups.push($scope.new_contact_group);
            //     $scope.status = "New Contact Group created with name: " + $scope.new_contact_group;
            //     setTimeout($scope.goToNewlyCreatedContactGroup,1500);
            //
            // }
            // else {
            //     $scope.status = "A contact group already exists with this name: " + $scope.new_contact_group;
            // }
        }

        // $scope.goToNewlyCreatedContactGroup = function () {
        //     window.location.href = "index.html"
        // }


    });