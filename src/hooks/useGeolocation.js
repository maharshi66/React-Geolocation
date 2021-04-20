import { useState, useEffect } from 'react'

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

        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&localityLanguage=en`)
            .then((res) => res.json())
            .then((data) => {
                setGeoData({country: data.countryName, 
                            state: data.principalSubdivision, 
                            city: data.city, 
                })
            })
            .catch(err => console.log(err))
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
