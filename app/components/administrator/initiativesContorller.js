(function () {

    'use strict';

    angular.module('userinitiativeApp')
        .controller('initiativesController', initiativesController);

    initiativesController.$inject = ['$scope', '$state', 'AllInititivesResource','$uibModal'];

    function initiativesController($scope, $state, AllInititivesResource,$uibModal) {

        var initiativesCtrl = this;
        initiativesCtrl.displayed = [];

        initiativesCtrl.callServer = function (tableState) {
            initiativesCtrl.stState = tableState;
            initiativesCtrl.isLoading = true;
            initiativesCtrl.noRecords = false;
            var pagination = tableState.pagination;
            var start = pagination.start || 0;
            var number = pagination.number || 10;
            initiativesCtrl.stState.sort.predicate = "id";


            AllInititivesResource.getPage(start, number, tableState).then(function (result) {
                initiativesCtrl.displayed = result.data;
                if (initiativesCtrl.displayed.length) {
                    tableState.pagination.numberOfPages = result.numberOfPages;
                    initiativesCtrl.isLoading = false;
                } else {
                    initiativesCtrl.noRecords = true;
                    initiativesCtrl.isLoading = false;
                }
            });
        }

        initiativesCtrl.deleteInitiative = function (id) {
            AllInititivesResource.deleteInitiative(id).then(function (result) {
                
                 alert("record deleted successfully");
                initiativesCtrl.callServer(initiativesCtrl.stState);

            });
             

        }
        
        initiativesCtrl.openPopup = function(ImageData){
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
