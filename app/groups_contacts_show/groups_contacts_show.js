'use strict';

angular.module('myApp.groupsContactsShow', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/groups', {
		templateUrl: 'groups_contacts_show/groups_contacts_show.html',
		controller: 'groupsContactsShowCtrl'
	}).when('/groups/:groupId/contacts', {
		templateUrl: 'groups_contacts_show/groups_contacts_show.html',
		controller: 'groupsContactsShowCtrl'
	}).when('/groups/:groupId/contacts/:action', {
		templateUrl: 'groups_contacts_show/groups_contacts_show.html',
		controller: 'groupsContactsShowCtrl'
	}).when('/groups/:groupId/contacts/:action/:contactId', {
		templateUrl: 'groups_contacts_show/groups_contacts_show.html',
		controller: 'groupsContactsShowCtrl'
	});
}])

.controller('groupsContactsShowCtrl', function ($scope,$rootScope, $routeParams, $location, contactGroupService, contactService) {
	$scope.errors = null;
	$scope.groups = [];
	$scope.state = ([ 'show', 'edit', 'new' ].indexOf($routeParams.action) !== -1) ? $routeParams.action : 'show';

	contactGroupService.listGroups().then(function (groups) {

		$scope.groups = groups.sort(function(a,b){return a.displayName.localeCompare(b.displayName);});

		$scope.contacts = [];
        $scope.contact={};
        if (groups.length > 0) {
            $scope.currentGroupId = (!$routeParams.groupId) ? $scope.groups[0].name : $routeParams.groupId;
			
			var matchedGroups = $scope.groups.filter(function (group) {
				return (group.name === $scope.currentGroupId);
			});

			$scope.currentGroup = (matchedGroups.length > 0) ? matchedGroups[0] : {};
		contactService.getContactsInGroup($scope.currentGroupId).then(function ( contacts ) {
			// Creating 'id' property for each contact object
			contacts.forEach( function ( contact ) {
                contact.id = contact.links[0].href.split('/').slice(-1).pop();
			});

			$scope.contacts = contacts.sort(function(a,b){return a.firstName.localeCompare(b.firstName);});
            if (contacts.length > 0) {

                $scope.currentContactId = (!$routeParams.contactId && $scope.state !== 'new') ? $scope.contacts[0].id : $routeParams.contactId;

                var matchedContacts = $scope.contacts.filter(function (contact) {
                    return (contact.id === $scope.currentContactId);
                });

                $scope.contact = (matchedContacts.length > 0) ? matchedContacts[0] : {};

                switch ($scope.state) {
                    case 'new':
                        $location.path('/groups/' + $scope.currentGroupId + '/contacts/' + $scope.state);
                        break;
                    default:
                        $location.path('/groups/' + $scope.currentGroupId + '/contacts/' + $scope.state + '/' + $scope.currentContactId);
                }
            }
            else
            {
                $scope.currentContactId = null;
            }
		});
        }
        else {
            $scope.contacts = [];
            $scope.currentGroupId = null;
            $scope.currentContactId = null;
        }
	});

	$scope.createContact = function() {
		contactService.addContactToGroup($scope.currentGroupId, $scope.contact).then(function ( response ) {
			$location.path('/groups/' + $scope.currentGroupId + '/contacts/');
		}, function ( errorResponse ) {
			$scope.errors = errorResponse.fields;
		});
	};

	$scope.editContact = function() {
		if ($scope.currentContactId && $scope.currentGroupId) {
			var contact = {
				firstName: $scope.contact.firstName,
				lastName: $scope.contact.lastName,
				workEmail: $scope.contact.workEmail,
				nickName: $scope.contact.nickName,
				jobTitle: $scope.contact.jobTitle
			}

			contactService.updateContact($scope.currentGroupId, $scope.currentContactId, contact).then(function (response) {
				$location.path('/groups/' + $scope.currentGroupId + '/contacts/show/' + $scope.currentContactId);
			}, function (errorResponse) {
				$scope.errors = errorResponse.fields;
			});
		}else {
			console.log("No group or contact selected");
		}
	};

    $scope.deleteContact = function (contactId) {
		if ($scope.currentContactId && $scope.currentGroupId) {
			if (window.confirm("Are you sure you want to delete " + $scope.contact.firstName + " " + $scope.contact.lastName + "?")) {
				contactService.deleteContact($scope.currentGroupId, contactId).then(function (response) {
					$location.path('/groups/' + $scope.currentGroupId + '/contacts/');
				}, function (response) {
					console.log(response)
				});
			}
		} else {
			console.log("No group or contact selected");
		}
    };
});