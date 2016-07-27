(function() {
  angular.module('app.how').controller('eventDetailsRouteCtrl',
      function($log, $scope, $routeParams, $http, $timeout, eventlistService, AuthService, $location) {

        // Initialize scope variables
        var self = this;
        $scope.eventDetails;
        $scope.isAdmin = false;
        this.id = $routeParams.id;
        this.event = {};
        var picker = new Pikaday({ field: $('#datepicker')[0] });
        $scope.changebanner = false;
        $scope.participantbanner = false;
        $scope.volunteerbanner = false;
        $scope.removedbanner = false;
        $scope.signupType = '';
        $scope.newPerson = {};
        $scope.user = {};
        $scope.loggedIn = false;
        $scope.newParticipant = {};
        $scope.newVolunteer = {};

        // Check that the user is logged in
        if (AuthService.isLoggedIn()) {
          // Start process to get user details
          AuthService.hello($scope.user);
        }

        // Register listener to user loaded
        $scope.$on("user_loaded", checkUserPermissions);

        // Check the user's permissions, e.g. Admin, volunteer, etc.
        function checkUserPermissions() {
          if ($scope.user.account && ($scope.user.account == "Administrator" ||
                                      $scope.user.account == "Region Leader" ||
                                      $scope.user.account == "Chapter Leader")) {
            $scope.isAdmin = true;
          } else {
            $scope.isAdmin = false;
          }
        }

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
          $timeout(function() {
            $('#participantModel').modal('hide');
          }, 1000);
        };

        //Method adds volunteers, taking newVolunteer object and submitting to service.
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
          $timeout(function() {
            $('#volunteerModal').modal('hide');
          }, 1000);
        };

        $scope.signup = function() {
          console.log($scope.newPerson);
          if($scope.signupType == "participant") {
            $scope.newParticipant = $scope.newPerson;
            $scope.addParticipant();
            $scope.newPerson = {};

          }
          else if($scope.signupType == "volunteer") {
            $scope.newVolunteer = $scope.newPerson;
            $scope.addVolunteer();
            $scope.newPerson = {};
          }
          else {
            alert("Neither participant or volunteer was selected");
          }
          $timeout(function() {
            $('#myModal').modal('hide');
          }, 1000);

        }

        // $scope.$watch(function() {
        //   return $scope.user;
        // }, function() {
        //   $timeout(function () {
        //     if($scope.user.account != undefined || $scope.user.account != null) {
        //       if($scope.user.account == "Administrator") {
        //         $scope.isAdmin = true;
        //       }
        //     } else {
        //       $scope.isAdmin = false;
        //     }
        //   }, 1500);
        // });


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
