function initMap() {
        // Create a map object and specify the DOM element for display.
        var map = new google.maps.Map(document.getElementById('map'), {
          center: { lat: 24.751365,  lng: 46.535520},
      zoom: 10,
        });
      }
var favlocations = [{
      title: 'mall',
      location: {
        lat: 24.748644,
        lng: 46.536133
      }
    },
    {
      title: 'park',
      location: {
        lat: 24.751547,
        lng: 46.534889
      }
    },
    {
      title: 'Resturant',
      location: {
        lat: 24.750339,
        lng: 46.538258
      }
    },
    {
      title: 'River?',
      location: {
        lat: 24.747981,
        lng: 46.544502
      }
    },
    {
      title: 'Library?',
      location: {
        lat: 24.754704,
        lng: 46.546347
      }
    },
  ];

function favLocations(name) {
    var self = this;
    self.name = name;
}

// Overall viewmodel for this screen, along with initial state
function ViewModel() {
    var self = this;
      
    // Editable data
    self.seats = ko.observableArray([
        new favLocations("mall"),
        new favLocations("park"),
        new favLocations("resturant"),
     new favLocations("river"),
        new favLocations("library")    
    ]);
}

ko.applyBindings(new ViewModel());
