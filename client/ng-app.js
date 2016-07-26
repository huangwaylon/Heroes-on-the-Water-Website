(function() {
  var appModule = angular.module('app', ['ngRoute', 'app.how', 'xeditable']);

  appModule.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
  });

  appModule.config(function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '/home.route.html',
    }).otherwise({
      // Prevent user from going to an unindexed subdomain
      redirectTo: '/'
    });
  });

  // Navigation bar controller
  appModule.controller('NavbarCtrl', function($log, $location, $scope, AuthService) {
    $scope.user = {};
    $scope.notLoggedIn = true;
    $scope.isAdmin = false;

    // Set listeners for user login, logout, and load
    $scope.$on("user_login", setLogin);
    $scope.$on("user_logout", setLogout);
    $scope.$on("user_loaded", getUserInfo);

    function setLogin() {
      $scope.notLoggedIn = false;
      // Get user details after login
      AuthService.hello($scope.user);
    }

    function setLogout() {
      $scope.notLoggedIn = true;
    }

    // Checks the user's information
    function getUserInfo() {
      if ($scope.user.account && $scope.user.account != "Administrator") {
        $scope.isAdmin = false;
      } else {
        $scope.isAdmin = true;
      }
    }

    $scope.logoutUser = function () {
      AuthService.logout().then(function () {
        $location.path('/');
      });
    }

    this.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    };
  });
})();
