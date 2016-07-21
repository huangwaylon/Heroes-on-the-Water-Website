(function() {
    angular.module('app.how').service('mailService', function($log, $http, $q, AuthService) {

        var self = this;

        this.mail = {};

        this.getMail = function() {
            $log.debug('Entering mailService.getMail');

            var defer = $q.defer();

            $http.get('/mail').then(
                function(response) {
                    $log.debug('getMail resolve', response);
                    self.mail = response.data;
                    defer.resolve(response);
                },
                function(error, status) {
                    $log.log('getMail reject', error, status);
                    defer.reject(error, status);
                },
                function(progress) {
                    $log.debug('postMail notify', progress);
                    defer.notify(progress);
                });

            return defer.promise;
        };

        this.postMail = function(mail) {
            $log.debug('Entering mailService.postMail', mail);

            var defer = $q.defer();
            var userObject = {};

            $http.post('/mail', mail).then(
                function(response) {
                    $log.debug('postMail resolve: ', response);
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
    });
})();
