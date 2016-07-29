(function() {
    angular.module('app.how').controller('mailboxRouteCtrl',
        function($log, $scope, AuthService, mailService, $timeout, $location) {

            var self = this;
            $scope.userResult = {};
            $scope.username = {};
            $scope.successMail = false;
            $scope.unreadCount = 0;
            $scope.selectedMessage = {};

            $('#tabs a').click(function(e) {
                e.preventDefault()
                $(this).tab('show')
            });

            $scope.clearMail = function() {
                $('#recipientInput').val("");
                $('#subjectInput').val("");
            }

            $scope.openMail = function(mail) {
              $scope.selectedMessage = mail;
                //console.log("index2: ", index);
                //mailService.currentmail = $scope.mailResults[index];
                //console.log($scope.mailResults[index]);
                mailService.currentmail = mail;
                $('#currentmail').show();
                $('#replybutton').show();
                //var mail = $scope.mailResults[index];
                //Message was unread, set it to read
                if (!mail.read) {
                    var newMail = {
                        _id: mail._id,
                        sender: mail.sender,
                        recipient: mail.recipient,
                        subject: mail.subject,
                        body: mail.body,
                        date: mail.date,
                        read: true
                    };
                    mailService.updateMail(newMail);
                    mail.read = true;
                }
                unreadCountTotal();
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
                helloResponse.then(function(response) {
                    $scope.username = response.username;
                    $scope.submitLookup();
                });
            } else {
                $location.path('/profile');
            }

            function unreadCountTotal() {
                $scope.unreadCountTotal = 0;
                for (var i = 0; i < $scope.mailResults.length; i++) {
                    var item = $scope.mailResults[i];
                    if (!item.read) {
                        $scope.unreadCountTotal++;
                    }
                }
            }
            // Set listener for mail loaded
            $scope.$on("mail_loaded", unreadCountTotal);

            $scope.submitLookup = function() {
                AuthService.findUserByUsername($scope.username, $scope.userResult).then(function(result) {
                    mailService.mail = [];
                    for (var i = 0; i < $scope.userResult.mail.length; i++) {
                        var id = $scope.userResult.mail[i];
                        mailService.getMailById(id);
                    }
                    $scope.mailResults = mailService.mail;
                }, function(error) {
                    console.log("mailbox ctrl submitLookup error");
                });
            }

            //Changes the style of a message depending on if it is read or not
            $scope.setMailStyle = function(mail) {
                if(mail == $scope.selectedMessage){
                    return { 'background-color': '#F5F5F5', 'border-width': '3px', 'border-color': '#AFAFAF' };
                }
                //message is already read
                if (mail.read) {
                    return { 'background-color': '#F5F5F5' };
                }
                //unread message
                else {
                    return { 'font-weight': 'bold', 'background-color': 'white' };
                }
            }

            $scope.submitMail = function() {
                var message = {
                    sender: $scope.username,
                    recipient: $scope.recipient,
                    subject: $scope.subject,
                    body: $scope.body,
                    date: new Date(),
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


        });

})();
