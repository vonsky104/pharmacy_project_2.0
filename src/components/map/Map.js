import React, { useState } from 'react';
import { MapContainer } from './MapContainer';
import { GoogleApiWrapper } from 'google-maps-react';

const MapBase = ({ google, ...props }) => {
    return (
        <div>
            <MapContainer
                {...props}
                google={google}
            />
        </div>
    )
};

const Map = GoogleApiWrapper({
    apiKey: 'AIzaSyCNvB4QyXUU6I2gbxAI3DKCVlVESPEAAlA'
})(MapBase);

export { Map };
