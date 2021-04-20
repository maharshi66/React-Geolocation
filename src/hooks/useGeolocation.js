import { useState, useEffect } from 'react'
import axios from 'axios';

const useGeolocation = () => {
    const [latLong, setLatLong] = useState({
        loaded: false, 
        coordinates: {
            latitude: '', 
            longitude: '',
        }
    });
    
    const [geoData, setGeoData] = useState({
        country: '',
        state: '',
        city: '',
    });
    
    const onSuccess = (location) =>  {

        setLatLong({
            loaded: true,
            coordinates: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            }
        })

        axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&localityLanguage=en`)
            .then((res) => {
                setGeoData({country: res.data.countryName, 
                            state: res.data.principalSubdivision, 
                            city: res.data.city, 
                })
            })
        }

    const onError = (error) => {
        setLatLong({
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

    return {latLong, geoData};
}

export default useGeolocation
