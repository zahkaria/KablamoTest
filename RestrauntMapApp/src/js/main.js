    var mapApp = angular.module('mapComponentsApp', []);

    mapApp.value('NEW_restaurant_ID', -1);

    mapApp.service('mapService', function () {
      var map;
      this.setMap = function (myMap) {
        map = myMap;
      };
      this.getMap = function () {
        if (map) return map;
        throw new Error("Map not defined");
      };
      this.getLatLng = function () {
        var center = map.getCenter();
        return {
          lat: center.lat(),
          lng: center.lng()
        };
      };
    });

    mapApp.service('restaurantsService', function ($filter) {
      // nextId and list both have mock starting data
      this.nextId = 4;
      this.items = [
  {
    "Name":"The Winery",
    "Address":"285A Crown Street",
    "Coords":"-33.881514,151.214554",
    "Latitude":-33.881514,
    "Longitude":151.214554,
    "id":1,
    "Cuisine":"Wine Bar, Modern Australian, Desserts/Ice Cream"
  },
  {
    "Name":"Kantine",
    "Address":"185 Campbell St",
    "Coords":"-33.881194,151.215777",
    "Latitude":-33.881194,
    "Longitude":151.215777,
    "id":2,
    "Cuisine":"Modern Australian"
  },
  {
    "Name":"The Devonshire",
    "Address":"204 Devonshire St",
    "Coords":"-33.88766,151.211336",
    "Latitude":-33.88766,
    "Longitude":51.211336,
    "id":3,
    "Cuisine":"European, French, Modern Australia"
  },
  {
    "Name":"Ume",
    "Address":"478 Bourke St",
    "Coords":"-33.887037,151.215456",
    "Latitude":-33.887037,
    "Longitude":151.215456,
    "id":4,
    "Cuisine":"Japanese"
  },
  {
    "Name":"Bills",
    "Address":"359 Crown Street",
    "Coords":"-33.883955,151.214168",
    "Latitude":-33.883955,
    "Longitude":151.214168,
    "id":5,
    "Cuisine":"Modern Australian, Breakfast/Brunch, Coffee"
  },
  {
    "Name":"Vini",
    "Address":"3/118 Devonshire St",
    "Coords":"-33.886769,151.209147",
    "Latitude":-33.886769,
    "Longitude":151.209147,
    "id":6,
    "Cuisine":"Italian"
  },
  {
    "Name":"Longrain",
    "Address":"85 Commonwealth St",
    "Coords":"-33.87943,151.210756",
    "Latitude":-33.87943,
    "Longitude":51.210756,
    "id":7,
    "Cuisine":"Thai, Asian, Wine Bar"
  },
  {
    "Name":"Pazzo",
    "Address":"583 Crown St",
    "Coords":"-33.891133,151.212752",
    "Latitude":-33.891133,
    "Longitude":151.212752,
    "id":8,
    "Cuisine":"Italian"
  },
  {
    "Name":"Red Lantern",
    "Address":"545 Crown St",
    "Coords":"-33.890243,151.212795",
    "Latitude":-33.890243,
    "Longitude":151.212795,
    "id":9,
    "Cuisine":"Modern Australian"
  },
  {
    "Name":"Bodega",
    "Address":"216 Commonwealth",
    "Coords":"-33.883438,151.210134",
    "Latitude":-33.883438,
    "Longitude":151.210134,
    "id":10,
    "Cuisine":"European, French, Modern Australia"
  },
  {
    "Name":"Marque",
    "Address":"5/355 Crown St",
    "Coords":"-33.883812,151.214232",
    "Latitude":-33.883812,
    "Longitude":151.214232,
    "id":11,
    "Cuisine":"Japanese"
  },
  {
    "Name":"Bentley",
    "Address":"320 Crown St",
    "Coords":"-33.880998,151.215069",
    "Latitude":-33.880998,
    "Longitude":151.215069,
    "id":12,
    "Cuisine":"Modern Australian"
  },
  {
    "Name":"Cochin",
    "Address":"61 Fitzroy St",
    "Coords":"-33.885451,151.216121",
    "Latitude":-33.885451,
    "Longitude":151.216121,
    "id":13,
    "Cuisine":"Italian"
  },
  {
    "Name":"4Fourteen",
    "Address":"414 Bourke",
    "Coords":"-33.885077,151.216013",
    "Latitude":-33.885077,
    "Longitude":151.216013,
    "id":14,
    "Cuisine":"Thai, Asian, Wine Bar"
  },
  {
    "Name":"Carrington Hotel",
    "Address":"563 Bourke",
    "Coords":"-33.88766,151.215305",
    "Latitude":-33.88766,
    "Longitude":51.215305,
    "id":15,
    "Cuisine":"Modern Australian"
  },
  {
    "Name":"Wasabi Bistro",
    "Address":"8/423 Bourke",
    "Coords":"-33.882761,151.216142",
    "Latitude":-33.882761,
    "Longitude":151.216142,
    "id":16,
    "Cuisine":"Japanese"
  },
  {
    "Name":"The Louvre Room",
    "Address":"122 Flinders Street",
    "Coords":"-33.88465,151.218181",
    "Latitude":-33.88465,
    "Longitude":51.218181,
    "id":17,
    "Cuisine":"Italian"
  },
  {
    "Name":"East Village Hotel",
    "Address":"234 Palmer Street",
    "Coords":"-33.877595,151.216679",
    "Latitude":-33.877595,
    "Longitude":151.216679,
    "id":18,
    "Cuisine":"Thai, Asian, Wine Bar"
  },
  {
    "Name":"Jazz City Diner",
    "Address":"238 Crown Street",
    "Coords":"-33.878165,151.215734",
    "Latitude":-33.878165,
    "Longitude":151.215734,
    "id":19,
    "Cuisine":"Modern Australian"
  },
  {
    "Name":"Sushi Train",
    "Address":"22/63 Oxford Street",
    "Coords":"-33.878539,151.214039",
    "Latitude":-33.878539,
    "Longitude":151.214039,
    "id":20,
    "Cuisine":"Japanese"
  }
      ];
      this.filter = {};
      this.filtered = function () {
        return $filter('filter')(this.items, this.filter);
      };
      this.remainingCount = function () {
        return $filter('filter')(this.items, {completed: false}).length;
      };
      this.getrestaurantById = function (restaurantId) {
        var restaurant, i;
        for (i = this.items.length - 1; i >= 0; i--) {
          restaurant = this.items[i];
          if (restaurant.id === restaurantId) {
            console.log(restaurant);
            return restaurant;
          }
        }
        return false;
      };
    });

    mapApp.service('markersService', function () {
      this.markers = [];
      this.getMarkerByrestaurantId = function (restaurantId) {
        var marker, i;
        for (i = this.markers.length - 1; i >= 0; i--) {
          marker = this.markers[i];
          if (marker.get("id") === restaurantId) {
            return marker;
          }
        }
        return false;
      };
    });

    mapApp.service('infoWindowService', function (mapService) {
      var infoWindow;
      this.data = {};
      this.registerInfoWindow = function (myInfoWindow) {
        infowindow = myInfoWindow;
      };
      this.setData = function (restaurantId, restaurantName, restaurantAddress, restaurantCuisine) {
        this.data.id = restaurantId;
        this.data.name = restaurantName;
        this.data.address = restaurantAddress;
        this.data.cuisine = restaurantCuisine;
      };
      this.open = function (marker) {
        infowindow.open(mapService.getMap(), marker);
      };
      this.close = function () {
        if (infowindow) {
          infowindow.close();
          this.data = {};
        }
      };
    });

    mapApp.service('mapControlsService', function (infoWindowService, markersService, NEW_restaurant_ID) {
      this.openInfoWindowByrestaurantId = function (restaurantId) {
        var marker = markersService.getMarkerByrestaurantId(restaurantId);
        console.log(marker);        
        if (marker) {
          infoWindowService.setData(restaurantId, marker.get("name"), marker.get("address"), marker.get("cuisine"));
          infoWindowService.open(marker);
          return; 
        }
      };
    });

    mapApp.directive('restaurantMaps', function ($compile) {
      return {
        controller: function ($scope, $location, mapService, mapControlsService, infoWindowService, restaurantsService, markersService) {
          if ($location.path() === '') {
            $location.path('/');
          }

          $scope.location = $location;
          $scope.infow = infoWindowService;
          $scope.controls = mapControlsService;

          this.registerInfoWindow = function (myInfoWindow) {
            infoWindowService.registerInfoWindow(myInfoWindow);
          };

          this.registerMap = function (myMap) {
            mapService.setMap(myMap);
            $scope.restaurants = restaurantsService;
          };


          $scope.$watch('location.path() + restaurants.nextId + restaurants.remainingCount()', function () {
            var i,
              restaurants = restaurantsService.filtered(),
              map = mapService.getMap(),
              restaurantId,
              marker,
              markers = markersService.markers,
              markerId,
              uniquerestaurants = {};

            function addMarkerByrestaurantIndex (restaurantIndex) {
              var marker,
                markerOptions,
                restaurant = restaurants[restaurantIndex];

              markerOptions = {
                map: map,
                title: restaurant.title,
                position: new google.maps.LatLng(restaurant.Latitude, restaurant.Longitude)
              };
              marker = new google.maps.Marker(markerOptions);
              marker.setValues({
                id: restaurant.id,
                address: restaurant.Address,
                name: restaurant.Name,
                cuisine: restaurant.Cuisine
              });
              markersService.markers.push(marker);

              function markerClickCallback (scope, restaurantId) {
                return function () {
                  scope.$apply(function () {
                    mapControlsService.openInfoWindowByrestaurantId(restaurantId);
                  });
                };
              }
              google.maps.event.addListener(marker, 'click', markerClickCallback($scope, restaurant.id));
            }

            for (i = restaurants.length - 1; i >= 0; i--) {
              uniquerestaurants[restaurants[i].id] = i;
            }  

            for (i = markers.length - 1; i >= 0; i--) {
              marker = markers[i];
              markerId = marker.get("id");
              if (uniquerestaurants[markerId] !== undefined) {
                delete uniquerestaurants[markerId];
              } else {
                marker.setMap(null);
                markers.splice(i,1);
              }
            }

            for (restaurantId in uniquerestaurants) {
              if (uniquerestaurants.hasOwnProperty(restaurantId)) {
                addMarkerByrestaurantIndex(uniquerestaurants[restaurantId]);
              }
            }
          });
        },
        link: function (scope, elem, attrs, ctrl) {
          var mapOptions,
            latitude = attrs.latitude,
            longitude = attrs.longitude,
            infoWindowTemplate,
            infoWindowElem,
            infowindow,
            restaurantsControlTemplate,
            restaurantsControlElem,
            mapStyles,
            map;

          latitude = latitude && parseFloat(latitude, 10) || -33.881514;
          longitude = longitude && parseFloat(longitude, 10) || 151.214554;

          infoWindowTemplate = document.getElementById('infoWindowTemplate').innerHTML.trim();
          infoWindowElem = $compile(infoWindowTemplate)(scope);
          infowindow = new google.maps.InfoWindow({
            content: infoWindowElem[0]
          });

          ctrl.registerInfoWindow(infowindow);

          mapStyles = [{
            featureType: 'all',
          }];

          mapOptions = {
            zoom: 15,
            disableDefaultUI: true,
            center: new google.maps.LatLng(latitude, longitude),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: mapStyles
          };

          google.maps.visualRefresh = true;

          map = new google.maps.Map(elem[0], mapOptions);

          ctrl.registerMap(map);

          restaurantsControlTemplate = document.getElementById('restaurantsControlTemplate').innerHTML.trim();
          restaurantsControlElem = $compile(restaurantsControlTemplate)(scope);
          map.controls[google.maps.ControlPosition.TOP_LEFT].push(restaurantsControlElem[0]);
        }
      };
    });