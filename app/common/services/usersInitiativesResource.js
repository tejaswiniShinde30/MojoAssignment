(function () {
    angular.module('common.services')
        .factory('UserInitiativesResource', UserInitiativesResource);

    UserInitiativesResource.$inject = ['$q', '$filter', '$timeout'];

    function UserInitiativesResource($q, $filter, $timeout) {

        var randomsItems = [];

        function createRandomItem(id) {
            var title = ['Batman', 'Superman', 'Robin', 'Thor', 'Hulk', 'Niki Larson', 'Stark', 'Bob Leponge'];
            var desc = ['Batman', 'Superman', 'Robin', 'Thor', 'Hulk', 'Niki Larson', 'Stark', 'Bob Leponge'];
            var img = ['../../images/initiative-2.jpg', '../../images/initiative-3.jpg', '../../images/initiative-4.png', '../../images/initiative-5.png'];
            return {
                id: id,
                title: title[Math.floor(Math.random() * 7)],
                desc: desc[Math.floor(Math.random() * 7)],
                img: img[Math.floor(Math.random() * 4)],
                noOfUsersFollowing: Math.floor(Math.random() * 10000),
                status: "Follow"
            };

        }

        function followInitiative(id) {
            var deferred = $q.defer();
            angular.forEach(randomsItems, function (item, key) {
                if (item.id == id) {
                    debugger
                    if (item.status == "Follow") {
                        item.status = "Unfollow";
                    } else {
                        item.status = "Follow";
                    }
                    deferred.resolve("Success");
                }
            });
            return deferred.promise;
        }

        for (var i = 1; i < 21; i++) {
            randomsItems.push(createRandomItem(i));
        }
        debugger

        //fake call to the server, normally this service would serialize table state to send it to the server (with query parameters for example) and parse the response
        //in our case, it actually performs the logic which would happened in the server
        function getPage(start, number, params) {

            var deferred = $q.defer();

            var filtered = params.search.predicateObject ? $filter('filter')(randomsItems, params.search.predicateObject) : randomsItems;

            if (params.sort.predicate) {
                filtered = $filter('orderBy')(filtered, params.sort.predicate, params.sort.reverse);
            }

            var result = filtered.slice(start, start + number);

            $timeout(function () {
                //note, the server passes the information about the data set size
                deferred.resolve({
                    data: result,
                    numberOfPages: Math.ceil(filtered.length / number)
                });
            }, 1500);


            return deferred.promise;
        }

        return {
            getPage: getPage,
            followInitiative: followInitiative
        };
    }

}());
