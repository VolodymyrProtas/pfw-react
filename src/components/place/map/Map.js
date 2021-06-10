import React, {Component} from 'react';
import './Map.css';
import MapService from "../../../services/map.service";

const google = window.google;

class Map extends Component {
    componentDidMount() {
        this.getPlaceLocation();
    }

    getPlaceLocation() {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': this.props.place.capital},
            (results, status) => {
                if (status === 'OK') {
                    const lat = results[0].geometry.location.lat();
                    const lng = results[0].geometry.location.lng();
                    MapService.initMap(lat, lng);
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
    }

    render() {
        return (
            <div className="container-fluid">
                <div id="map">
                </div>
            </div>
        );
    }
}

export default Map;
