import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MapStyles from './MapStyles';

class MapContainer extends Component {
    componentDidMount() {
        this.loadMap();
    }

    loadMap = () => {
        if (this.props && this.props.google) {
            const { google } = this.props;
            const maps = google.maps;
            const directionsService = new maps.DirectionsService();
            const distanceMatrix = new maps.DistanceMatrixService();
            const directionsDisplay = new maps.DirectionsRenderer();
            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);
            const centerObject = this.props.event || this.props.hereChecked ? {  lat: parseFloat(this.props.hereLat), lng: parseFloat(this.props.hereLng) } : {  lat: 54.344406, lng: 18.70492 };
            const mapConfig = Object.assign(
                {},
                {
                    center: centerObject,
                    zoom: this.props.event ? 16 : 12,
                    mapTypeId: 'roadmap',
                    styles: MapStyles
                }
            );

            this.map = new maps.Map(node, mapConfig);
            directionsDisplay.setMap(this.map);
            this.props.data && this.props.data.map(location => {
                let lngNew = parseFloat(location.lng);
                let latNew = parseFloat(location.lat);
                const infowindow = new google.maps.InfoWindow({
                    content: location.name
                });
                const marker = new google.maps.Marker({
                    position: { lat: latNew, lng: lngNew },
                    map: this.map
                });
                marker.addListener('click', function() {
                    infowindow.open(this.map, marker);
                });
            });

            let lngHere = parseFloat(this.props.hereLng);
            let latHere = parseFloat(this.props.hereLat);

            function calculateAndDisplay(directionsService, directionsDisplay, destLng, destLat) {
                let lngNew = parseFloat(destLng);
                let latNew = parseFloat(destLat);
                directionsService.route(
                    {
                        origin: { lat: latHere, lng: lngHere },
                        destination: { lat: latNew, lng: lngNew },
                        travelMode: 'DRIVING'
                    },
                    function(response, status) {
                        if (status === 'OK') {
                            directionsDisplay.setDirections(response);
                        } else {
                            window.alert('Directions request failed due to ' + status);
                        }
                    }
                );
            }

            const infowindow = new google.maps.InfoWindow({
                content: !this.props.event ? 'Tu jesteś' : 'Wydarzenie'
            });

            const markerHere = new google.maps.Marker({
                position: { lat: latHere, lng: lngHere },
                map: this.map,
            });

            markerHere.addListener('click', function() {
                infowindow.open(this.map, markerHere);
            });

            if (this.props.destSearch) {
                calculateAndDisplay(directionsService, directionsDisplay, this.props.destLng, this.props.destLat);
            } else if (this.props.destMatrix) {
                if (this.props.dataFromNavigation.length > 0) {
                    const navMatrix = this.props.dataFromNavigation;
                    let navMatrixNew = navMatrix.map(item => ({
                        lat: parseFloat(item.lat),
                        lng: parseFloat(item.lng),
                    }));

                    calculateMatrix(distanceMatrix, navMatrixNew);
                } else {
                    const dataMatrix = this.props.data;
                    let dataMatrixNew = dataMatrix.map(item => ({
                        lat: parseFloat(item.lat),
                        lng: parseFloat(item.lng),
                    }));

                    calculateMatrix(distanceMatrix, dataMatrixNew);
                }

                function calculateMatrix(distanceMatrix, source) {
                    distanceMatrix.getDistanceMatrix({
                            origins: [{ lat: latHere, lng: lngHere }],
                             destinations: source,
                            travelMode: 'DRIVING',
                        }, function(response, status) {
                            if (status !== 'OK') {
                                console.error('Error on google API side');
                            } else {
                                let dataClosest = [];
                                for (let key in response.rows[0].elements) {
                                    dataClosest.push({
                                        ...response.rows[0].elements[key]
                                    });
                                }

                                let smallest;
                                let indexArray;
                                dataClosest.map((item, index) => {
                                    if (smallest === undefined) {
                                        smallest = item.distance.value;
                                        indexArray = index;
                                    } else {
                                        if (smallest > item.distance.value) {
                                            smallest = item.distance.value;
                                            indexArray = index;
                                        }
                                    }
                                });
                                calculateAndDisplay(directionsService, directionsDisplay, source[indexArray].lng, source[indexArray].lat);
                            }
                        }
                    )
                }
            }

        }
    };

    componentDidUpdate() {
        if(this.props.destSearch || this.props.destMatrix) {
            this.loadMap();
        }
    }

    render() {
        const styles = {
            width: '100%',
            height: '75vh'
        };

        return (
            <div ref="map" style={styles}>
                Ładowanie mapy...
            </div>
        );
    }
}

export { MapContainer };
