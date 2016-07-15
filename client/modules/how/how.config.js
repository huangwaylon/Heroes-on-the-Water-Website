(function() {
  angular.module('app.how', ['ngRoute']).config(function($routeProvider) {
    $routeProvider.when('/profile', {
      templateUrl: '/modules/how/views/profile.route.html',
      controller: 'profileRouteCtrl',
      controllerAs: 'profileCtrl'
    })
    .when('/media', {
      templateUrl: '/modules/how/views/media.route.html',
      controller: 'mediaRouteCtrl',
      controllerAs: 'mediaCtrl'
    })
    .when('/inventory', {
      templateUrl: '/modules/how/views/inventory.route.html',
      controller: 'inventoryRouteCtrl',
      controllerAs: 'inventoryCtrl'
    })
    .when('/chapters', {
      templateUrl: '/modules/how/views/chapters.route.html',
      controller: 'chaptersRouteCtrl',
      controllerAs: 'chaptersCtrl'
    })
    .when('/heroes', {
      templateUrl: '/modules/how/views/heroes.route.html',
      controller: 'heroesRouteCtrl',
      controllerAs: 'heroesCtrl'
    })
    .when('/contact', {
      templateUrl: '/modules/how/views/contact.route.html',
      controller: 'contactRouteCtrl',
      controllerAs: 'contactCtrl'
    })
    .when('/events', {
      templateUrl: '/modules/how/views/events.route.html',
      controller: 'eventsRouteCtrl',
      controllerAs: 'eventsCtrl'
    })
    .when('/login', {
      templateUrl: '/modules/how/views/login.route.html',
      controller: 'loginController',
      access: {restricted: false}
    })
    .when('/logout', {
      controller: 'logoutController',
      access: {restricted: true}
    })
    .when('/register', {
      templateUrl: '/modules/how/views/register.route.html',
      controller: 'registerController',
      access: {restricted: false}
    });
  });
})();
