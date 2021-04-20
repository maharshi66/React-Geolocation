import React from 'react';
import useGeolocation from './hooks/useGeolocation';

const App = () => {
  const location = useGeolocation();

  return (
    <div className="App">
      {
        location.latLong.loaded ? 
        <div>
            <h1>
              From front-end (Custom Hook):
            </h1>
            <p>
              {JSON.stringify(location)}
            </p>
        </div>
        :
        null      
      }
    </div>
  );
}

export default App;
