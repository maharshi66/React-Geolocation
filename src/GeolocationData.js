import React, { useState, useEffect } from 'react'

const GeolocationData = () => {
    const [details, setDetails] = useState({});
    const [IP, setIP] = useState('');
    
    const getIP = () => {
        fetch("https://api.ipdata.com")
            .then(response => {
                return response.json();
            }, "jsonp")
            .then(res => {
                setIP(JSON.stringify(res.ip))
            })
            .catch(err => console.log(err))
    }

    const getUserGeolocation = () => {
        getIP();

        fetch(`http://ip-api.com/json/${IP}`)
            .then(res =>  res.json())
            .then(data => setDetails(data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getUserGeolocation();
    }, [IP, details])

    return (
        <div>
            <h1>With Public API:</h1>
            <ul>
                <li key='0'>Country Code: {details.countryCode}</li>
                <li key='1'>Country: {details.country}</li>
                <li key='2'>Region: {details.region}</li>
                <li key='3'>City: {details.zip}</li>                 
                <li key='4'>Timezone: {details.timezone}</li>                 
                <li key='5'>Lat: {details.lat}</li>                 
                <li key='6'>Long: {details.lon}</li>                 
            </ul>
        </div>
    )
}

export default GeolocationData
