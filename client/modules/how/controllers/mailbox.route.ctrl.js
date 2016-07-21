(function() {
    angular.module('app.how').controller('mailboxRouteCtrl',
        function($log, $scope, AuthService, mailService) {
            $log.debug('Initializing mailboxRouteCtrl');

            var self = this;
            $scope.userResult = {};

            $scope.submitLookup = function() {
                AuthService.findUserByUsername($scope.userToLookup, $scope.userResult).then(function(result) {
                	mailService.mail = [];
                	for (var i=0; i<$scope.userResult.mail.length; i++){
                		var id=$scope.userResult.mail[i]
                		mailService.getMailById(id);
                	}
                	$scope.mailResults = mailService.mail;
                    
                }, function(error) {
                    console.log("mailbox ctrl submitLookup error");
                });
                
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
