let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 48.465956859420714, lng: 35.05531639199907 },
        zoom: 18,
    });
}