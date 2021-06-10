const google = window.google;

const initMap = (lat, lng) => {
    const myLatLng = {lat: lat, lng: lng};
    const map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 5
    });

    new google.maps.Marker({
        map: map,
        position: myLatLng
    });
}

export default {initMap}