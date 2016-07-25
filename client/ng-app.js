(function() {
  var appModule = angular.module('app', ['ngRoute', 'app.how', 'xeditable']);

  appModule.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
  });


  appModule.config(function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '/home.route.html',
    }).otherwise({
      redirectTo: '/'
    });
  });

  appModule.controller('NavbarCtrl', function($log, $location, $scope, AuthService) {
    $scope.user = {};
    $scope.notLoggedIn = true;

    $scope.call = function () {
      console.log("Call me!");
    }

    $scope.$on("user_login", setLogin);
    $scope.$on("user_logout", setLogout);
    $scope.$on("user_loaded", getUserInfo);

    function setLogin() {
      $scope.notLoggedIn = false;
    }

    function setLogout() {
      $scope.notLoggedIn = true;
    }

    function getUserInfo() {

    }

    this.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    };
  });
})();
