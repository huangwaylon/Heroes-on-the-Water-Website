(function() {
    angular.module('app.how').controller('chaptersRouteCtrl',
        function($log, $scope, chapterService) {
            $log.debug('Initializing chaptersRouteCtrl');

            var self = this;

            $scope.$watch(function() {
                return chapterService.chapters;
            }, function() {
                self.chapters = chapterService.chapters;
            });

            this.getChapters = function() {
                chapterService.getChapters().then(
                    function(response) {
                        $log.debug('getChapters resolve', response);
                    },
                    function(error, status) {
                        $log.log('getChapters reject', error, status);
                        alert(error);
                    },
                    function(progress) {
                        $log.debug('getChapters notify', progress);
                        alert('progress: ' + progress);
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
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = 'https://maps.google.com/maps/api/js';
                document.body.appendChild(script);
                defer($scope.initialize);
            }

            // function waits until google maps script is loaded before trying to initialize
            function defer(method) {
                if (typeof google === 'object' && typeof google.maps === 'object') {
                    method();
                }
                else{
                    setTimeout(function() { defer(method) }, 50);
                }
            }

            $scope.drawChapters = function(chapters) {
                for (var i = 0; i < chapters.length; i++) {
                    var chapterLocation = new google.maps.Marker({
                        position: {
                            lat: parseFloat(chapters[i].lat),
                            lng: parseFloat(chapters[i].lng)
                        },
                        map: $scope.map,
                        icon: '/images/how-pin.png',
                        title: chapters[i].name
                    });
                }
            }
        });
})();
