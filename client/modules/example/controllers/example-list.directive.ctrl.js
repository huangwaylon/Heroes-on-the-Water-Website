(function() {
  angular.module('app.example').controller('ExampleListDirectiveCtrl',
      function($log, $scope, exampleService) {
        $log.debug('Initializing examplesListDirectiveCtrl');

        var self = this;

        $scope.$watch(function() {
          return exampleService.examples;
        }, function() {
          self.examples = exampleService.examples;
        });

        this.refreshExamples = function() {
          exampleService.getExamples().then(
              function(response) {
                $log.debug('refreshExamples resolve', response);
              }, function(error, status) {
                $log.log('refreshExamples reject', error, status);
                alert(error);
              }, function(progress) {
                $log.debug('refreshExamples notify', progress);
                alert('progress: ' + progress);
              });
        }

        this.examples = exampleService.examples;
      });
})();
