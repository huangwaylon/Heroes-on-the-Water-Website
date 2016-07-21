(function() {
  angular.module('app.how').controller('inventoryRouteCtrl',
  ['$scope', '$location', 'InvService',
  function ($scope, $location, InvService) {

    // Initialize the allItems variable which stores all the inventory items
    $scope.allItems = [];
    InvService.all($scope);

    // Add function
    $scope.add = function () {
      console.log("Add");
      InvService.add($scope.itemName,
                    $scope.itemDescription,
                    $scope.itemUsed)
        .then(function () {
          $scope.refresh();
        });
    };

    // Remove item function
    $scope.remove = function (index) {
      var itemToRemove = $scope.allItems[index];
      InvService.remove(itemToRemove._id)
        .then(function () {
          $scope.refresh();
        });
    };

    // Refresh inventory list function
    $scope.refresh = function () {
      InvService.all($scope);
      console.log($scope.allItems);
    };
  }]);
})();
