(function() {
  angular.module('app.example').controller('ExampleRouteCtrl',
      function($log, exampleService) {
        $log.debug('Initializing exampleRouteCtrl');

        var self = this;

        this.newExample = {};

        this.addExample = function() {
          $log.debug('Entering exampleRouteCtrl.addExample for example: ',
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
