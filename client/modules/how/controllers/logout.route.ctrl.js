(function() {
  angular.module('app.how').controller('logoutCtrl',
    ['$scope', '$location', 'AuthService',
    function ($scope, $location, AuthService) {

      if (AuthService.isLoggedIn()) {
        logout();
      } else {
        logout();
      }

      $scope.logout = function () {
        // call logout from service
        AuthService.logout()
          .then(function () {
            $location.path('/');
          });
      };
  }]);
})();
