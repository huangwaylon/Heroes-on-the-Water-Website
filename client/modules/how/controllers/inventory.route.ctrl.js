(function() {
  angular.module('app.how').controller('inventoryRouteCtrl',
  ['$scope', '$location', 'InvService', 'AuthService', '$timeout',
  function ($scope, $location, InvService, AuthService, $timeout) {

    // Initialize values
    $scope.removeSuccess = false;
    $scope.addSuccess = false;
    $scope.success = false;
    $scope.error = false;
    $scope.disabled = false;
    $scope.user = {};

    // Check that the user is logged in
    if (!AuthService.isLoggedIn()) {
      $scope.success = false;
      $scope.error = true;
      $scope.errorMessage = "Please sign in!"
    } else {
      AuthService.hello($scope.user);
    }

    $scope.$on("user_loaded", checkUserPermissions);

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

    // Initialize the allItems variable which stores all the inventory items
    $scope.allItems = [];
    // Load up the initial list of existing inventory items
    InvService.all($scope);

    // Add function
    $scope.add = function () {
      InvService.add($scope.itemName,
                    $scope.itemDescription,
                    $scope.itemUsed)
        .then(function () {
          $scope.refresh();
          $scope.addSuccess = true;
          $scope.addMessage = "Added item!";
          $scope.disabled = false;
          $scope.removeSuccess = false;
          $timeout(function () {
            $scope.addSuccess = false;
          }, 2000);
        });
    };

    // Remove item function
    $scope.remove = function (index) {
      var itemToRemove = $scope.allItems[index];
      InvService.remove(itemToRemove._id)
        .then(function () {
          $scope.refresh();
          $scope.removeSuccess = true;
          $scope.removeMessage = "Removed item!";
          $scope.disabled = false;
          $scope.addSuccess = false;
          $timeout(function () {
            $scope.removeSuccess = false;
          }, 2000);
        });
    };

    // Refresh inventory list function
    $scope.refresh = function () {
      InvService.all($scope);
      console.log($scope.allItems);
    };
  }]);
})();
