(function() {
  angular.module('app.how').controller('galleryImageCtrl',
      function($log, $scope, galleryImageService) {
        var self = this;

        $scope.$watch(function() {
          return galleryImageService.imagelist;
        }, function() {
          self.imagelist = galleryImageService.imagelist;
        });

        this.imagelist = galleryImageService.imagelist;
      });
})();
