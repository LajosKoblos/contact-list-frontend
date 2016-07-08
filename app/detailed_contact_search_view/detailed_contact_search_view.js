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
                // console.log(response);
                $scope.currentGroupId = $scope.responseContacts[0].name;

                if ($scope.responseContacts.length > 0) {
                    $scope.responseContact = $scope.responseContacts[0];
                    $scope.responseContact.id = $scope.responseContact._links.self.href.split('/').slice(-1).pop();
                    $scope.currentGroupId = $scope.responseContacts[0].name;
                }
            });
        };

        $scope.refreshContact = function (responseContact) {
            $scope.responseContact = responseContact;
            $scope.currentGroupId = $scope.responseContact.name;
        }

    });