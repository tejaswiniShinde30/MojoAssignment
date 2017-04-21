(function () {

    'use strict';

    angular.module('userinitiativeApp')
        .controller('PreviewController', PreviewControllerFunction);

    PreviewControllerFunction.$inject = ['$scope', '$state', '$stateParams', 'MyInititivesResource', 'UserResource'];

    function PreviewControllerFunction($scope, $state, $stateParams, MyInititivesResource, UserResource) {
        var self = this;
        self.newInitiative = {};
        self.newInitiative.title = $stateParams.title;
        self.newInitiative.desc = $stateParams.desc;
        self.newInitiative.img = $stateParams.img;
        self.newInitiative.isDeleted = "Delete";
        debugger
        self.cancel = function () {
            UserResource.backUnabled = false;
            $state.go("App.MyInitiative.Dashboard");
        };
        self.share = function () {
            UserResource.backUnabled = false;
            debugger
            MyInititivesResource.addNewInitiative(self.newInitiative).then(function (result) {

                alert("Initiative added successfully");
                $state.go("App.MyInitiative.Dashboard");
            });

        };
        self.gotoPreviousTab = function () {
            UserResource.backUnabled = true;
            $state.go("App.MyInitiative.AddNewInitiative.Advanced", {
                'title': $stateParams.title,
                'desc': $stateParams.desc,
                'img': $stateParams.img
            });
        }
    }
}());
