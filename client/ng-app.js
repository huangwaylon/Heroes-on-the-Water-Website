(function() {
  var appModule = angular.module('app', ['ngRoute', 'app.example']);

  appModule.config(function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '/home.route.html'
    }).otherwise({
      redirectTo: '/'
    });
  });

  appModule.controller('NavbarCtrl', function($log, $location) {
    $log.debug('Initializing NavbarCtrl');

    this.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    };
  });
})();
