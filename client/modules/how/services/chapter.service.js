(function() {
  angular.module('app.how').service('chapterService', function($log, $http, $q) {

    var self = this;

    this.chapters = [];

    this.getChapters = function() {
      var defer = $q.defer();

      $http.get('/chapters').then(
          function(response) {
            self.chapters = response.data;
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


    this.getChapters();
  });
})();
