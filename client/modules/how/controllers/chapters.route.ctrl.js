(function() {
    angular.module('app.how').controller('chaptersRouteCtrl',
        function($log, $scope, chapterService) {
            $log.debug('Initializing chaptersRouteCtrl');

            var self = this;

            $scope.callService = function() {
                $scope.$watch(function() {
                    return chapterService.chapters;
                }, function() {
                    self.chapters = chapterService.chapters;
                    if (self.chapters.length > 0) {
                        $scope.loadScript();
                    }
                });
            }

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
                $scope.drawChapters($scope.chaptersCtrl.chapters);
            }

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
                $scope.chaptersCtrl.chapters = [];
            }
        });
})();
