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
	$scope.groups = [];
	$scope.state = ([ 'show', 'edit', 'new' ].indexOf($routeParams.action) !== -1) ? $routeParams.action : 'show';

	contactGroupService.listGroups().then(function (groups) {

		$scope.groups = groups;
		$scope.contacts = [];
        $scope.contact={};
		$scope.currentGroupId = (!$routeParams.groupId) ? $scope.groups[0].name : $routeParams.groupId;

		contactService.getContactsInGroup($scope.currentGroupId).then(function ( contacts ) {
			// Creating 'id' property for each contact object
			contacts.forEach( function ( contact ) {
                contact.id = contact.links[0].href.split('/').slice(-1).pop();
			});

			$scope.contacts = contacts;
			$scope.currentContactId = (!$routeParams.contactId && $scope.state !== 'new') ? $scope.contacts[0].id : $routeParams.contactId;

			var matchedContacts = $scope.contacts.filter( function ( contact ) {
				return (contact.id === $scope.currentContactId);
			});

			$scope.contact = (matchedContacts.length > 0) ? matchedContacts[0] : {};

			switch( $scope.state ) {
				case 'new':
					$location.path('/groups/' + $scope.currentGroupId + '/contacts/' + $scope.state);
					break;
				default:
					$location.path('/groups/' + $scope.currentGroupId + '/contacts/' + $scope.state + '/' + $scope.currentContactId);
			}
			
		});
	});

	$scope.createContact = function() {

		contactService.addContactToGroup($scope.currentGroupId, $scope.contact).then(function ( response ) {
			$location.path('/groups/' + $scope.currentGroupId + '/contacts/');
		}, function(response) {console.log(response)});
	};

	$scope.editContact = function() {

        var contact = { firstName: $scope.contact.firstName, lastName: $scope.contact.lastName, workEmail: $scope.contact.workEmail, nickName: $scope.contact.nickName, jobTitle: $scope.contact.jobTitle}

        contactService.updateContact($scope.currentGroupId,$scope.currentContactId, contact).then(function ( response ) {
			$location.path('/groups/' + $scope.currentGroupId + '/contacts/show/' + $scope.currentContactId);
		}, function(response) {console.log(response)});
	};

	$scope.deleteContact = function( contactId ) {

		contactService.deleteContact($scope.currentGroupId, contactId).then(function( response ) {
			$location.path('/groups/' + $scope.currentGroupId + '/contacts/');
		}, function(response) {console.log(response)});
	};
});