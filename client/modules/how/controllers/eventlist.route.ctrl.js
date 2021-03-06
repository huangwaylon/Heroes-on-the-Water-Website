(function() {
  angular.module('app.how').controller('eventlistRouteCtrl',
      function($log, $scope, $http, $timeout, eventlistService, AuthService, $location) {
        var self = this;
        $scope.errormessage = false;
        eventlistService.eventlist = "";
        $scope.success = false;
        $scope.errorbanner = false;
        var curDate = new Date();
        var picker = new Pikaday({
          field: $('#datepicker')[0]
        });
        var pickerz = new Pikaday({ field: $('#datepickerz')[0],
        minDate: curDate,
        defaultDate: curDate
       });
        $('#tabbles a').click(function (e) {
          e.preventDefault()
          $(this).tab('show')
        });

        $scope.$watch(function() {
          return eventlistService.fulllist;
        }, function() {
          self.allEvents = eventlistService.fulllist;
          checkDate(self.allEvents);
        });
        this.newEvent = {};
        this.newEvent.participants = [];
        this.newEvent.volunteers = [];
        $scope.isAdmin = false;
        $scope.user = {};
        $scope.loggedIn = false;
        if (AuthService.isLoggedIn()) {
            AuthService.hello($scope.user);
        }

        $scope.$on("user_loaded", checkUserPermissions);
        $scope.$on("user_login", setLogin);

        Date.prototype.withoutTime = function () {
        var d = new Date(this);
        d.setHours(0, 0, 0, 0, 0);
        return d;
        }


        function checkDate(events) {
          var currentDate = picker.getDate(new Date());
          for(var i = 0; i < events.length; i++) {
            if(currentDate.getTime() >= new Date(events[i].date).getTime()) {
              if(currentDate.withoutTime() > new Date(events[i].date).withoutTime()) {
                self.allEvents.splice(i, 1);
              }
            }
          }
        }

        // Checks the user's permission level
        function checkUserPermissions() {
          if ($scope.user.account && ($scope.user.account == "Administrator" ||
                                      $scope.user.account == "Region Leader" ||
                                      $scope.user.account == "Chapter Leader")) {
            $scope.isAdmin = true;
          } else {
            $scope.isAdmin = false;
          }
        }

        function setLogin() {
          // Get user details after login
          AuthService.hello($scope.user);
        }


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
        }
        $scope.sortEventsByDate = function() {
          self.allEvents.sort(sortByDate);
        }
        $scope.sortEventsByLocation = function() {
          self.allEvents.sort(sortBy("location"));
        }

        this.removeEvent = function(id) {
          eventlistService.removeEvent(id);
        }

        this.addEvent = function() {
          eventlistService.postEvent(self.newEvent).then(
              function(response) {
                $scope.errorbanner = false;
                $scope.success = true;
                self.newEvent = {};
                eventlistService.getEvents();
                $timeout(function(){
                  $scope.success = false; $location.path('/events'); }, 2500);
              }, function(error, status) {
                $scope.errorbanner = true;

              }, function(progress) {
              });

        };

        //Takes date and searches by that
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
