import { sportIcons, sports } from '../../config/sports';

function geocodeAddress(address, google) {
    const maps = google.maps;
    const geocoder = new maps.Geocoder();

    return new Promise(function(resolve, reject) {
        if (!address) {
            reject(false);
        }

        geocoder.geocode(
            { address },
            function(results, status) {
                if (status === 'OK') {
                    const lat = results[0].geometry.location.lat();
                    const lng = results[0].geometry.location.lng();
                    resolve({
                        success: true,
                        lat,
                        lng
                    })
                } else {
                    reject(false);
                }
            }
        );
    });
}

function mapSportToIcon(sport) {
    const index = sports.findIndex(e => e === sport);
    if (index < 0) {
        return null;
    }

    return sportIcons[index];
}


export { geocodeAddress, mapSportToIcon };
