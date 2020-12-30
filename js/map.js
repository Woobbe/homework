var map;

function initMap() {
    const posHillel = { lat: 48.465956859420714, lng: 35.05531639199907 },
    map = new google.maps.Map(document.getElementById("map"), {
        center: posHillel,
        zoom: 18,

    });
}