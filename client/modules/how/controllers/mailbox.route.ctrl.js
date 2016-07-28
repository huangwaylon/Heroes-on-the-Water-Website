(function() {
    angular.module('app.how').controller('mailboxRouteCtrl',
        function($log, $scope, AuthService, mailService, $timeout, $location) {
            //$log.debug('Initializing mailboxRouteCtrl');

            var self = this;
            $scope.userResult = {};
            $scope.username = {};
            $scope.successMail = false;


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
              var mail = $scope.mailResults[index];
              //Message was unread, set it to read
              if(!mail.read){
                var mail = {
                  _id: $scope.mailResults[index]._id,
                  sender: $scope.mailResults[index].sender,
                  recipient: $scope.mailResults[index].recipient,
                  subject: $scope.mailResults[index].subject,
                  body: $scope.mailResults[index].body,
                  read: true
                };
                mailService.updateMail(mail);
                $scope.mailResults[index].read = true;
                //$scope.$apply(); //Need to refresh the style for that mail, not sure if this works
              }
            }

            $scope.reply = function() {
              $('#recipientInput').val(mailService.currentmail.sender);
              $scope.recipient = mailService.currentmail.sender;
              $('#subjectInput').val("RE: " + mailService.currentmail.subject);
              $scope.subject = mailService.currentmail.subject;
              $('#mailtab').tab('show');
            }


        if (AuthService.isLoggedIn()) {
            var helloResponse = AuthService.getLoggedInUsername($scope.user);
            helloResponse.then(function(response){
                $scope.username = response.username;
                $scope.submitLookup();
            });
        } else {
          $location.path('/profile');
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
                $scope.recipient = "";
                $scope.subject = "";
                $scope.body = "";
                $timeout(function() {
                  $scope.successMail = false;
                }, 2000);
            }

            //Changes the style of a message depending on if it is read or not
            $scope.setMailStyle = function(index){
              var mail = $scope.mailResults[index];
              //message is already read
              if(mail.read){
                return {'background-color': '#F5F5F5'};
              }
              //unread message
              else{
                return {'font-weight': 'bold', 'background-color': 'white'};
              }
            }

        });


})();
