(function () {

    'use strict';

    angular.module('userinitiativeApp')
        .controller('myInitiativesController', myInitiativesController);

    myInitiativesController.$inject = ['$scope', '$state', 'MyInititivesResource','$uibModal'];

    function myInitiativesController($scope, $state, MyInititivesResource,$uibModal) {

        var myInitiativesCtrl = this;
        myInitiativesCtrl.displayed = [];

        myInitiativesCtrl.callServer = function (tableState) {
            myInitiativesCtrl.stState = tableState;
            myInitiativesCtrl.isLoading = true;
            myInitiativesCtrl.noRecords = false;
            var pagination = tableState.pagination;
            var start = pagination.start || 0;
            var number = pagination.number || 10;
            myInitiativesCtrl.stState.sort.predicate ="id";

            MyInititivesResource.getPage(start, number, tableState).then(function (result) {
                myInitiativesCtrl.displayed = result.data;
                debugger
                if (myInitiativesCtrl.displayed.length) {
                    tableState.pagination.numberOfPages = result.numberOfPages;
                    myInitiativesCtrl.isLoading = false;
                } else {
                    myInitiativesCtrl.noRecords = true;
                    myInitiativesCtrl.isLoading = false;
                }
            });
        }


        myInitiativesCtrl.deleteInitiative = function (id) {
            MyInititivesResource.deleteInitiative(id).then(function (result) {
                debugger
                alert("record deleted successfully");
                myInitiativesCtrl.callServer(myInitiativesCtrl.stState);
            });

        }


        myInitiativesCtrl.openPopup = function(ImageData){
            var modalInstance = $uibModal.open({
                templateUrl: '/components/users/popup.html',
                controller: 'popUpController as ctrl',
                resolve:{
                img: function(){
                return ImageData;
            }
            }
            });
        
        };

    }

}());
