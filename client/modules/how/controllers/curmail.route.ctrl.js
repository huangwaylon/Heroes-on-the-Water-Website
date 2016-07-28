(function() {
  angular.module('app.how').controller('curmailRouteCtrl',
      function($log, $scope, mailService) {
        //$log.debug('Initializing evlistRouteCtrl');

        var self = this;

        //Watch function for directive
        $scope.$watch(function() {
          return mailService.currentmail;
        }, function() {
          self.mail = mailService.currentmail;
        });

        this.mail = mailService.currentmail;

      });

})();
