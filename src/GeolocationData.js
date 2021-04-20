import React, { useState, useEffect } from 'react'

const GeolocationData = () => {
    const [locationAccess, setLocationAccess] = useState(false);
    const [details, setDetails] = useState({});

    const onSuccess = () => {
        setLocationAccess(true)
        fetch(`https://freegeoip.app/json/`)
            .then(res =>  res.json())
            .then(data => setDetails(data))
            .catch(err => console.log(err))
    }

    const onError = () => {
        console.log("Access Denied!");
        setLocationAccess(false);
    }

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError();
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, [details]);


    return (
        <div>
            <h1>With Public API:</h1>
            {
            locationAccess ? 
                <ul>
                    <li key='0'>Country Code: {details.country_code}</li>
                    <li key='1'>Country: {details.country_name}</li>
                    <li key='2'>Region Code: {details.region_code}</li>
                    <li key='3'>Region: {details.region_name}</li>
                    <li key='4'>City: {details.city}</li>                 
                    <li key='5'>Zip: {details.zip_code}</li>                 
                    <li key='6'>Timezone: {details.time_zone}</li>                 
                    <li key='7'>Lat: {details.latitude}</li>                 
                    <li key='8'>Long: {details.longitude}</li>                 
                </ul>
            : null
            }
        </div>
    )
}

export default GeolocationData
