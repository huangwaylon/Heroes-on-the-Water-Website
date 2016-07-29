(function() {
    angular.module('app.how').controller('chaptersRouteCtrl',
        function($log, $scope, chapterService) {
            var self = this;
            $('#tabs a').click(function (e) {
              e.preventDefault()
              $(this).tab('show')
            });


            //Function sets a watch on chapterService, sets $scope to chapters and starts
            //loadScript if there are more than one chapter to parse through.
            $scope.callService = function() {
                $scope.$watch(function() {
                    return chapterService.chapters;
                }, function() {
                    self.chapters = chapterService.chapters;
                    self.filteredChapters = self.chapters;
                    if (self.chapters.length > 0) {
                        $scope.loadScript();
                    }
                });
            }

            //If input box for address/zip changes, show all chapters again.
            $scope.addressChange = function() {
              if($('#addressinput').val() == "") {
                self.filteredChapters = chapterService.chapters;
                if (self.chapters.length > 0) {
                    $scope.loadScript();
                }
              }
            }

            //Init google maps
            $scope.initialize = function() {
                $scope.mapOptions = {
                    zoom: 4,
                    center: new google.maps.LatLng(37.09024, -95.712891)
                };
                $scope.map = new google.maps.Map(document.getElementById('map'), $scope.mapOptions);
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        var pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        $scope.map.setCenter(pos);
                        $scope.map.setZoom(6);
                        var userLocation = new google.maps.Marker({
                            position: pos,
                            map: $scope.map,
                            title: 'Your location'
                        });
                    });
                }
                $scope.drawChapters(self.chapters);
            }

            //load google api scripts
            $scope.loadScript = function() {
                //Already visisted chapters page before, now returning. Don't re-add script
                if (typeof google === 'object' && typeof google.maps === 'object') {
                    $scope.initialize();
                } else {
                    var script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.src = 'https://maps.google.com/maps/api/js';
                    document.body.appendChild(script);
                    defer($scope.initialize);
                }
            }

            // function waits until google maps script is loaded before trying to initialize
            function defer(method) {
                if (typeof google === 'object' && typeof google.maps === 'object') {
                    method();
                } else {
                    setTimeout(function() { defer(method) }, 50);
                }
            }

            //draws chapters on top of map
            $scope.drawChapters = function(chapters) {
                var infoWindow = new google.maps.InfoWindow();

                for (var i = 0; i < chapters.length; i++) {
                    var content = "<h4>" + chapters[i].name + "</h4>" + chapters[i].description + "<br>" + chapters[i].web_link + "Email: " + chapters[i].email;
                    var marker = new google.maps.Marker({
                        position: {
                            lat: parseFloat(chapters[i].lat),
                            lng: parseFloat(chapters[i].lng)
                        },
                        map: $scope.map,
                        icon: '/images/how-pin.png',
                        title: chapters[i].name
                    });
                    //Attach click event to the marker.
                    (function(marker, content) {
                        google.maps.event.addListener(marker, "click", function(e) {
                            //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
                            infoWindow.setContent("<div style = 'width:300px;min-height:100px'>" + content + "</div>");
                            infoWindow.open($scope.map, marker);
                        });
                    })(marker, content);

                }
            }

            //takes form info and filters based on address or zip
            $scope.submitForms = function() {
                var lat = '';
                var lng = '';
                var coordinates = [0, 0];
                geocoder = new google.maps.Geocoder();
                geocoder.geocode({ 'address': $scope.formAddress }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        lat = results[0].geometry.location.lat();
                        lng = results[0].geometry.location.lng();
                        $scope.filterByDistance(lat, lng);
                    } else {
                        alert("Geocode was not successful for the following reason: " + status);
                    }
                });
            }

            //helper function for filtering lat lng
            $scope.filterByDistance = function(lat1, lng1) {
                self.filteredChapters = [];
                for(var i=0; i<self.chapters.length; i++){
                	var lat2 = self.chapters[i].lat;
                	var lng2 = self.chapters[i].lng;
                	if (distance(lat1, lng1, lat2, lng2) < $scope.formDistance){
                		self.filteredChapters.push(self.chapters[i]);
                	}
                }
                $scope.$apply();
            }

            function distance(lat1, lng1, lat2, lng2) {
                var p = 0.017453292519943295; // Math.PI / 180
                var c = Math.cos;
                var a = 0.5 - c((lat2 - lat1) * p) / 2 +
                    c(lat1 * p) * c(lat2 * p) *
                    (1 - c((lng2 - lng1) * p)) / 2;

                return 7918 * Math.asin(Math.sqrt(a)); // 2 * R; R = 3959 mi
            }

        });
})();
