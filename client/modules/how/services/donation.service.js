(function() {
    angular.module('app.how').service('donationService',
        function($log, $http, $q) {
            //$log.debug('Initializing donationService');

            // return available functions for use in the controllers
            return ({
                addDonor: addDonor
            });

            var self = this;

            // Function responsible for adding the new donor.
            function addDonor(newDonor) {
                // New instance of defer
                var deferred = $q.defer();

                // Collect the information of the donor.
                var donation = {
                    firstname: newDonor.firstname,
                    lastname: newDonor.lastname,
                    email: newDonor.email,
                    phone: newDonor.phone,
                    donation: newDonor.donation,
                    address: newDonor.address,
                    city: newDonor.city,
                    zip: newDonor.zip,
                    state: newDonor.state,
                    country: newDonor.country,
                    comment: newDonor.comment
                };

                // Send a post request to the server for the new donor.
                $http.post('/', donation)
                    .success(function(data, status) {
                        console.log(data);
                        // Handle success
                        if (status == 200 && data.status) {
                            deferred.resolve();
                        } else {
                            deferred.reject();
                        }
                    })
                    // Handle error
                    .error(function(data) {
                        deferred.reject()
                    });
                // Return promise object
                return deferred.promise;
            };

            /* this.getDonors = function(scope) {
                $log.debug('Entering donationService.getDonors');

                var defer = $q.defer();

                 $http.get('/donors').then(
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
                  return $http.get('/donors').then(function(response) {
                    scope.allDonors = response.data;
                  });
                ); */
        });
})();
