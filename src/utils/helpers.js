function loadPosition (cookies) {
    if (cookies.get('hereChecked')) {
        return {
            success: true,
            hereLat: cookies.get('hereLat'),
            hereLng: cookies.get('hereLng'),
        }
    }

    if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            pos => {
                const coordinates = pos.coords;
                cookies.set('hereLat', coordinates.latitude, {
                    path: '/',
                    maxAge: 3600
                });
                cookies.set('hereLng', coordinates.longitude, {
                    path: '/',
                    maxAge: 3600
                });
                cookies.set('hereChecked', true, {
                    path: '/',
                    maxAge: 3600
                });

                return {
                    success: true,
                    hereLat: cookies.get('hereLat'),
                    hereLng: cookies.get('hereLng'),
                }
            },
            error => {
                return {
                    success: false,
                }
            },
            {
                maximumAge: 60,
                timeout: 10000,
                enableHighAccuracy: true,
            }
        )
    } else {
        return {
            success: false,
        }
    }
}

export { loadPosition };
