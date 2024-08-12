import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';
import loadGoogleMapsAPI from './assets/loadGoogleMapsAPI';
import { initMap } from './assets/initMap';

function App() {
  const [count, setCount] = useState(0);
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    loadGoogleMapsAPI({
      key: apiKey,
      v: "weekly",
    });
    initMap();
  }, [apiKey]);

  return (
    <>
      <h1>House Compass</h1>
    <p>
      House Compass is a web application that helps you find the perfect house
      for you. You can search for houses based on your preferences and budget.
      You can also view the details of each house and contact the owner for more
      information.
    </p>

    <gmpx-place-picker
      placeholder="Enter an address"
      id="search-input"
    ></gmpx-place-picker>
    <button id="search">Search</button>
    <div id="pano"></div>
    </>
  )
}

export default App
