var markers = [];

var map;
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

function startApp() {
	ko.applyBindings(new AppViewModel());
}
