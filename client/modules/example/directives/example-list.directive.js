(function() {
  angular.module('app.example').directive('exampleList', function() {
    return {
      restrict: 'E',
      templateUrl: '/modules/example/views/example-list.directive.html',
      controller: 'ExampleListDirectiveCtrl',
      controllerAs: 'exampleListDirectiveCtrl'
    };
  });
})();
