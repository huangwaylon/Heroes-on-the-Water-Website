(function() {
  angular.module('app.how').controller('eventlistRouteCtrl',
      function($log, $scope, $http, $timeout, eventlistService) {
        $log.debug('Initializing eventlistRouteCtrl');

        var self = this;
        $scope.errormessage = false;
        eventlistService.eventlist = "";
        $scope.$watch(function() {
          return eventlistService.fulllist;
        }, function() {
          self.allEvents = eventlistService.fulllist;
        });
        this.newEvent = {};
        this.newEvent.participants = "";
        this.newEvent.volunteers = "";
        $scope.success = false;
        $scope.errorbanner = false;
        var picker = new Pikaday({ field: $('#datepicker')[0] });
        var pickerz = new Pikaday({ field: $('#datepickerz')[0] });

        $('#tabbles a').click(function (e) {
          e.preventDefault()
          $(this).tab('show')
        });

        //Get user information to populate participants.
        if(eventlistService.users != null || eventlistService.users != undefined) {
          //This is coming back as an array.
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

        this.addEvent = function() {
            eventlistService.postEvent(self.newEvent).then(
                function(response) {
                  $log.debug('addEvent resolve', response);
                  $scope.errorbanner = false;
                  $scope.success = true;
                  $timeout(function(){ $scope.success = false; }, 5000);
                  self.newEvent = {};
                  eventlistService.getEvents();
                }, function(error, status) {
                  $log.log('addEvent reject', error, status);
                  $scope.errorbanner = true;
                }, function(progress) {
                  $log.debug('addEvent notify', progress);
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
