(function () {

  angular.module('common.services')
         .directive('errorMsg', ErrorMsgDirective);

  function ErrorMsgDirective() {
    return {
      restrict: "AE",
      templateUrl: "common/error/ErrorMsgView.html",
      controller: function() {},
      scope: {
        formElement: '<',
        customMsg : '<'
      }
    };
  }
})();
