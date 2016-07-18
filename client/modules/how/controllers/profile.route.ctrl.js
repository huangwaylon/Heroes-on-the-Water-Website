(function() {
  angular.module('app.how').controller('profileRouteCtrl',
      ['$scope', '$location', 'AuthService',
      function ($scope, $location, AuthService) {

        if (AuthService.isLoggedIn()) {
            console.log("logged in!");
        } else {
          console.log("not logged in!");
          $location.path('/login');
        }

        $scope.update = function () {
          // call logout from service
          AuthService.logout()
            .then(function () {
              $location.path('/login');
            });
        };

        $scope.logout = function () {
          // call logout from service
          AuthService.logout()
            .then(function () {
              $location.path('/');
            });
        };
    }]);
})();
