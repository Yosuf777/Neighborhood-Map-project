function initMap() {
        // Create a map object and specify the DOM element for display.
        var map = new google.maps.Map(document.getElementById('map'), {
          center: { lat: 24.751365,  lng: 46.535520},
      zoom: 8,
        });
      }

  
function errorHandling() {
	alert("Error in Louding the map reconnect the internet");
}
function AppViewModel() {
    this.MALL = "MALL";
    this.PARK = "PARK";
	this.RESTERENT = "RESTERENT";
	this.RIVER = "RIVER";
	this.LIBERARY = "LIBERARY";
}

// Activates knockout.js
ko.applyBindings(new AppViewModel());

ko.applyBindings({
        locations: [
            { MALL: 'MALL'},
		{ PARK: 'PARK'},
		  { RESTERENT: 'RESTERENT'},
		  { RIVER: 'MALL'},
		{ LIBERARY: 'LIBERARY'}
		
        ]
    });
