(function() {
  var appModule = angular.module('app', ['ngRoute', 'app.how']);


  appModule.config(function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '/home.route.html'
    }).otherwise({
      redirectTo: '/'
    });
  });

  appModule.controller('NavbarCtrl', function($log, $location, galleryImageService) {
    $log.debug('Initializing NavbarCtrl');
    this.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    };
  });
})();
