var markers = [];

var map;
function initMap() {
        // Create a map object and specify the DOM element for display.
        var map = new google.maps.Map(document.getElementById('map'), {
          center: { lat: 24.751365,  lng: 46.535520},
      zoom: 8,
        });
      }

  var marker = new google.maps.Marker({
    position: tribeca,
    map: map,
    title: 'First Marker!'
  });

  var locations = [{
      title: 'اسواق السلطان',
      location: {
        lat: 24.748644,
        lng: 46.536133
      }
    },
    {
      title: 'حديقة الدرعية',
      location: {
        lat: 24.751547,
        lng: 46.534889
      }
    },
    {
      title: 'مطعم بخاري',
      location: {
        lat: 24.750339,
        lng: 46.538258
      }
    },
    {
      title: 'سد الدرعية',
      location: {
        lat: 24.747981,
        lng: 46.544502
      }
    },
    {
      title: 'مكتبة الدرعية',
      location: {
        lat: 24.754704,
        lng: 46.546347
      }
    },
  ];

        var largeInfowindow = new google.maps.InfoWindow();

                   var defaultIcon = makeMarkerIcon('0091ff');

                   var highlightedIcon = makeMarkerIcon('FFFF24');
         largeInfowindow = new google.maps.InfoWindow();

                   for (var i = 0; i < locations.length; i++) {
          var position = locations[i].location;
          var title = locations[i].title;
           marker = new google.maps.Marker({
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            icon: defaultIcon,
            id: i
          });
          markers.push(marker);
          marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
          });
          marker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
          });
          marker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
          });
        }
        document.getElementById('show-listings').addEventListener('click', showListings);
        document.getElementById('hide-listings').addEventListener('click', hideListings);
      }
      function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });
        }
      }
      function showListings() {
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
          bounds.extend(markers[i].position);
        }
        map.fitBounds(bounds);
      }
      function hideListings() {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
      }
      function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21,34));
        return markerImage;
  }
function errorHandling() {
	alert("Error in Louding the map reconnect the internet");
}

function startApp() {
	ko.applyBindings(new AppViewModel());
}
