(function() {
    var services = angular.module("common.services");
    services.factory("authTokenFactory", ['$localStorage', 'libFactory', '$rootScope', authTokenFac]);

    function authTokenFac($localStorage, libFactory, $rootScope) {

        function getToken() {
            return $localStorage.token;

        }

        function setToken(token) {
            if (token) {
                $localStorage.token = token;
            } else {
                delete $localStorage.token;
            }
        }

        function getUserDetails() {
            debugger
            return $localStorage.user;

        }

        function setUserDetails(user) {
            if (!libFactory._.isEmpty(user)) {
                debugger;
                $localStorage.user = user;
            } else {
                delete $localStorage.user;
            }
        }

        function reset() {
            $localStorage.$reset();
        }

        return {
            getToken: getToken,
            setToken: setToken,
            setUserDetails: setUserDetails,
            getUserDetails: getUserDetails,
            reset: reset
        };
    }
}());
