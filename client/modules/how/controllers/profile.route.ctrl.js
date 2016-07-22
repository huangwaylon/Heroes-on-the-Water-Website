(function() {
  angular.module('app.how').controller('profileRouteCtrl',
      ['$scope', '$location', 'AuthService',
      function ($scope, $location, AuthService) {

        // Initialize values
        $scope.error = false;
        $scope.success = false;
        $scope.disabled = false;
        $scope.user = {};

        // Check that the user is logged in
        if (AuthService.isLoggedIn()) {
            AuthService.hello($scope.user);
        } else {
          $location.path('/login');
        }

        $scope.update = function () {
          // call logout from service
          AuthService.updateUser($scope.user)
            .then(function () {
              $scope.success = true;
              $scope.successMessage = "Successfully updated profile!";
              $scope.disabled = false;
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
