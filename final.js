var finalApp = angular.module('final', ['ngRoute']);

finalApp.config(function($routeProvider) 
    {
    $routeProvider
        .when('/', 
              {
              templateUrl : 'pages/home.html',
			  })
        .when('/flightSearch', 
              {
              templateUrl : 'pages/flightSearch.html',
              controller  : 'flightController'
              })
        .when('/map',
              {
              templateUrl: 'pages/map.html',
              controller : 'MainCtrl'
              });
	});

finalApp.service("flightDestination", function(){
    this.destination = "DIA";
});
finalApp.service("rentalCompany", function(){
    this.company = "EUROCAR";
});


finalApp.controller('flightController', ['$scope', '$http', 'flightDestination', 'rentalCompany'    function($scope, $http, flightDestination, rentalCompany){
    
    $scope.destination = flightDestination.destination;
    $scope.$watch('destination', function(){
        flightDestination.destination = $scope.destination;
    });
                                         
    $scope.company = rentalCompany.company;
    $scope.$watch('destination', function(){
        rentalCompany.company = $scope.company;                                     
    });
    
//    $scope.origin = flightOrigin.origin;
//    $scope.$watch('origin', function(){
//        flightOrigin.origin = $scope.origin;
//    });
//    
//    $scope.duration = flightDuration.duration;
//    $scope.$watch('duration', function(){
//        flightDuration.duration = $scope.duration;
//    });
//    
//    $scope.direct = flightDirect.direct;
//    $scope.$watch('direct', function(){
//        flightDirect.direct = $scope.direct;
//    });
//    
//    $scope.maxPrice = flightMaxPrice.maxPrice;
//    $scope.$watch('maxPrice', function(){
//        flightMaxPrice.maxPrice = $scope.maxPrice;
//    });
    
    
  $scope.flightInfo = function(){
      $scope.numResults;
$http.get("https://api.sandbox.amadeus.com/v1.2/cars/search-airport?apikey=l912cgcrdidJdVHRdzD9Sp4JmUw7jDta&location="+$scope.destination+"&pick_up=2016-06-04&drop_off=2016-06-08")
.success(function(result){  
    console.log('yes');
    $scope.flights = [];
    
    
    for(var i = 0; i < result.results.length; i++)
        {
            $scope.flights.push(result.results[i]);
            $scope.numResults = i;
        }
})
.error(function(data, status){
     $scope.numResult = 0;
console.log('no');
   
});

    };
}]);

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}

finalApp.controller('MainCtrl', function ($scope, $window) {
    $window.map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 8
    });
});