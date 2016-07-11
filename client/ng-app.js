(function() {
  var appModule = angular.module('app', ['ngRoute', 'app.how']);

  appModule.config(function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '/home.route.html'
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'loginController',
      access: {restricted: false}
    })
    .when('/logout', {
      controller: 'logoutController',
      access: {restricted: true}
    })
    .when('/register', {
      templateUrl: 'partials/register.html',
      controller: 'registerController',
      access: {restricted: false}
    })
    .when('/one', {
      template: '<h1>This is page one!</h1>',
      access: {restricted: true}
    })
    .when('/two', {
      template: '<h1>This is page two!</h1>',
      access: {restricted: false}
    })
    .otherwise({
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
