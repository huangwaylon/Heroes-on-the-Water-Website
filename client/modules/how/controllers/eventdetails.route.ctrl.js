(function() {
  angular.module('app.how').controller('eventDetailsRouteCtrl',
      function($log, $scope, $routeParams, $http, $timeout, eventlistService, mailService, AuthService, InvService, $location) {

        // Initialize scope variables
        var self = this;
        $scope.eventDetails = {};
        $scope.eventDetails.volunteers = [];
        $scope.eventDetails.participants = [];
        $scope.isAdmin = false;
        this.id = $routeParams.id;
        this.event = {};
        var picker = new Pikaday({ field: $('#datepicker')[0] });
        $scope.changebanner = false;
        $scope.participantbanner = false;
        $scope.volunteerbanner = false;
        $scope.removedbanner = false;
        $scope.maxP = false;
        $scope.maxV = false;
        $scope.signupType = '';
        $scope.newPerson = {};
        $scope.user = {};
        $scope.loggedIn = false;
        $scope.newParticipant = {};
        $scope.newVolunteer = {};
        // Initialize the allItems variable which stores all the inventory items
        $scope.allItems = [];
        $scope.usedItems = [];
        $scope.unusedItems = [];
        // Load up the initial list of existing inventory items
        InvService.all($scope);

        $scope.sortType     = 'name'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order

        $('#leavebutton').hide();

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

        //Function is currently called when clicking on the signup button. If user is signed in and exists in the event, it turns into
        //a leave event button. that button currently does not have functionality. Should add functionality to it.
        //Also, how do we check for users who didn't make an account, and signed up, and want to leave the event?
        $scope.checkSignup = function() {

          if($scope.user.username != null || $scope.user.username != undefined) {
            for(var i = 0; i < $scope.eventDetails.participants.length; i++) {
              if($scope.user.username == $scope.eventDetails.participants[i].username) {
                $('#signupbutton').hide();
                $('#leavebutton').show();
                break;
              }
            }
            for(var i  = 0; i < $scope.eventDetails.volunteers.length; i++) {
              if($scope.user.username == $scope.eventDetails.volunteers[i].username) {
                $('#signupbutton').hide();
                $('#leavebutton').show();
                break;
              }
            }
          } else {
          }
          //This line opens up the signup modal. It should go in the else statement, when it checks and sees that the user
          //hasn't already signed up
          $('#myModal').modal('show');
        }

        //Method adds participants, taking new participant object and submitting to service.
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
          }, 500);
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
          }, 500);
        };

        // Method removes participant at index specified
        $scope.removeParticipant = function(index) {
          $scope.eventDetails.participants.splice(index, 1);
          eventlistService.updateEvent($scope.eventDetails, this.id).then(function (){
            console.log("Removed participant");
          });
        };

        // Method removes volunteer at index specified
        $scope.removeVolunteer = function(index) {
          $scope.eventDetails.volunteers.splice(index, 1);
          eventlistService.updateEvent($scope.eventDetails, this.id).then(function (){
            console.log("Removed volunteer");
          });
        };

        //Include check here to see if a username already exists within the participant list.
        $scope.signup = function() {
          if($scope.signupType == "participant") {
            $scope.newParticipant = $scope.user;
            $scope.addParticipant();
            }
          else if($scope.signupType == "volunteer") {
            $scope.newVolunteer = $scope.user;
            $scope.addVolunteer();
            }
          else {
            alert("Neither participant or volunteer was selected");
          }
          $timeout(function() {
            $('#myModal').modal('hide');
          }, 500);
        }

        $scope.$on("inventory_loaded", updateInventoryLists);

        function updateInventoryLists() {
          for (var i = 0; i < $scope.allItems.length; i++) {
            var obj = $scope.allItems[i];
            for (var j = 0; j < obj.events.length; j++) {
              var objEventId = (obj.events)[j];
              if (objEventId === $scope.eventDetails._id) {
                $scope.usedItems.push(obj);
                break;
              }
            }
          }
          $scope.unusedItems = $scope.allItems.diff($scope.usedItems);
        }

        Array.prototype.diff = function(a) {
          return this.filter(function(i) {return a.indexOf(i) < 0;});
        };

        $scope.addItem = function(index) {
          var item = $scope.unusedItems[index];
          $scope.usedItems.push(item);
          $scope.unusedItems.splice(index, 1);

          item.events.push($scope.eventDetails._id);
          var editedItem = {
              i_id: item._id,
              i_name: item.name,
              i_description: item.description,
              i_chapter: item.chapter,
              i_events: item.events,
              i_isUsed: item.isUsed
          };
          InvService.update(editedItem);
        }

        $scope.removeItem = function(index) {
          var item = $scope.usedItems[index];
          $scope.unusedItems.push(item);
          $scope.usedItems.splice(index, 1);

          var position = item.events.indexOf($scope.eventDetails._id);
          if ( ~position ) {
            item.events.splice(position, 1);
          }
          var editedItem = {
              i_id: item._id,
              i_name: item.name,
              i_description: item.description,
              i_chapter: item.chapter,
              i_events: item.events,
              i_isUsed: item.isUsed
          };
          InvService.update(editedItem);
        }

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

        $scope.sendBroadcast = function() {
                console.log("sendBroadcast()");
                console.log($scope.eventDetails);
                var recipients = "";
                if ($scope.sendParticipants) {
                    for (var i = 0; i < $scope.eventDetails.participants.length; i++) {
                        if ($scope.eventDetails.participants[i] != "") {
                            recipients += $scope.eventDetails.participants[i].username;
                            recipients += ", ";
                        }
                    }
                }
                if ($scope.sendVolunteers) {
                    for (var i = 0; i < $scope.eventDetails.volunteers.length; i++) {
                        if ($scope.eventDetails.volunteers[i] != "") {
                            recipients += $scope.eventDetails.volunteers[i].username;
                            recipients += ", ";
                        }
                    }
                }
                var message = {
                    sender: $scope.user.username,
                    recipient: recipients,
                    subject: $scope.subject,
                    body: $scope.body,
                    date: new Date(),
                    read: false
                };
                console.log("Message to be sent: ");
                console.log(message);
                mailService.sendMail(message);
            }

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
            };
            InvService.broadcast();

            if($scope.eventDetails.maxParticipants <= $scope.eventDetails.participants.length) {
              $scope.maxP = true;
              console.log("Max participants have been reached");
            }
            if($scope.eventDetails.maxVolunteers <= $scope.eventDetails.volunteers.length) {
              $scope.maxV = true;
              console.log("Max volunteers have been reached");
            }
          });

        $('#tabbies a').click(function (e) {
          e.preventDefault()
          $(this).tab('show')
        });
      });
})();