var fav;
var marker;
function initMap() {
        // Create a map object and specify the DOM element for display.
        var map = new google.maps.Map(document.getElementById('map'), {
          center: { lat: 24.751365,  lng: 46.535520},
       zoom: 14,
        });

         fav = new Array();
          fav =[
          {lat: 24.748644,  lng: 46.536133},
          {lat: 24.751547,  lng: 46.534889},
          {lat: 24.750339,  lng: 46.538258},
          {lat: 24.747981,  lng: 46.544502},
          {lat: 24.754704,  lng: 46.546347},
          {lat: 24.748644,  lng: 46.536133}
          ];
          for(var i=1; i<fav.length; i++)
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
this.locations = ko.observableArray([
        { name: "park", lat: 24.748644,  lng: 46.536133},
        { name: "Resturan", lat: 24.751547,  lng: 46.534889},
        { name: "River", lat: 24.750339,  lng: 46.538258},
        { name: "Library",lat: 24.747981,  lng: 46.544502},
        { name: "mall" ,lat:24.748644,  lng: 46.536133}
    ]);
    self.filteredlocations = ko.computed(function () {

fText = self.filterText().replace(/\s+/g, ' ');

var filteredlocations = ko.utils.arrayFilter(self.locations(), function(test) {
            if(fText.length)
                return ( test.name.toUpperCase().indexOf(fText.toUpperCase()) >= 0);
            else
                return 1;
        });

        return filteredlocations;
    }, self);

}

$(document).ready( function(){
    var vm = new ViewModel();
    ko.applyBindings(vm);
} );
