
    import { useState, useEffect } from 'react';
    import './App.css';
    import loadGoogleMapsAPI from './assets/loadGoogleMapsAPI';
    import { initMap, getCompassDirection } from './assets/initMap';
    
    function App() {
      const [count, setCount] = useState(0);
      const [direction, setDirection] = useState('');
      const apiKey = import.meta.env.VITE_API_KEY;
    
      useEffect(() => {
        async function fetchHeading() {
          await loadGoogleMapsAPI({
            key: apiKey,
            v: "weekly",
          });
          const heading = await initMap();
          const compassDirection = getCompassDirection(heading);
          setDirection(compassDirection);
        }
    
        fetchHeading();
      }, []);
    
      return (
        <>
          <h1 id='title'>House Compass</h1>
          <p>
            House Compass is a web application that helps you find the direction a home is facing.
          </p>
          <form action="submit">
            <label htmlFor="address">Enter an address:</label>
            <input type="text" id="address" />
            <button id="submit">Submit/Reset</button>
          </form>
          <div id="pano"></div>
          <h2 id='direction'>The current direction is: {direction}</h2>
        </>
      );
    }
    
    export default App;
  
