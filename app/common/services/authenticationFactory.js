(function () {
    var services = angular.module("common.services");
    services.factory("authenticationFactory", ['$injector', 'loginResource', 'libFactory', '$rootScope', 'authTokenFactory', authenticationService]);

    function authenticationService($injector, loginResource, libFactory, $rootScope, authTokenFactory) {


        function login(username, password) {
            console.log(loginResource);
            return loginResource.save({
                username: username,
                password: password
            }, function success(response, headers) {
                debugger
                authTokenFactory.setUserDetails(response[0].toJSON());

            }, function error(response) {
                debugger
            }).$promise;
        }

        function logout() {
            try {
                authTokenFactory.reset();

            } catch (error) {}

        }

        function getUserDetails() {
            return authTokenFactory.getUserDetails();
        }

        function resetLocalStorage() {
            try {
                authTokenFactory.reset();
            } catch (error) {}

        }

        return {
            login: login,
            logout: logout,
            getUserDetails: getUserDetails,
            resetLocalStorage: resetLocalStorage
        };
    }
}());
