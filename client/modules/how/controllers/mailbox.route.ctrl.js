(function() {
    angular.module('app.how').controller('mailboxRouteCtrl',
        function($log, $scope, AuthService, mailService, $timeout) {
            //$log.debug('Initializing mailboxRouteCtrl');

            var self = this;
            $scope.userResult = {};
            $scope.username = {};
            $scope.successMail = false;
            $scope.reply = {};


            $('#tabs a').click(function (e) {
              e.preventDefault()
              $(this).tab('show')
            });

            $scope.clearMail = function() {
              $('#recipientInput').val("");
              $('#subjectInput').val("");
            }

            $scope.openMail = function(index) {
              mailService.currentmail = $scope.mailResults[index];
              $('#currentmail').show();
              $('#replybutton').show();
            }

            $scope.reply = function() {
              $('#recipientInput').val(mailService.currentmail.sender);
              $('#subjectInput').val("RE: " + mailService.currentmail.subject);
              $('#mailtab').tab('show');
            }


        if (AuthService.isLoggedIn()) {
            var helloResponse = AuthService.getLoggedInUsername($scope.user);
            helloResponse.then(function(response){
                $scope.username = response.username;
                $scope.submitLookup();
            });
        }

            $scope.submitLookup = function() {
                AuthService.findUserByUsername($scope.username, $scope.userResult).then(function(result) {
                	mailService.mail = [];
                	for (var i=0; i<$scope.userResult.mail.length; i++){
                		var id=$scope.userResult.mail[i];
                		mailService.getMailById(id);
                	}
                	$scope.mailResults = mailService.mail;
                }, function(error) {
                    console.log("mailbox ctrl submitLookup error");
                });

            }

            $scope.submitMail = function() {
                var message = {
                    sender: $scope.username,
                    recipient: $scope.recipient,
                    subject: $scope.subject,
                    body: $scope.body,
                    read: false
                };
                mailService.sendMail(message);
                $scope.successMail = true;
                $timeout(function() {
                  $scope.successMail = false;
                }, 2000);
            }
        });


})();
