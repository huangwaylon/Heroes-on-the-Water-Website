(function() {
  var appModule = angular.module('app', ['ngRoute', 'app.how', 'xeditable']);

  appModule.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
  });

  appModule.config(function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '/home.route.html'
    }).otherwise({
      redirectTo: '/'
    });
  });

  appModule.controller('NavbarCtrl', function($log, $location, $scope, AuthService) {
    $scope.user = {};
    if (AuthService.isLoggedIn()) {
        AuthService.hello($scope.user);
    }
    this.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    };
  });
})();
