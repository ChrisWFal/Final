var finalApp = angular.module('final', ['ngRoute']);

finalApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
        })
        .when('/carRental', {
            templateUrl: 'pages/rental.html',
            controller: 'rentalController'
        })
        .when('/map', {
            templateUrl: 'pages/map.html',
            controller: 'mapController'
        });
});

finalApp.service("destination", function () {
    this.destination = "DIA";
});



finalApp.controller('rentalController', ['$scope', '$http', 'destination', function ($scope, $http, destination) {

    $scope.destination = destination.destination;
    $scope.$watch('destination', function () {
        destination.destination = $scope.destination;
    });


    $scope.rentalInfo = function () {
        $scope.numResults;
        $http.get("https://api.sandbox.amadeus.com/v1.2/cars/search-airport?apikey=uJPjGEi3CAx9nfAEoPu6ay2iqKyveDpp&location="+$scope.destination+"&pick_up=2016-06-04&drop_off=2016-06-08")
            .success(function (result) {
                console.log('yes');
                $scope.rentals = [];


                for (var i = 0; i < result.results.length; i++) {
                    $scope.rentals.push(result.results[i]);
                }
            })
            .error(function (data, status) {
                $scope.numResult = 0;
                console.log('no');

            });

    };
}]);

var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 8
    });
}

finalApp.controller('map Controller', function ($scope, $window) {
    $window.map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 8
    });
});