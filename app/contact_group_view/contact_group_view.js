'use strict';

angular.module('myApp.contactGroupView', ['ngRoute', 'contactGroupServiceModule'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/groups', {
            templateUrl: 'contact_group_view/contact_group_view.html',
            controller: 'GroupsCtrl'
        }).when('/groups/:groupId/contacts', {
            templateUrl: 'contact_group_view/contact_group_view.html',
            controller: 'GroupsCtrl'
        })
    }])

    .controller('GroupsCtrl', function ($scope, $routeParams, contactGroupService, contactService) {
        $scope.groups=[];
        contactGroupService.listGroups().then(function (data) {
            $scope.groups = data;
        });

        $scope.contactList = [];
        if(!$routeParams.groupId){
            $scope.currentGroupId=$scope.groups[0].name;    
        } else {
            $scope.currentGroupId=$routeParams.groupId;
        }
        contactService.getContactsInGroup($scope.currentGroupId).then(function (data) {
            $scope.contactList = data

        });



    });
