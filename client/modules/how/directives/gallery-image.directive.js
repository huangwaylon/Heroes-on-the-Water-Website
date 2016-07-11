(function() {
  angular.module('app.how').directive('galleryImage', function() {
    return {
      restrict: 'E',
      templateUrl: '/modules/how/views/gallery-image.directive.html',
      controller: 'galleryImageCtrl',
      controllerAs: 'GalleryImageCtrl'
    };
  });
})();
