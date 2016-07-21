(function() {
  angular.module('app.how').controller('inventoryRouteCtrl',
  ['$scope', '$location', 'InvService',
  function ($scope, $location, InvService) {

    $scope.allItems = InvService.all();

    $scope.add = function () {
      console.log("Add");
      InvService.add($scope.itemName,
                    $scope.itemDescription,
                    $scope.itemUsed)
        .then(function () {
          console.log("Success!");
          $scope.refresh();
        });
    };

    $scope.remove = function () {
    };

    $scope.refresh = function () {
      $scope.allItems = InvService.all();
    };

  }]);
})();
