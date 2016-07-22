(function() {
  angular.module('app.how').controller('eventDetailsRouteCtrl',
      function($log, $scope, $routeParams, $http, $timeout, eventlistService, AuthService) {
        $log.debug('Initializing eventDetailsRouteCtrl');

        var self = this;
        $scope.eventDetails;
        $scope.isAdmin = false;
        $scope.changebanner = false;
        $scope.user = {};
        $scope.loggedIn = false;
        if (AuthService.isLoggedIn()) {
            AuthService.hello($scope.user).then(function() {
              console.log($scope.user);
            });
        } else {
          console.log("Person is not logged in");
        }

        this.id = $routeParams.id;
        this.event = {};
        var picker = new Pikaday({ field: $('#datepicker')[0] });

        this.updateEvent = function() {
          eventlistService.updateEvent($scope.eventDetails, this.id).then(function (){
            $scope.changebanner = true;
          });
          $timeout(function () {
              $scope.changebanner = false;
          }, 3000);
          this.event;
        };

        this.event = eventlistService.getEventById(this.id).then(
          function(event) {
            self.event = event.data;
            $scope.eventDetails = {
              _id: self.event._id,
              name: self.event.name,
              location: self.event.location,
              date: self.event.date,
              description: self.event.description,
              starttime: self.event.starttime,
              endtime: self.event.endtime,
              maxParticipants: self.event.maxParticipants,
              maxVolunteers: self.event.maxVolunteers,
              participants: self.event.participants,
              volunteers: self.event.volunteers
            }
          });

        $('#tabbies a').click(function (e) {
          e.preventDefault()
          $(this).tab('show')
        });
      });
})();