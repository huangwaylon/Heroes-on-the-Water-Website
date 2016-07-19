(function() {
  angular.module('app.how').service('eventlistService', function($log, $http, $q) {
    $log.debug('Initializing eventlistService');

    var self = this;

    this.eventlist = [];
    this.fulllist = '';
    this.eventdetails = [];


    this.getEvent = function(id) {
      var defer = $q.defer();

      $http.get('/events/' + id).then(
          function(response) {
            //$log.debug('events resolve', response);
            self.eventdetails = response.data;
            console.log(response);
            defer.resolve(response.data);
          },
          function(error, status) {
            //$log.$log('getExamples reject', error, status);
            defer.reject(error, status);
          },
          function(progress) {
            //$log.debug('postExample notify', progress);
            defer.notify(progress);
          });

      return defer.promise;
    };



    this.getEvents = function() {

      var defer = $q.defer();

      $http.get('/events').then(
          function(response) {
            //$log.debug('events resolve', response);
            self.fulllist = response.data;
            defer.resolve(response);
          },
          function(error, status) {
            //$log.$log('getExamples reject', error, status);
            defer.reject(error, status);
          },
          function(progress) {
            //$log.debug('postExample notify', progress);
            defer.notify(progress);
          });

      return defer.promise;
    };

    this.postExample = function(eve) {

      var defer = $q.defer();

      $http.post('/events', eve).then(
          function(response) {
            //$log.debug('eventlist resolve: ', response);
            defer.resolve(response);
            self.getExamples();
          }, function(error, status) {
            //$log.log('eventlist reject', error, status);
            defer.reject(error, status);
          }, function(progress) {
            //$log.debug('eventlist notify', progress);
            defer.notify(progress);
          });

      return defer.promise;
    };

    this.getEvents();
  });
})();
