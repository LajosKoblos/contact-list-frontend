'use strict';

describe('myApp.contact_list_view', function() {

    var deferred;
    var $mockScope;

    beforeEach(module('myApp.contact_list_view'));
    beforeEach(inject(function ($controller, $rootScope, $q) {
        deferred = $q.defer();
        $mockScope = $rootScope.$new();
    }));

    describe('ContactListViewCtrl', function(){

        it('should use the contactService.getContactsInGroup to list all contacts first name in a certain group', inject(function($controller, $rootScope) {
          // given
          var mockContacts = [{firstname:'testFirstName1'},{firstname:'testFirstName2'}];

          var mockContactService = {
              "getContactsInGroup" : function(){
                  deferred.resolve(mockContacts);
                  return deferred.promise;
              }
          };

          // when
          $controller('ContactListViewCtrl', {'$scope' : $mockScope, 'ContactService' : mockContactService});

          // then
          $rootScope.$apply();
          expect($mockScope.contacts).toBe(mockContacts)


        }));

  });
});

