(function () { 

angular.module('userinitiativeApp')
             .controller('popUpController', popUpController);

         popUpController.$inject = ['$scope','$uibModalInstance','img'];
         
         function popUpController($scope, $uibModalInstance, img) {
             
             var popUpController = this;
             popUpController.img = img;
             
             popUpController.ok = function () {
                 debugger    
                 $uibModalInstance.close();
             };
         };
}());