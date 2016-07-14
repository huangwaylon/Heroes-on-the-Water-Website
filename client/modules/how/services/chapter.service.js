(function() {
  angular.module('app.how').service('chapterService', function($log, $http, $q) {

    var self = this;

    this.chapters = [];

    this.getChapters = function() {
      $log.debug('Entering chapterService.getChapters');

      var defer = $q.defer();

      $http.get('/chapters').then(
          function(response) {
            $log.debug('getChapters resolve', response);
            self.chapters = response.data;
            defer.resolve(response);
          },
          function(error, status) {
            $log.$log('getChapters reject', error, status);
            defer.reject(error, status);
          },
          function(progress) {
            $log.debug('postChapter notify', progress);
            defer.notify(progress);
          });

      return defer.promise;
    };


    this.getChapters();
  });
})();
