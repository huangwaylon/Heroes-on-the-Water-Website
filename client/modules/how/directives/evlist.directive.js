(function() {
  angular.module('app.how').directive('evList', function() {
    return {
      restrict: 'E',
      templateUrl: '/modules/how/views/event-list.directive.html',
      controller: 'evlistRouteCtrl',
      controllerAs: 'evlistCtrl'
    };
  });
})();
