import { useState, useEffect } from 'react'

const useGeolocation = () => {
    const [locationDetails, setLocationDetails] = useState({
        loaded: false, 
        coordinates: {
            latitude: '', 
            longitude: '',
        }
    });
    
    const onSuccess = (location) => {
        setLocationDetails({
            loaded: true,
            coordinates: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            }
        })
    }

    const onError = (error) => {
        setLocationDetails({
            loaded: true,
            error: {
                code: error.code,
                message: error.message,
            },        
        })
    }

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation Access Denied",
            });
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);

    return locationDetails;
}

export default useGeolocation
