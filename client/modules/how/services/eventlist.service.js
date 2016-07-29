(function() {
  angular.module('app.how').service('eventlistService', function($log, $http, $q) {
    // Variable initialization
    var self = this;
    this.eventlist = [];
    this.fulllist = '';
    this.users = '';

    // Sorting Functions
    function sortByDate(a, b) {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }

    /*
    Sort By proposition - curried function
    prop - a specified attribute
    Returns a comparison function based on the proposition prop
    */
    function sortBy(prop) {
      return function(a, b) {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
      }
    }

    this.getUsers = function() {
      var defer = $q.defer();
      $http.get('/user/users').then(
          function(response) {
            self.users = response.data;
            defer.resolve(response);
          },
          function(error, status) {
            defer.reject(error, status);
          },
          function(progress) {
            defer.notify(progress);
          });

      return defer.promise;
    };

    this.updateEvent = function(events, id) {
      var defer = $q.defer();
      $http.put('/events/', events).then(
          function(response) {
            defer.resolve(response);
            self.getEvents();
          }, function(error, status) {
            defer.reject(error, status);
          }, function(progress) {
            defer.notify(progress);
          });

      return defer.promise;
    };

    this.getEventById = function(id) {
      var defer = $q.defer();

      $http.get('/events/' + id).then(
          function(response) {
            defer.resolve(response);
          },
          function(error, status) {
            defer.reject(error, status);
          },
          function(progress) {
            defer.notify(progress);
          });

      return defer.promise;
    };

    this.getEvents = function() {
      var defer = $q.defer();

      $http.get('/events').then(
          function(response) {
            self.fulllist = response.data;
            self.fulllist.sort(sortByDate);
            defer.resolve(response);
          },
          function(error, status) {
            defer.reject(error, status);
          },
          function(progress) {
            defer.notify(progress);
          });

      return defer.promise;
    };

    this.postEvent = function(eve) {
      var defer = $q.defer();
      $http.post('/events', eve).then(
          function(response) {
            defer.resolve(response);
            self.getEvents();
          }, function(error, status) {
            defer.reject(error, status);
          }, function(progress) {
            defer.notify(progress);
          });

      return defer.promise;
    };

    this.removeEvent = function(id) {
      var defer = $q.defer();
      $http.post('/events/delete', {_id: id}).then(
          function(response) {
            defer.resolve(response);
            self.getEvents();
          }, function(error, status) {
            defer.reject(error, status);
          }, function(progress) {
            defer.notify(progress);
          });

      return defer.promise;
    };

    this.getEvents();
    this.getUsers();
  });
})();
