(function() {
  angular.module('app.how').controller('blogRouteCtrl',
  ['$scope', '$location', 'BlogService', '$timeout',
  function ($scope, $location, BlogService, $timeout) {

    // Initialize the allItems variable which stores all the blog items
    $scope.allItems = [];
    // Load up the initial list of existing blog items
    BlogService.all($scope);
    sortPostsByDate();

    // Refresh blog list function
    $scope.refresh = function () {
      BlogService.all($scope);
      sortPostsByDate();
    };

    function sortPostsByDate() {
      $scope.allItems.sort(sortByDate);
    }

    // Sorting function
    function sortByDate(a, b) {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }

  }]);
})();
