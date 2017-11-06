/*jshint esversion: 6 */

var vm;

var locations = [{
    name: "1- معرض الحصان للسيارات",
    lat: 24.748644,
    lng: 46.536133
  },
  {
    name: "2- استراحة تالا",
    lat: 24.751547,
    lng: 46.534889
  },
  {
    name: "3- استراحة الدرعية الخضراء",
    lat: 24.745738,
    lng: 46.525868
  },
  {
    name: "4- Al Jawhara - Football Field",
    lat: 24.747981,
    lng: 46.544502
  },
  {
    name: "5- الدرعية",
    lat: 24.747579,
    lng: 46.525048
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

  var infoWindow = new google.maps.InfoWindow();

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
    marker.addListener('click', callback);

    //  var infoWindow;
  }

  function callback() {
    var marker = this;
    console.log(marker);
    getFSData(marker, infoWindow); // pass marker and infoWindow as arguments

    marker.setAnimation(google.maps.Animation.BOUNCE);

    setTimeout(function() {
      marker.setAnimation(null);
    }, 1400);
  }

}

function getFSData(marker, infoWindow) {
  var ll = marker.position.lat() + ',' + marker.position.lng();

  /*Foursquare api ajax request*/
  $.ajax({
    type: "GET",
    dataType: 'json',
    cache: false,
    url: 'https://api.foursquare.com/v2/venues/search?ll=' + ll + '&client_id=SIAUYXUJLUUIQ5VPJJ0FGE1FTPOY1KZSXYQD4OY5D2LVR5M4&client_secret=ZS4TA0NYAD2NKUWAMH3GC4BFQ1XRMAQV5N04ZIRNRBCSXLT0&v=20170101',
    success: function(data) {

      //Map info windows to each Location in the markers array

      console.log(data);

      var name = data.response.venues[0].name;

      var address = data.response.venues[0].location.formattedAddress;

      var referralId = data.response.venues[0].referralId;
      var id = data.response.venues[0].id;

      infoWindow.setContent('<div class="info-window">' + '<h4>' + name + '</h4>' + '<p>' + address + '</p><p>' + referralId + '</p><p>' + marker.position + '</p><p>' + id + '</p></div>');
      infoWindow.open(map, marker);


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
    });

    return filteredlocations;

  });


  self.selectedMarkers = function(currentItem) {
    console.log(currentItem);
    google.maps.event.trigger(currentItem.marker, 'click');
  };

}

/**
 * Error callback for GMap API request
 */
mapError = () => {
  // Error handling
  console.log("Error handling");
};

vm = new ViewModel();
ko.applyBindings(vm);
