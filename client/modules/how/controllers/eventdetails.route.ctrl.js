(function() {
  angular.module('app.how').controller('eventDetailsRouteCtrl',
      function($log, $scope, $routeParams, $http, eventlistService) {
        $log.debug('Initializing eventDetailsRouteCtrl');

        var self = this;

        this.id = $routeParams.id;
        this.event = {};

        this.event = eventlistService.getEvent(this.id).then(
          function(event) {
            self.event = event;
          });

        $('#tabbies a').click(function (e) {
          e.preventDefault()
          $(this).tab('show')
        });
      });
})();
