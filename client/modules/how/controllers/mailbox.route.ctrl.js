(function() {
  angular.module('app.how').controller('mailboxRouteCtrl',
      function($log, $scope, AuthService) {
        $log.debug('Initializing mailboxRouteCtrl');

        var self = this;
        $scope.userResult = {};

        $scope.submitLookup = function() {

        	AuthService.findUserByUsername($scope.userToLookup, $scope.userResult);
        }

        $scope.submitMail = function() {
        	
        }


      });


})();
