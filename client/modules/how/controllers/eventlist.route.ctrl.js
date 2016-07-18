(function() {
  angular.module('app.how').controller('eventlistRouteCtrl',
      function($log, $scope, eventlistService) {
        $log.debug('Initializing eventlistRouteCtrl');

        var self = this;
        $scope.errormessage = false;

        this.searchEvents = function() {
          var time = $('#datepicker').val();
          if(eventlistService.fulllist[0] != null || eventlistService.fulllist[0] != undefined) {
            $scope.errormessage = false;
            if(time != "") {
              var results = [];
              for(var i = 0; i < eventlistService.fulllist[0].events.length; i++) {
                if(eventlistService.fulllist[0].events[i].starttime.includes(time)) {
                  results.push(eventlistService.fulllist[0].events[i]);
                }
              }
              eventlistService.eventlist = results;
              $('#eventheader').text("Events for " + time);
            } else {
              $scope.errormessage = true;
              $('#eventheader').text("Error!");
            }

          } else {

          }
        };

        /*
        In this controller, I need to make it so that I can populate the list dependent on what time they select. Gonna need an array of objects, and search through all the events to see which event(s) fall on that date, and display them on an ng-repeat in the html.
        Also, displaying in the modal, need to be able to access the information and edit it.
        Modal information should include:
        1. Event name
        2. Event time
        3. Event Chapter
        4. Event Location
        5. People attending (participants, volunteers)

        */



      });
})();
