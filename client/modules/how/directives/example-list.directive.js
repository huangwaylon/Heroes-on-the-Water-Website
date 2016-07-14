(function() {
  angular.module('app.how').directive('exampleList', function() {
    return {
      restrict: 'E',
      templateUrl: '/modules/how/views/example-list.directive.html',
      controller: 'ExampleListDirectiveCtrl',
      controllerAs: 'exampleListDirectiveCtrl'
    };
  });
})();
