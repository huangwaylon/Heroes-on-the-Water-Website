(function() {
  angular.module('app.how').controller('chaptersRouteCtrl',
      function($log, exampleService) {
        $log.debug('Initializing chaptersRouteCtrl');

        var self = this;

        this.newExample = {};

        var Chapter = require('/app/models/chapter');
        console.log(Chapter);
      });
})();
