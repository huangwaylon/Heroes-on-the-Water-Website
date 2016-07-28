(function() {
  angular.module('app.how').factory('BlogService',
    ['$q', '$timeout', '$http',
    function ($q, $timeout, $http) {

      // Return available functions for use in the controllers
      return ({
        add: add,
        remove: remove,
        all: all
      });

      // Add blog item by request to server
      function add(title, body, author, timestamp) {
        // create a new instance of deferred
        var deferred = $q.defer();
        // send a post request to the server
        $http.post('/blog/add',
          {b_title: title,
            b_body: body,
            b_author: author,
            b_timestamp: timestamp})
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

      // Remove blog item by id by request to server
      function remove(_id) {
        // create a new instance of deferred
        var deferred = $q.defer();

        // send a post request to the server
        $http.post('/blog/remove',
          {_id: _id})
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

      // Retrieve all blog items by http request from server
      function all(scope) {
        return $http.get('/blog/all').then(function(response) {
          scope.allItems = response.data;
        });
      }
  }]);
})();
