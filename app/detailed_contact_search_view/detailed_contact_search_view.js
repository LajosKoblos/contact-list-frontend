/**
 * Created by 212564432 on 7/7/2016.
 */

'use strict';

angular.module('myApp.contactDetailedSearch', ['ngRoute', 'contactServiceModule'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/search', {
            templateUrl: 'detailed_contact_search_view/detailed_contact_search_view.html',
            controller: 'contactDetailedSearchCtrl'
        });
    }])

    .controller('contactDetailedSearchCtrl', function ($scope, $routeParams, $location, contactGroupService, contactService) {

        $scope.detailedSearch = function () {
            contactService.getContactByExample('dummyGroupIdNotNeeded', $scope.contact).then(function (response) {

                $scope.responseContacts = response;
                $scope.responseContacts.forEach(function(contact){contact.id = contact._links.self.href.split('/').slice(-1).pop();});

                // console.log(response);
                $scope.currentGroupId = $scope.responseContacts[0].name;

                if ($scope.responseContacts.length > 0) {
                    $scope.responseContact = $scope.responseContacts[0];
                     $scope.currentGroupId = $scope.responseContacts[0].name;
                }
            });
        };

        $scope.refreshContact = function (newResponseContact) {
            console.log($scope.responseContacts);
            $scope.responseContact = newResponseContact;
            $scope.currentContactId = $scope.responseContact.id;
            // console.log($scope.responseContacts);
            // console.log($scope.responseContact);
            // console.log($scope.currentContactId);
        }

    });