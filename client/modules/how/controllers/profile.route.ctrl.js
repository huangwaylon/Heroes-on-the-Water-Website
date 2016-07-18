(function() {
  angular.module('app.how').controller('profileRouteCtrl',
      ['$scope', '$location', 'AuthService',
      function ($scope, $location, AuthService) {

        if (AuthService.isLoggedIn()) {
            console.log("logged in!");
            $scope.user = {};
            $scope.user.firstname = "John";
            $scope.user.lastname = "Doe";
            $scope.user.email = "johndoe2016@gmail.com";
            $scope.user.disabilities = "None";
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
