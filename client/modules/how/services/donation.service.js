(function() {
    angular.module('app.how').service('donationService',['$log', '$http', '$q', '$rootScope',
        function($log, $http, $q, $rootScope) {
            // return available functions for use in the controllers
            return ({
                addDonor: addDonor,
                all: all
            });

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
                $http.post('/donors/add', donation)
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
            }

            function all(scope) {
                return $http.get('/donors/all').then(function(response) {
                    scope.allDonors = response.data;
                    console.log(response.data);
                    broadcast();
                });
            }

            function broadcast() {
                $rootScope.$broadcast("donors_loaded");
            }
        }
      ]);
})();
