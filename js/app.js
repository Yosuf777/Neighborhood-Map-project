var vm;

var locations = [{
    name: "park",
    lat: 24.748644,
    lng: 46.536133
  },
  {
    name: "Resturan",
    lat: 24.751547,
    lng: 46.534889
  },
  {
    name: "River",
    lat: 24.750339,
    lng: 46.538258
  },
  {
    name: "Library",
    lat: 24.747981,
    lng: 46.544502
  },
  {
    name: "mall",
    lat: 24.748644,
    lng: 46.536133
  }
];

function initMap() {
  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 24.751365,
      lng: 46.535520
    },
    zoom: 14,
  });


  for (var i = 0; i < locations.length; i++) {
    var marker = new google.maps.Marker({
      position: {
        lat: locations[i].lat,
        lng: locations[i].lng
      },
      map: map,
      title: locations[i].name
    });

    vm.locations()[i].marker = marker;
    marker.addListener('click', callback)

    var infoWindow;
  }

  function callback() {
    var marker = this;
    console.log(marker)

  }

  getFSData(marker, infoWindow) // pass marker and infoWindow as arguments

}

function getFSData(marker, infoWindow) {


  /*Foursquare api ajax request*/
          $.ajax({
    type: "GET",
    dataType: 'json',
    cache: false,
    url: 'https://api.foursquare.com/v2/venues/search?ll=40.7,-74&client_id=SIAUYXUJLUUIQ5VPJJ0FGE1FTPOY1KZSXYQD4OY5D2LVR5M4&client_secret=ZS4TA0NYAD2NKUWAMH3GC4BFQ1XRMAQV5N04ZIRNRBCSXLT0&v=20170101',
    async: true,
    success: function(data) {

      //Map info windows to each Location in the markers array
      var infowindow = new google.maps.InfoWindow({
      content: location.name,
      lat: locations.lat,
      lng: locations.lng

    });

      marker.addListener('click', function() {
          infowindow.marker = marker;
         infowindow.setContent('<div>' + '<h4>' + marker.title + '</h4>'  +  marker.position + '</div>');
         infowindow.open(map, marker);

         infowindow.addListener('closeclick', function() {
           infowindow.marker = null;
         });
        });


    },
    error: function(data) {
      /*callback function if error - an alert will be activaded to notify the user of the error*/
      alert("Could not load data from foursquare.");
    }
  });



}

function ViewModel() {
  var self = this;

  self.name = name;

  self.filterText = ko.observable(""); // Text from search field


  // locations data
  self.locations = ko.observableArray(locations);

  self.filteredlocations = ko.computed(function() {

    var fText = self.filterText().replace(/\s+/g, ' ');
    fTest = fText.toUpperCase();

    var filteredlocations = ko.utils.arrayFilter(self.locations(), function(test) {
      var name = test.name.toUpperCase();
      var match = name.indexOf(fText) >= 0; // true or false

      console.log(name, fText, match);

      if (test.marker) test.marker.setVisible(match); // true or false

      return match;
    })

    return filteredlocations;

  });


  self.selectedMarkers = function(currentItem) {
    console.log(currentItem);

  };

}


vm = new ViewModel();
ko.applyBindings(vm);
