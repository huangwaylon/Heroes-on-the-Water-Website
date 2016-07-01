(function() {
  angular.module('app', ['ngRoute', 'app.example']).config(function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '/home.route.html'
    }).otherwise({
      redirectTo: '/'
    });
  });
})();
