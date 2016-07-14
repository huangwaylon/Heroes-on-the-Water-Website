(function() {
  angular.module('app.how').controller('chaptersRouteCtrl',
      function($log, $scope, chapterService) {
        $log.debug('Initializing chaptersRouteCtrl');

        var self = this;

        $scope.$watch(function() {
          return chapterService.chapters;
        }, function() {
          self.chapters = chapterService.chapters;
        });

        this.getChapters = function() {
          chapterService.getChapters().then(
              function(response) {
                $log.debug('getChapters resolve', response);
              }, function(error, status) {
                $log.log('getChapters reject', error, status);
                alert(error);
              }, function(progress) {
                $log.debug('getChapters notify', progress);
                alert('progress: ' + progress);
              });
        }

        this.chapters = chapterService.chapters;
        $scope.chapters = chapterService.chapters;
      });
})();
