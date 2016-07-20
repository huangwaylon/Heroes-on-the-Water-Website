(function() {
  angular.module('app.how').controller('mailboxRouteCtrl',
      function($log, $scope, AuthService, mailService) {
        $log.debug('Initializing mailboxRouteCtrl');

        var self = this;
        $scope.userResult = {};

        $scope.submitLookup = function() {
        	AuthService.findUserByUsername($scope.userToLookup, $scope.userResult);
        }

        $scope.submitMail = function() {
        	var message = {
        		sender: $scope.sender,
        		recipient: $scope.recipient,
        		subject: $scope.subject,
        		body: $scope.body,
        		read: false
        	};
        	mailService.postMail(message);
        }
      });


})();
