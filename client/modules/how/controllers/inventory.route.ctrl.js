(function() {
  angular.module('app.how').controller('inventoryRouteCtrl',
  ['$scope', '$location', 'InvService', 'AuthService',
  function ($scope, $location, InvService, AuthService) {

    // Initialize values
    $scope.removeSuccess = false;
    $scope.addSuccess = false;
    $scope.disabled = false;
    $scope.user = {};

    // Check that the user is logged in
    if (!AuthService.isLoggedIn()) {
      $location.path('/login');
    } else {
      AuthService.hello($scope.user);
    }

    $scope.$on("user_loaded", checkUserPermissions);

    function checkUserPermissions() {
      if ($scope.user.account && $scope.user.account != "Administrator") {
        console.log("Not an Administrator!");
        $location.path('/login');
      }
    }

    // Initialize the allItems variable which stores all the inventory items
    $scope.allItems = [];
    // Load up the initial list of existing inventory items
    InvService.all($scope);

    // Add function
    $scope.add = function () {
      console.log("Add");
      InvService.add($scope.itemName,
                    $scope.itemDescription,
                    $scope.itemUsed)
        .then(function () {
          $scope.refresh();
          $scope.addSuccess = true;
          $scope.addMessage = "Added item!";
          $scope.disabled = false;
          $scope.removeSuccess = false;
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
        });
    };

    // Refresh inventory list function
    $scope.refresh = function () {
      InvService.all($scope);
      console.log($scope.allItems);
    };
  }]);
})();
