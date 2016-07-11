(function() {
  angular.module('app.how').service('galleryImageService', function($log, $http, $q) {

    var self = this;

    this.dbimages = [];

    this.getImages = function() {

      var defer = $q.defer();

      $http.get('/galleryImages').then(
          function(response) {
            $log.debug('getExamples resolve', response);
            self.dbimages = response.data;
            defer.resolve(response);
          },
          function(error, status) {
            $log.$log('getExamples reject', error, status);
            defer.reject(error, status);
          },
          function(progress) {
            $log.debug('postExample notify', progress);
            defer.notify(progress);
          });

      return defer.promise;
    };

    //this.getExamples();
  });
})();
