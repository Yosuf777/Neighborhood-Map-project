var map;

function initMap() {
  // 1- map object
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: {
      lat: 24.751365,
      lng: 46.535520
    },

  });
  // 2- knockout
  $(document).ready(function() {
    var vm = new ViewModel();
    ko.applyBindings(vm);
  });

  //3-Place Data
var Places = function(data){
var self = this;
self.title = ko.observable(data.title);
self.lat = ko.observable(data.lat);
self.lng = ko.observable(data.lng);
self.marker=ko.observable();
};
//Favorite Location Data as array of object
var Locations=[{
title: 'Riyadh City',
  lat: 24.713552,
  lng: 46.675296
},{
title: 'Garawi Center',
  lat: 24.712120,
  lng: 46.670973
},{
title: 'FourSeasons Hotel',
  lat: 24.711379,
  lng: 46.674385
},{
title: 'Kingdom Tower',
  lat: 24.712061,
  lng: 46.675951
},{
title: 'Olaya Center',
  lat: 24.713933,
  lng: 46.672261
},{
title: 'Night Coffee',
  lat: 24.713124,
  lng: 46.673033
},{
title: 'Fransch Bank',
  lat: 24.714030,
  lng: 46.675383
}
]

var ViewModel=function(){

var location;
var marker;
var input;
var venue;
var self = this;
var Infowindow = new google.map.Infowindow({maxwidth:200});
}
var bounds = new google.maps.LatLngBounds();

self.PlacesData=ko.observableArray([]);
locations.forEech(function(PlacesData)){
 self.PlacesData.push(new Places(PlacesData));
});


self.Places().forEech(function(PlacesData)){


  marker = new google.map.Marker({
    position: new google.maps.LatLng(PlacesData.lat(),PlacesData.lng()),
    map: map,
  });
  bounds.extend(marker.position);
  PlacesData.marker = marker ;
}
  /*fav = new Array();
  fav = [{
      lat: 24.748644,
      lng: 46.536133
    },
    {
      lat: 24.751547,
      lng: 46.534889
    },
    {
      lat: 24.750339,
      lng: 46.538258
    },
    {
      lat: 24.747981,
      lng: 46.544502
    },
    {
      lat: 24.754704,
      lng: 46.546347
    },
    {
      lat: 24.748644,
      lng: 46.536133
    }
  ];
  for (var i = 1; i < fav.length; i++)
    marker = new google.maps.Marker({
      position: fav[i],
      map: map,
      title: name
    })
}

function ViewModel(locations) {
  var self = this;

  self.name = name;

  self.filterText = ko.observable(""); // Text from search field


  // locations data
  this.locations = ko.observableArray([{
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
  ]);
  self.filteredlocations = ko.computed(function() {

    fText = self.filterText().replace(/\s+/g, ' ');

    var filteredlocations = ko.utils.arrayFilter(self.locations(), function(test) {
      if (fText.length)
        return (test.name.toUpperCase().indexOf(fText.toUpperCase()) >= 0);
      else
        return 1;
    });

    return filteredlocations;
  }, self);

}*/
