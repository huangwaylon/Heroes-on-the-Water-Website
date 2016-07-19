(function() {
  angular.module('app.how').controller('profileRouteCtrl',
      ['$scope', '$location', 'AuthService',
      function ($scope, $location, AuthService) {

        $scope.user = {};
        if (AuthService.isLoggedIn()) {
            AuthService.hello($scope.user);
        } else {
          console.log("not logged in!");
          $location.path('/login');
        }

        $scope.update = function () {
          // call logout from service
          AuthService.updateUser($scope.user)
            .then(function () {
              console.log("Success!");
              $location.path('/profile');
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
