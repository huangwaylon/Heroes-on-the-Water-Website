(function() {
  angular.module('app.how').controller('eventlistRouteCtrl',
      function($log, $scope, $http, $timeout, eventlistService, AuthService, $location) {
        //$log.debug('Initializing eventlistRouteCtrl');

        var self = this;
        $scope.errormessage = false;
        eventlistService.eventlist = "";
        $scope.$watch(function() {
          return eventlistService.fulllist;
        }, function() {
          self.allEvents = eventlistService.fulllist;
        });
        this.newEvent = {};
        this.newEvent.participants = [];
        this.newEvent.volunteers = [];
        $scope.isAdmin = false;
        $scope.user = {};
        $scope.loggedIn = false;
        if (AuthService.isLoggedIn()) {
            AuthService.hello($scope.user);
        } else {
          //console.log("User is not logged in");
        }

        $scope.$on("user_loaded", checkUserPermissions);

        function checkUserPermissions() {
          if ($scope.user.account && ($scope.user.account == "Administrator" ||
                                      $scope.user.account == "Region Leader" ||
                                      $scope.user.account == "Chapter Leader")) {
            $scope.isAdmin = true;
          } else {
            $scope.isAdmin = false;
          }
        }

        $scope.success = false;
        $scope.errorbanner = false;
        var picker = new Pikaday({ field: $('#datepicker')[0] });
        var pickerz = new Pikaday({ field: $('#datepickerz')[0] });

        $('#tabbles a').click(function (e) {
          e.preventDefault()
          $(this).tab('show')
        });


        $scope.resetTab = function() {
          $scope.errorbanner = false;
          $scope.errormessage = false;
        }

        // Sorting Functions ******************************************************
        function sortByDate(a, b) {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        function sortBy(prop) {
          return function(a, b) {
            if (a[prop] > b[prop]) {
                return 1;
            } else if (a[prop] < b[prop]) {
                return -1;
            }
            return 0;
          }
        }

        $scope.sortType     = 'name'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order

        $scope.sortEventsByName = function() {
          self.allEvents.sort(sortBy("name"));
          console.log("name");
        }
        $scope.sortEventsByDate = function() {
          self.allEvents.sort(sortByDate);
          console.log("date");
        }
        $scope.sortEventsByLocation = function() {
          self.allEvents.sort(sortBy("location"));
          console.log("location");
        }

        this.removeEvent = function(id) {
          eventlistService.removeEvent(id);
        }


        this.addEvent = function() {
          eventlistService.postEvent(self.newEvent).then(
              function(response) {
                //$log.debug('addEvent resolve', response);
                $scope.errorbanner = false;
                $scope.success = true;
                self.newEvent = {};
                eventlistService.getEvents();
                $timeout(function(){
                  $scope.success = false; $location.path('/events'); }, 2500);
              }, function(error, status) {
                $scope.errorbanner = true;
                //$log.log('addEvent reject', error, status);

              }, function(progress) {
              //  $log.debug('addEvent notify', progress);
              });

        };

        this.searchEvents = function() {
          var time = $('#datepicker').val();
          if(eventlistService.fulllist != null || eventlistService.fulllist != undefined) {
            $scope.errormessage = false;
            if(time !== "") {
              var results = [];
              for(var i = 0; i < eventlistService.fulllist.length; i++) {
                if(eventlistService.fulllist[i].date.includes(time)) {
                  results.push(eventlistService.fulllist[i]);
                }
              }
              if(results.length < 1) {
                $('#eventheader').text("No events scheduled for " + time);
              }  else {
                $('#eventheader').text("Events for " + time);
              }
              eventlistService.eventlist = results;

            } else {
              $scope.errormessage = true;
              $('#eventheader').text("Error!");
            }

          } else {

          }
        };

      });
})();
