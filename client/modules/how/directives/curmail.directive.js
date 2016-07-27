(function() {
  angular.module('app.how').directive('curMail', function() {
    return {
      restrict: 'E',
      templateUrl: '/modules/how/views/curmail.directive.html',
      controller: 'curmailRouteCtrl',
      controllerAs: 'curmailCtrl'
    };
  });
})();
