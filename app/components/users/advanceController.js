(function () {

    'use strict';

    angular.module('userinitiativeApp')
        .controller('AdvanceController', AdvanceController);

    AdvanceController.$inject = ['$scope', '$state', '$stateParams', 'MyInititivesResource', 'fileReader'];

    function AdvanceController($scope, $state, $stateParams, MyInititivesResource, fileReader) {
        var self = this;
        var basicInfo = {
            'title': $stateParams.title,
            'desc': $stateParams.desc
        };

        if (MyInititivesResource.backUnabled) {
            self.imageSrc = $stateParams.img;
            self.filename = $stateParams.img;
            debugger
        }
        //to go to next tab
        self.gotoNextTab = function () {
            $state.go("App.MyInitiative.AddNewInitiative.Preview", {
                'title': basicInfo.title,
                'desc': basicInfo.desc,
                'img': basicInfo.img
            });
        }
        // To go to previous tab
        self.gotoPreviousTab = function () {
            MyInititivesResource.backUnabled = true;
            $state.go("App.MyInitiative.AddNewInitiative.Basic", {
                'title': basicInfo.title,
                'desc': basicInfo.desc,
                'img': basicInfo.img
            });
        }

        //for image operation
        $scope.getFile = function () {
            fileReader.readAsDataUrl($scope.file, $scope)
                .then(function (result) {
                    self.imageSrc = result;
                    if ($stateParams.img) {
                        basicInfo.img = $stateParams.img;
                        debugger
                    } else {
                        basicInfo.img = self.imageSrc;
                        debugger
                    }

                    debugger
                });
        };

    }

}());
