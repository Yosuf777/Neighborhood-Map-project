var map;

var markers = [];
var locations = [
          { title: 'MALL', location: {  lat: 24.748644, lng: 46.536133 } },
          { title: 'PARK', location: {  lat: 24.751547,  lng: 46.534889 } },
          { title: 'RESTERENT', location: { lat: 24.750339,lng: 46.538258 } },
          { title: 'RIVER', location: { lat: 24.747981,lng: 46.544502} },
          { title: 'LIBERARY', location: { lat: 24.754704,lng: 46.546347 } }
];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {

        center: {  lat: 24.751365,lng: 46.535520 },
        zoom: 14
    });
    for (var i = 0; i < locations.length; i++) {
        // Get the position from the location array.
        var position = locations[i].location;
        var title = locations[i].title;
        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
            position: position,
            title: title,
            map: map,
            animation: google.maps.Animation.DROP,
            id: i
        });
        markers.push(marker);
    };

    var Loc = function (data) {
        this.title = ko.observable(data.title);
        this.location = ko.observable(data.location);
    };

    var place = function (data) {
        this.name = ko.observable(data.name);
    };

    var stringStartsWith = function (string, startsWith) {
        string = string || "";
        if (startsWith.length > string.length)
            return false;
        return string.substring(0, startsWith.length) === startsWith;
    };

    var ViewModel = function () {
        var self = this;
        this.query = ko.observable('');
        this.locList = ko.observableArray('');
        this.filteredlocList = ko.computed(function () {
            var filter = self.query().toLowerCase();
            console.log(filter);
            var unwrappedLocList = ko.toJS(self.locList);
            if (!filter) {
                return unwrappedLocList
            } else {
                return ko.utils.arrayFilter(unwrappedLocList, function (item) {
                    return stringStartsWith(item.title.toLowerCase(), filter);
                });
            }
        }, this);

            this.setLoc = function (clickedLoc) {
                var unwrappedLoc = ko.toJS(clickedLoc);
                var unwrappedLocList = ko.toJS(self.locList);
                for (var i = 0; i < unwrappedLocList.length; i++) {
                    if (unwrappedLoc.title == markers[i].title) {
                        markers[i].setAnimation(google.maps.Animation.BOUNCE);
                    }
                }
            };

    };
    var vm = new ViewModel();
    ko.applyBindings(vm);
   locations.forEach(function (locItem) {
        vm.locList.push(new Loc(locItem))
    });
};
