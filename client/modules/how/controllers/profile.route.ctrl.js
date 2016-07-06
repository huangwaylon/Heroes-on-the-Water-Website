(function() {
  angular.module('app.how').controller('profileRouteCtrl',
      function($log, exampleService) {
        $log.debug('Initializing profileRouteCtrl');

        var self = this;

        this.newExample = {};

        this.addExample = function() {
          $log.debug('Entering profileRouteCtrl.addExample for example: ',
              self.newExample);

          exampleService.postExample(self.newExample).then(
              function(response) {
                $log.debug('addExample resolve', response);
                self.newExample = {};
              }, function(error, status) {
                $log.log('addExample reject', error, status);
                alert(error);
              }, function(progress) {
                $log.debug('addExample notify', progress);
              });
        };
      });
})();
