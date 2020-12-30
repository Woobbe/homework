var inputAutocomplete = document.querySelector('#header__weather');
var defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-33.8902, 151.1759),
    new google.maps.LatLng(-33.8474, 151.2631));

var options = {
    bounds: defaultBounds,
    types: ['(regions)']
};

autocomplete = new google.maps.places.Autocomplete(inputAutocomplete, options);