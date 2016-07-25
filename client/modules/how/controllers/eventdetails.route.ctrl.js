(function() {
  angular.module('app.how').controller('eventDetailsRouteCtrl',
      function($log, $scope, $routeParams, $http, $timeout, eventlistService, AuthService, $location) {
        //$log.debug('Initializing eventDetailsRouteCtrl');

        var self = this;
        $scope.eventDetails;
        $scope.isAdmin = false;
        $scope.changebanner = false;
        $scope.participantbanner = false;
        $scope.volunteerbanner = false;
        $scope.removedbanner = false;
        $scope.user = {};
        $scope.loggedIn = false;
        if (AuthService.isLoggedIn()) {
            AuthService.hello($scope.user);
        } else {
          //console.log("User is not logged in");
        }

        $scope.newParticipant = {};
        $scope.newVolunteer = {};

        $scope.addParticipant = function() {
          $scope.eventDetails.participants.push($scope.newParticipant);
          eventlistService.updateEvent($scope.eventDetails, this.id).then(function (){
            $scope.participantbanner = true;
          });
          $timeout(function () {
              $scope.participantbanner = false;
          }, 3000);
          this.event;
          $scope.newParticipant = {};
        };

        $scope.addVolunteer = function() {
          $scope.eventDetails.volunteers.push($scope.newVolunteer);
          eventlistService.updateEvent($scope.eventDetails, this.id).then(function (){
            $scope.volunteerbanner = true;
          });
          $timeout(function () {
              $scope.volunteerbanner = false;
          }, 3000);
          this.event;
          $scope.newVolunteer = {};
        };


        $scope.$watch(function() {
          return $scope.user;
        }, function() {
          $timeout(function () {
            if($scope.user.account != undefined || $scope.user.account != null) {
              if($scope.user.account == "Administrator") {
                $scope.isAdmin = true;
              }
            } else {
              $scope.isAdmin = false;
            }
          }, 1500);
        });



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

        this.removeEvent = function(id) {
          eventlistService.removeEvent(id).then(function() {
            $scope.removedbanner = true;
            $timeout(function () {
                $location.path('/events');
            }, 3000);
          });
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
