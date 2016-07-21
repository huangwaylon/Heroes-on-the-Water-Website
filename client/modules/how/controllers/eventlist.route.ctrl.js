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
