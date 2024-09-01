import React, { useState, useEffect } from 'react';
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

  // Function to handle the button click
  const handleButtonClick = () => {
    const addressInput = document.getElementById('address');
    const address = addressInput.value;
    setAddress(address);
    setIsSubmitted(true);
    setSuccessMessage('Address submitted successfully!');
    addressInput.value = '';
  };

  // Function to handle the heading change
  const handleHeadingChange = (heading) => {
    const direction = getCompassDirection(heading);
    const facing = getFacingDirection(heading);
    setDirection(direction);
    setFacing(facing);
  };

  // Function to get the compass direction
  const getCompassDirection = (heading) => {
    if (heading >= 337.5 || heading < 22.5) {
      return 'N';
    } else if (heading >= 22.5 && heading < 67.5) {
      return 'NE';
    } else if (heading >= 67.5 && heading < 112.5) {
      return 'E';
    } else if (heading >= 112.5 && heading < 157.5) {
      return 'SE';
    } else if (heading >= 157.5 && heading < 202.5) {
      return 'S';
    } else if (heading >= 202.5 && heading < 247.5) {
      return 'SW';
    } else if (heading >= 247.5 && heading < 292.5) {
      return 'W';
    } else if (heading >= 292.5 && heading < 337.5) {
      return 'NW';
    }
  };

  // Function to get the facing direction
  const getFacingDirection = (heading) => {
    if (heading >= 337.5 || heading < 22.5) {
      return 'S';
    } else if (heading >= 22.5 && heading < 67.5) {
      return 'SW';
    } else if (heading >= 67.5 && heading < 112.5) {
      return 'W';
    } else if (heading >= 112.5 && heading < 157.5) {
      return 'NW';
    } else if (heading >= 157.5 && heading < 202.5) {
      return 'N';
    } else if (heading >= 202.5 && heading < 247.5) {
      return 'NE';
    } else if (heading >= 247.5 && heading < 292.5) {
      return 'E';
    } else if (heading >= 292.5 && heading < 337.5) {
      return 'SE';
    }
  };

  // Function to handle autocomplete of address input value through Google API
  const handleAutocomplete = () => {
    const addressInput = document.getElementById('address');
    const autocomplete = new google.maps.places.Autocomplete(addressInput);
    autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);
  };

  return (
    <>
      <LoadScript googleMapsApiKey={apiKey} libraries={['places']}>
        <h1 id="title">House Compass</h1>
        <p>Search and find what direction any home faces</p>
        <input type="text" id="address" placeholder="Enter an address" onFocus={handleAutocomplete} />
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