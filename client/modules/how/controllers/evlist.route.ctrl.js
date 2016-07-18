(function() {
  angular.module('app.how').controller('evlistRouteCtrl',
      function($log, $scope, eventlistService) {
        $log.debug('Initializing evlistRouteCtrl');

        var self = this;

        $scope.$watch(function() {
          return eventlistService.eventlist;
        }, function() {
          self.evlist = eventlistService.eventlist;
        });

        this.evlist = eventlistService.eventlist;

      });
})();
