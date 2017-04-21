(function () {

    'use strict';

    angular.module('userinitiativeApp')
        .controller('usersController', usersController);

    usersController.$inject = ['$scope', '$state', 'UserResource'];

    function usersController($scope, $state, UserResource) {

        var usersCtrl = this;
        

        usersCtrl.callServer = function callServer(tableState) {
            usersCtrl.stState = tableState;
            usersCtrl.isLoading = true;
            usersCtrl.noRecords = false;
            var pagination = tableState.pagination;
            var start = pagination.start || 0;
            var number = pagination.number || 10;
            usersCtrl.stState.sort.predicate = "id";
            
            UserResource.userList.getUsers({
                start: start,
                number: number,
                tableState: tableState
            }, function success(response, headers) {
                usersCtrl.displayed = [];
                debugger
                angular.forEach(response[0].data,function(user,key){
                    if(user.role == "user"){
                        debugger
                        usersCtrl.displayed.push(user);
                    }
                });
                if (usersCtrl.displayed.length) {
                    tableState.pagination.numberOfPages = response[0].numberOfPages;
                    usersCtrl.isLoading = false;
                    usersCtrl.noRecords = false;
                } else {
                    debugger
                    usersCtrl.noRecords = true;
                    usersCtrl.isLoading = false;
                }

            }, function error(response) {

            })

        }

        usersCtrl.adminAction = function (id) {

            UserResource.adminAction.updateAction({
                id: id
            }, function success(response) {
                usersCtrl.callServer(usersCtrl.stState);

            }, function error(response) {
                debugger
            })

        }


    }

}());
