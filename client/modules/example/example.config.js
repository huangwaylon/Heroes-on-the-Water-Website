(function() {
  angular.module('app.example', ['ngRoute']).config(function($routeProvider) {
    $routeProvider.when('/examples', {
      templateUrl: '/modules/example/views/example.route.html',
      controller: 'ExampleRouteCtrl',
      controllerAs: 'exampleRouteCtrl'
    });
  });
})();
