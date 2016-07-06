'use strict';

angular.module('myApp.groupsContactsShow', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/groups', {
		templateUrl: 'groups_contacts_show/groups_contacts_show.html',
		controller: 'groupsContactsShowCtrl'
	}).when('/groups/:groupId/contacts', {
		templateUrl: 'groups_contacts_show/groups_contacts_show.html',
		controller: 'groupsContactsShowCtrl'
	}).when('/groups/:groupId/contacts/show/:contactId', {
		templateUrl: 'groups_contacts_show/groups_contacts_show.html',
		controller: 'groupsContactsShowCtrl'
	});

}])

.controller('groupsContactsShowCtrl', function ($scope, $routeParams, $location, contactGroupService, contactService) {
	$scope.groups = [];

	contactGroupService.listGroups().then(function (groups) {
		
		$scope.groups = groups;
		$scope.contacts = [];
		$scope.currentGroupId = (!$routeParams.groupId) ? $scope.groups[0].name : $routeParams.groupId;

		contactService.getContactsInGroup($scope.currentGroupId).then(function (contacts) {
			// Creating 'id' property for each contact object
			contacts.forEach( function ( contact ) {
				contact.id = contact._links.self.href.split('/').slice(-1).pop();
			});

			$scope.contacts = contacts;
			$scope.currentContactId = (!$routeParams.contactId) ? $scope.contacts[0].id : $routeParams.contactId;

			var matchedContacts = $scope.contacts.filter( function(contact) {
				return (contact.id === $scope.currentContactId);
			});

			$scope.contact = (matchedContacts.length > 0) ? matchedContacts[0] : null;
			$location.path('/groups/' + $scope.currentGroupId + '/contacts/show/' + $scope.currentContactId);
		});
	});
});