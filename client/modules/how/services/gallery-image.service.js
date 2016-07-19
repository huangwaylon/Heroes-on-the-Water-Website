(function() {
  angular.module('app.how').service('galleryImageService', function($log, $http, $q) {

    var self = this;

    this.dbimages = [];
    this.imagelist = [];

    this.getImages = function() {

      var defer = $q.defer();

      $http.get('/galleryImages').then(
          function(response) {
            self.dbimages = response.data;
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

    this.getImages();
  });
})();
