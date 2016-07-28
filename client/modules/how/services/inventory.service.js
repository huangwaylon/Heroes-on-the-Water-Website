(function() {
    angular.module('app.how').factory('InvService', ['$q', '$timeout', '$http', '$rootScope',
        function($q, $timeout, $http, $rootScope) {
            // return available functions for use in the controllers
            return ({
                add: add,
                remove: remove,
                all: all,
                update: update,
                broadcast: broadcast
            });

            function add(name, description, chapter, events, isUsed) {
                // create a new instance of deferred
                var deferred = $q.defer();

                // send a post request to the server
                $http.post('/inventory/add', {
                        i_name: name,
                        i_description: description,
                        i_chapter: chapter,
                        i_events: events,
                        i_isUsed: isUsed
                    })
                    // handle success
                    .success(function(data, status) {
                        if (status === 200 && data.status) {
                            deferred.resolve();
                        } else {
                            deferred.reject();
                        }
                    })
                    // handle error
                    .error(function(data) {
                        deferred.reject();
                    });
                // return promise object
                return deferred.promise;
            }

            function remove(_id) {
                // create a new instance of deferred
                var deferred = $q.defer();

                // send a post request to the server
                $http.post('/inventory/remove', { _id: _id })
                    // handle success
                    .success(function(data, status) {
                        if (status === 200 && data.status) {
                            deferred.resolve();
                        } else {
                            deferred.reject();
                        }
                    })
                    // handle error
                    .error(function(data) {
                        deferred.reject();
                    });
                // return promise object
                return deferred.promise;
            }

            //Edits fields within an existing item in the DB
            function update(item) {
                var deferred = $q.defer();
                $http.post('/inventory/update', item)
                    // handle success
                    .success(function(data, status) {
                        if (status === 200 && data.status) {
                            deferred.resolve();
                        } else {
                            deferred.reject();
                        }
                    })
                    // handle error
                    .error(function(data) {
                        deferred.reject();
                    });
                // return promise object
                return deferred.promise;
            }

            function all(scope) {
                return $http.get('/inventory/all').then(function(response) {
                    scope.allItems = response.data;
                    broadcast();
                });
            }

            function broadcast() {
              $rootScope.$broadcast("inventory_loaded");
            }
        }
    ]);
})();
