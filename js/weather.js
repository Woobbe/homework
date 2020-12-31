var inputAutocomplete = document.querySelector('#header__weather');
var defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(48.465956859420714, 35.05531639199907));

var options = {
    bounds: defaultBounds,
    types: ['(regions)']
};

autocomplete = new google.maps.places.Autocomplete(inputAutocomplete, options);