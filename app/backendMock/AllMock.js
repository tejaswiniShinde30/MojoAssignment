(function () {
    var allMock = angular.module("allMock", ["ngMockE2E", "ngResource"]);
    
    allMock.constant("API", {
        'login': '/api/login',
        'users': '/api/users',
        'action': '/api/action'
    });
    
    allMock.run(function ($httpBackend, $resource, $filter, API) {
        var token = {
            'jwt_token': 'thisiisdummytoken'
        };
        //List of users in the System
        var users = [{
                "id": 1,
                "role": "user",
                "firstName": "Jon",
                "lastName": "Taylor",
                "username": "jon@rocketmail.com",
                "password": "jon",
                "status": "Active",
                "action": "Block",
                "initiativesFollowed": []
            },
            {
                "id": 2,
                "role": "user",
                "firstName": "Micky",
                "lastName": "Crasta",
                "username": "mickyc@hotmail.com",
                "password": "micky",
                "status": "Active",
                "action": "Block",
                "initiativesFollowed": []
            },
            {
                "id": 3,
                "role": "administrator",
                "firstName": "Administrator",
                "lastName": "",
                "username": "admin@userinitiative.com",
                "password": "admin",
                "status": "Active",
                "action": "Block",
                "initiativesFollowed": []
            },
            {
                "id": 4,
                "role": "user",
                "firstName": "Jony",
                "lastName": "Crasta",
                "username": "jony@hotmail.com",
                "password": "jony",
                "status": "Inactive",
                "action": "Unblock",
                "initiativesFollowed": []
            },
            {
                "id": 5,
                "role": "user",
                "firstName": "Santosh",
                "lastName": "Crasta",
                "username": "santosh@hotmail.com",
                "password": "santosh",
                "status": "Active",
                "action": "Block",
                "initiativesFollowed": []
            },
            {
                "id": 6,
                "role": "user",
                "firstName": "Jake",
                "lastName": "Crasta",
                "username": "jake@hotmail.com",
                "password": "jake",
                "status": "Active",
                "action": "Block",
                "initiativesFollowed": []
            },
            {
                "id": 7,
                "role": "user",
                "firstName": "Mice",
                "lastName": "Crasta",
                "username": "mice@hotmail.com",
                "password": "mice",
                "status": "Active",
                "action": "Block",
                "initiativesFollowed": []
            },
            {
                "id": 8,
                "role": "user",
                "firstName": "Milky",
                "lastName": "Crasta",
                "username": "milky@hotmail.com",
                "password": "milky",
                "status": "Active",
                "action": "Block",
                "initiativesFollowed": []
            },
            {
                "id": 9,
                "role": "user",
                "firstName": "Nick",
                "lastName": "Crasta",
                "username": "nick@hotmail.com",
                "password": "nick",
                "status": "Active",
                "action": "Block",
                "initiativesFollowed": []
            },
            {
                "id": 10,
                "role": "user",
                "firstName": "Micky",
                "lastName": "Crasta",
                "username": "mickyc@hotmail.com",
                "password": "micky",
                "status": "Active",
                "action": "Block",
                "initiativesFollowed": []
            },
            {
                "id": 11,
                "role": "user",
                "firstName": "Amey",
                "lastName": "Kulkarni",
                "username": "amey@hotmail.com",
                "password": "amey",
                "status": "Active",
                "action": "Block",
                "initiativesFollowed": []
            }
        ];
            //Login API
        $httpBackend.whenPOST(API.login).respond(function (method, url, data) {
            var authenticatedUser = [];
            var keepGoing = true;
            var param = JSON.parse(data);
            var authenticationFlag = false;
            var activeFlag = true;
            console.log("users:"+JSON.stringify(users));
            var token = {

                Authorization: "Bearer dummytoken123"

            }
            debugger
            angular.forEach(users, function (user, key) {
                if (keepGoing) {

                    if (param.username == user.username && param.password == user.password) {
                        if (user.status == 'Active') {
                             authenticatedUser.push(user);
                            authenticationFlag = true;
                            activeFlag = true;
                            keepGoing = false;
                            debugger
                        } else {
                            activeFlag = false;
                            authenticationFlag = true;
                        }
                    } else {
                        authenticationFlag = false;
                        debugger
                    }

                }
            });

            if (authenticationFlag) {
                debugger
                return [200, authenticatedUser, token];
            } else {
                return [401, [{
                    "authenticationFlag": authenticationFlag,
                    "activeFlag": activeFlag
                }], token];
            }

        });
            
            //Populate valid Users in the USERS tab of Admin
        $httpBackend.whenPOST(API.users).respond(function (method, url, data) {

            var param = JSON.parse(data);
            var filtered = param.tableState.search.predicateObject ? $filter('filter')(users, param.tableState.search.predicateObject) : users;

            if (param.tableState.sort.predicate) {
                filtered = $filter('orderBy')(filtered, param.tableState.sort.predicate, param.tableState.sort.reverse);
            }

            var result = filtered.slice(param.start, param.start + param.number);
            debugger
            var response = [{
                "data": result,
                "numberOfPages": Math.ceil(filtered.length / param.number)
                }];

            debugger
            return [200, response, ""];

        });
            //API to block and unblock user in Admin
        $httpBackend.whenPOST(API.action).respond(function (method, url, data, headers, params) {

            var keepGoing = true;
            var updateFlag = false;
            var param = JSON.parse(data);
            debugger
            angular.forEach(users, function (user, key) {
                if (keepGoing) {
                    if (param.id == user.id) {
                        debugger
                        if (user.action == "Unblock") {
                            user.action = "Block";
                            user.status = "Active";
                        } else if (user.action == "Block") {
                            user.action = "Unblock";
                            user.status = "Inactive";
                        }
                        updateFlag = true;
                        keepGoing = false;
                        debugger
                    } else {
                        updateFlag = false;
                        debugger
                    }
                }
            });

            if (updateFlag == false) {
                return [404, undefined, {}];
            }

            return [200, "", {}];
        });

        // Passthrough everything
        $httpBackend.whenGET(/[\s\S]*/).passThrough();
    });
})();
