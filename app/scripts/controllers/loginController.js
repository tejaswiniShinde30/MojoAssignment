(function () {

    'use strict';

    angular.module('userinitiativeApp')
        .controller('LoginController', LoginControllerFunction);

    LoginControllerFunction.$inject = ['$scope', '$state', 'authenticationFactory', 'libFactory', 'authTokenFactory'];

    function LoginControllerFunction($scope, $state, authenticationFactory, libFactory, authTokenFactory) {
        debugger
        var self = this;
        self.login = login;

        function login() {
            debugger
            self.isSigningIn = true;
            self.loginFailed = false;
            self.blockedUser = false;
            libFactory.progressBar.start();
            authenticationFactory.login(self.credentials.username, self.credentials.password).then(function success(response) {
                self.isSigningIn = false;
                self.user = authTokenFactory.getUserDetails();
                debugger
                libFactory.progressBar.complete();
                if (self.user.role == 'user') {
                    debugger
                    $state.go("App.UsersInitiative");
                } else if (self.user.role == 'administrator') {
                    debugger
                    $state.go("App.AllInitiative");
                }


            }, function error(response) {
                debugger;
                libFactory.progressBar.complete();
                self.isSigningIn = false;
                if (!response.data[0].authenticationFlag) {
                    self.loginFailed = true;
                }else if (!response.data[0].activeFlag) {
                    self.blockedUser = true;
                } 
            });
        }
    }
}());
