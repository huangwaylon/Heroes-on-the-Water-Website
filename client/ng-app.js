(function() {
    var appModule = angular.module('app', ['ngRoute', 'app.how', 'xeditable', 'counter']);

    appModule.run(function(editableOptions) {
        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
    });

    // Route controls for the entire site
    appModule.config(function($routeProvider) {
        $routeProvider.when('/', {
            // The home page
            templateUrl: '/home.route.html',
        }).otherwise({
            // Prevent user from going to an unindexed subdomain
            redirectTo: '/'
        });
    });

    // Runs when the current route changes
    appModule.run(function($rootScope, $location, $route, AuthService) {
        $rootScope.$on('$routeChangeStart',
            function(event, next, current) {
                // Check the user's status
                AuthService.getUserStatus().then(function() {
                    // Check that the user is logged in
                    if (AuthService.isLoggedIn()) {
                        // Broadcast to listeners, specifically NavbarCtrl, to retrieve
                        // user info and update views
                        $rootScope.$broadcast("user_login");
                    }
                });
            });
    });

    // Navigation bar controller
    appModule.controller('NavbarCtrl', function($log, $location, $scope, mailService, AuthService) {
        $scope.user = {};
        $scope.notLoggedIn = true;
        $scope.isAdmin = false;
        $scope.unreadMail = false;

        // Set listeners for user login, logout, and load
        $scope.$on("user_login", setLogin);
        $scope.$on("user_logout", setLogout);
        $scope.$on("user_loaded", getUserInfo);



        function checkMail() {
            mailService.mail = [];
            for (var i = 0; i < $scope.user.mail.length; i++) {
                var id = $scope.user.mail[i];
                mailService.getMailById(id).then(function(response) {
                    if (!response.data.read) {
                        $scope.unreadMail = true;
                    }
                });
            }
        }

        function setLogin() {
            $scope.notLoggedIn = false;
            // Get user details after login
            AuthService.hello($scope.user);
        }

        function setLogout() {
            $scope.notLoggedIn = true;
        }

        // Checks the user's information
        function getUserInfo() {
            if ($scope.user.account && ($scope.user.account == "Administrator" ||
                    $scope.user.account == "Region Leader" ||
                    $scope.user.account == "Chapter Leader")) {
                $scope.isAdmin = true;
            } else {
                $scope.isAdmin = false;
            }
        }

        $scope.logoutUser = function() {
            AuthService.logout().then(function() {
                $location.path('/');
            });
        }

        this.isActive = function(viewLocation) {
            return viewLocation === $location.path();
        };
    });
})();
