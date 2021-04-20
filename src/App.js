import React from 'react';
import useGeolocation from './hooks/useGeolocation';
import GeolocationData from './GeolocationData'

const App = () => {
  const locationDetails = useGeolocation();

  return (
    <div className="App">
      {
        locationDetails.loaded ? 
        <div>
            <h1>
              From front-end (Custom Hook):
            </h1>
            <p>
              {JSON.stringify(locationDetails)}
            </p>
            <GeolocationData />
        </div>
        :
        null      
      }
    </div>
  );
}

export default App;
