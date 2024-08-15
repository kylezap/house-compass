
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
            House Compass is a web application that helps you find the perfect house
            for you. You can search for houses based on your preferences and budget.
            You can also view the details of each house and contact the owner for more
            information.
          </p>
          
          <input type="text" />
          <button id="search">Search</button>
          <div id="pano"></div>
          <h2>The current direction is: {direction}</h2>
        </>
      );
    }
    
    export default App;
  
