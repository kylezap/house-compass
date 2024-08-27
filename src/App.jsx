import React, { useState } from 'react';
import MapComponent from './components/MapComponent';
import { LoadScript } from '@react-google-maps/api';
import './App.css';

function App() {
  const [direction, setDirection] = useState('');
  const [facing, setFacing] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [address, setAddress] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const apiKey = import.meta.env.VITE_API_KEY;

  const handleButtonClick = () => {
    const addressInput = document.getElementById('address');
    const address = addressInput.value;
    setAddress(address);
    setIsSubmitted(true);
    setSuccessMessage('Address submitted successfully!');
    addressInput.value = '';
  };

  const handleHeadingChange = (heading) => {
    const direction = getCompassDirection(heading);
    setDirection(direction);
    setFacing(direction);
  };

  const getCompassDirection = (heading) => {
    if (heading >= 0 && heading < 45) return 'North';
    if (heading >= 45 && heading < 135) return 'East';
    if (heading >= 135 && heading < 225) return 'South';
    if (heading >= 225 && heading < 315) return 'West';
    return 'North';
  };

  return (
    <>
      <LoadScript googleMapsApiKey={apiKey}>
        <h1 id="title">House Compass</h1>
        <p>House Compass is a web application that helps you find the direction a home is facing.</p>
        <input type="text" id="address" placeholder="Enter an address" />
        <button id="submit" onClick={handleButtonClick}>
          Submit/Reset
        </button>

        {isSubmitted && (
          <>
            <h2 id="direction">The current direction is: {direction}</h2>
            <h2 id="facing">The home faces: {facing}</h2>
            <p className="success-message">{successMessage}</p>
            <MapComponent address={address} onHeadingChange={handleHeadingChange} />
          </>
        )}
      </LoadScript>
    </>
  );
}

export default App;