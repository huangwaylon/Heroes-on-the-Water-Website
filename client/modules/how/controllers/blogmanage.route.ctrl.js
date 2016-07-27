(function() {
  angular.module('app.how').controller('blogManageRouteCtrl',
  ['$scope', '$location', 'BlogService', 'AuthService', '$timeout',
  function ($scope, $location, BlogService, AuthService, $timeout) {

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

    $scope.$on("user_loaded", setUserVariables);
    $scope.$on("user_login", setLogin);

    function setUserVariables() {
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
      $scope.author = $scope.user.firstname + " " + $scope.user.lastname;

      var date = new Date();
      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();
      var monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      $scope.today = day + " " + monthNames[monthIndex] + " " + year;
    }

    // After login, get user info again - happens on refresh
    function setLogin() {
      // Get user details after login
      AuthService.hello($scope.user);
    }

    // Initialize the allItems variable which stores all the blog items
    $scope.allItems = [];
    // Load up the initial list of existing blog items
    BlogService.all($scope);

    // Add blog function
    $scope.add = function () {
      BlogService.add($scope.b_title,
                    $scope.b_body,
                    $scope.author,
                    $scope.today)
        .then(function () {
          $scope.refresh();
          $scope.addSuccess = true;
          $scope.addMessage = "Blog item posted!";
          $scope.disabled = false;
          $scope.removeSuccess = false;
          $timeout(function () {
            $scope.addSuccess = false;
          }, 2000);
        });
      $scope.b_title = "";
      $scope.b_body = "";
    };

    // Remove blog item function
    $scope.remove = function (index) {
      var itemToRemove = $scope.allItems[index];
      BlogService.remove(itemToRemove._id)
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

    // Refresh blog list function
    $scope.refresh = function () {
      BlogService.all($scope);
    };
  }]);
})();
