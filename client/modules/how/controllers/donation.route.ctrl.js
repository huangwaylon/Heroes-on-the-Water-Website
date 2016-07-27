(function() {
  angular.module('app.how').controller('donationRouteCtrl',
      function($log, $scope, donationService) {
        $log.debug('Initializing donationRouteCtrl');

        var self = this;

        $scope.allDonors = [];

        $scope.addDonor = function() {
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
          allDonors.push(currDonor);
          donationService.addDonor(currDonor);
        };
      });
})();
