(function() {
  angular.module('app.how').controller('eventDetailsRouteCtrl',
      function($log, $scope, $routeParams, $http, eventlistService) {
        $log.debug('Initializing eventDetailsRouteCtrl');

        var self = this;

        this.id = $routeParams.id;
        this.event = {};

        this.event = eventlistService.getEventById(this.id).then(
          function(event) {
            self.event = event.data;
          });

        $('#tabbies a').click(function (e) {
          e.preventDefault()
          $(this).tab('show')
        });
      });
})();
