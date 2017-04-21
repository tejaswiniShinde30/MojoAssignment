(function () {
    angular.module('common.services')
        .factory('UserResource', ['$resource', 'CONFIG', UserResource]);

    function UserResource($resource, CONFIG) {
        debugger
        return {

            'userList': $resource(CONFIG.url.base + CONFIG.url.users, {}, {
                getUsers: {
                    method: 'POST',
                    isArray: true
                }
            }),
            'adminAction': $resource(CONFIG.url.base + CONFIG.url.adminAction, {}, {
                updateAction: {
                    method: 'POST',
                    isArray: true
                }
            })
        };
    }
}());
