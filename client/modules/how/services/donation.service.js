(function() {
  angular.module('app.how').service('donationService', function($log, $http, $q) {
    $log.debug('Initializing donationService');

    var self = this;

    this.donors = [];

    this.getDonors = function() {
      $log.debug('Entering donationService.getDonors');

      var defer = $q.defer();

    $http.get('/donors/').then(
        function(response) {
          $log.debug('getDonors resolve', response);
          self.donors = response.data;
          defer.resolve(response);
        },
        function(error, status) {
          $log.$log('getDonors reject', error, status);
          defer.reject(error, status);
        },
        function(progress) {
          $log.debug('postDonor notify', error, status);
          defer.notify(progress);
        });

      return defer.promise;
    };
    
    this.getDonors();
  });
})();