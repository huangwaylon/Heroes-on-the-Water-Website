(function() {
    angular.module('app.how').service('mailService', function($log, $http, $q, AuthService,$rootScope) {

        var self = this;

        this.mail = [];
        this.currentmail = {};


        this.getMailById = function(mailId) {
            var defer = $q.defer();

            $http({
                url: '/mail',
                method: "GET",
                params: { mailId: mailId }
            }).then(
                function(response) {
                    self.mail.push(response.data);
                    defer.resolve(response);
                    $rootScope.$broadcast("mail_loaded");
                },
                function(error, status) {
                    defer.reject(error, status);
                },
                function(progress) {
                    defer.notify(progress);
                });

            return defer.promise;
        };

        //Sends mail to backend
        this.postMail = function(mail) {
            var defer = $q.defer();
            var userObject = {};

            $http.post('/mail', mail).then(
                function(response) {
                    defer.resolve(response);
                    AuthService.findUserByUsername(mail.recipient, userObject).then(function(result) {
                        userObject.mail.push(response.data._id);
                        AuthService.updateUser(userObject);
                    }, function(error) {
                        $log.log("mailService.postMail AuthService.updateUser callback error");
                    });;

                },
                function(error, status) {
                    $log.log('postMail reject', error, status);
                    defer.reject(error, status);
                },
                function(progress) {
                    $log.debug('postMail notify', progress);
                    defer.notify(progress);
                });

            return defer.promise;
        };

        //User calls this function to send mail. Handles sending to a list of people and passes
        //it off to the postMail() function to actually send mails to the backend.
        this.sendMail = function(mail) {
            var recipients = mail.recipient.split(",");
            var mailArray = new Array();
            for (var i = 0; i < recipients.length; i++) {
                recipients[i] = recipients[i].trim();
                if (recipients[i] != "") {
                    mailArray[i] = {
                        sender: mail.sender,
                        recipient: recipients[i],
                        subject: mail.subject,
                        body: mail.body,
                        date: mail.date,
                        read: false
                    };
                    this.postMail(mailArray[i]);
                }
            }
        }

        //Updates a mail document. Used for toggling read/unread
        this.updateMail = function(mail) {
            var deferred = $q.defer();
            $http.post('/mail/update', mail)
                // handle success
                .success(function(data, status) {
                    if (status === 200 && data.status) {
                        deferred.resolve();
                    } else {
                        deferred.reject();
                    }
                })
                // handle error
                .error(function(data) {
                    deferred.reject();
                });
            // return promise object
            return deferred.promise;
        }

    });
})();
