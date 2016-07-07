'use strict';

describe('myApp.authentication', function() {

    var deferred;
    var $mockScope;

    beforeEach(module('myApp.authentication'));
    beforeEach(inject(function($controller, $rootScope, $q ){
        deferred = $q.defer();
        $mockScope = $rootScope.$new();
    }));


    describe('loginController', function() {
        it('should initialize $scope.user.userName and $scope.user.password with empty Strings', inject(function($controller, $rootScope) {
            //When controller is initialized
            var controller = $controller('loginController', {'$scope' : $mockScope, 'authService' : mockAuthService});

            //Then we are expecting an empty user object in the scope with empty userName and password fields
            expect($mockScope.user).toBeDefined();
            expect($mockScope.userName).toEqual("");
            expect($mockScope.password).toEqual("");
        }));

        it('should call authService.login method with the credentials', inject(function($controller, $rootScope) {
            //Given
            var testUser = "test";
            var testPassword = "passwd1";
            var mockCredentials = {userName : testUser, password : testPassword};
            var credentialsReceived = null;
            var mockAuthService = {
                login: function (credentials) {
                    credentialsReceived = credentials;
                    deferred.resolve({tokenId: "ABC123"});
                    return deferred.promise;
                },

                getTokenId: function () {
                    return "ABC123";
                }
            };

            //When controller is initialized
            var controller = $controller('loginController', {'$scope' : $mockScope, 'authService' : mockAuthService});


            // When user enters the credentials and selects Login
            $mockScope.user.userName = mockCredentials.userName;
            $mockScope.user.password = mockCredentials.password;
            $rootScope.login();

            $rootScope.$apply(); // must be here in order to test resolved deferred objects

            //Then we are expecting that the authService.login method shoould be called with the credentials
            expect(credentialsReceived).toEqual(mockCredentials);


        }));
    });
});
