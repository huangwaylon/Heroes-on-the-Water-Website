(function() {
  angular.module('app.how').controller('donationRouteCtrl',
      function($log, $scope, donationService, AuthService, $location) {
        // Array to store all the donors
        $scope.allDonors = [];
        donationService.all($scope);

        // Initialize scope variables
        $scope.success = false;
        $scope.error = false;
        $scope.errorMessage = "";
        $scope.user = {};

        // Check that the user is logged in
        if (AuthService.isLoggedIn()) {
            AuthService.hello($scope.user);
        } else {
          $scope.success = false;
          $scope.error = true;
          $scope.errorMessage = "Not an Administrator!";
        }

        // Set listeners
        $scope.$on("user_loaded", checkUserPermissions);
        $scope.$on("user_login", setLogin);

        // Check user permissions
        function checkUserPermissions() {
          if ($scope.user.account && ($scope.user.account == "Administrator" ||
                                      $scope.user.account == "Region Leader" ||
                                      $scope.user.account == "Chapter Leader")) {
            $scope.success = true;
            $scope.error = false;
          } else {
            $scope.success = false;
            $scope.error = true;
            $scope.errorMessage = "Not an Administrator!";
          }
        }
        // After login, get user info again - happens on refresh
        function setLogin() {
          // Get user details after login
          AuthService.hello($scope.user);
        }

        // Function to add the new donor
        $scope.addDonor = function() {

          // Store the new donor's information
          var currDonor = {
            firstname: $scope.firstname,
            lastname: $scope.lastname,
            email: $scope.email,
            phone: $scope.phone,
            donation: $scope.donation,
            address: $scope.address,
            city: $scope.city,
            zip: $scope.zip,
            state: $scope.state,
            country: $scope.country,
            comment: $scope.comment
          };

          // Add the new donor to the array
          $scope.allDonors.push(currDonor);
          console.log(currDonor);
          donationService.addDonor(currDonor);
          console.log("Updated array " + $scope.allDonors.toString());
        };
      });
})();
