(function () {
    angular.module('common.services')
        .factory('loginResource', ['$resource', 'CONFIG', loginResourceFunc]);

    function loginResourceFunc($resource, CONFIG) {
        return $resource(CONFIG.url.base + CONFIG.url.login, {}, {
            save: {
                method: 'POST',
                isArray: true
            }
        });
    }
}());
