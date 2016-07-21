(function() {
  angular.module('app.how').factory('InvService',
    ['$q', '$timeout', '$http',
    function ($q, $timeout, $http) {
      // return available functions for use in the controllers
      return ({
        add: add,
        remove: remove,
        all: all
      });

      function add(name, description, isUsed) {
        // create a new instance of deferred
        var deferred = $q.defer();

        // send a post request to the server
        $http.post('/inventory/add',
          {i_name: name,
            i_description: description,
            i_isUsed: isUsed})
          // handle success
          .success(function (data, status) {
            if(status === 200 && data.status){
              deferred.resolve();
            } else {
              deferred.reject();
            }
          })
          // handle error
          .error(function (data) {
            deferred.reject();
          });
        // return promise object
        return deferred.promise;
      }
      function remove(name, description, isUsed) {
        // create a new instance of deferred
        var deferred = $q.defer();

        // send a post request to the server
        $http.post('/inventory/remove',
          {name: name,
            description: description,
            isUsed: isUsed})
          // handle success
          .success(function (data, status) {
            if(status === 200 && data.status){
              deferred.resolve();
            } else {
              deferred.reject();
            }
          })
          // handle error
          .error(function (data) {
            deferred.reject();
          });
        // return promise object
        return deferred.promise;
      }

      function all(scope) {
        return $http.get('/inventory/all').then(function(response) {
          scope.allItems = response.data;
        });
      }

  }]);
})();
