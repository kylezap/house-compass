import React, { useState, useCallback } from "react";
import MapComponent from "./components/MapComponent";
import { LoadScript } from "@react-google-maps/api";
import "./App.css";

function App() {
  const [direction, setDirection] = useState("");
  const [facing, setFacing] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [address, setAddress] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const apiKey = import.meta.env.VITE_API_KEY;

  // Function to handle the button click
  const handleButtonClick = () => {
    const addressInput = document.getElementById("address");
    const addressValue = addressInput.value;
  
    // Check if the input value is different from the current address
    if (addressValue !== address) {
      setAddress(addressValue);
      setIsSubmitted(true);
      setSuccessMessage("Address submitted successfully!");
  
      // Clear the input value
      addressInput.value = "";
    }
  };

  // Function to handle the heading change
  const handleHeadingChange = useCallback((heading) => {
    const direction = getCompassDirection(heading);
    const facing = getFacingDirection(heading);
    setDirection(direction);
    setFacing(facing);
  }, []);

  const isBetween = (value, min, max) => value >= min && value < max;

  const getCompassDirection = (heading) => {
    if (isBetween(heading, -22.5, 22.5)) {
      return "North";
    } else if (isBetween(heading, 22.5, 67.5)) {
      return "Northeast";
    } else if (isBetween(heading, 67.5, 112.5)) {
      return "East ";
    } else if (isBetween(heading, 112.5, 157.5)) {
      return "Southeast";
    } else if (
      isBetween(heading, 157.5, 180) ||
      isBetween(heading, -180, -157.5)
    ) {
      return "South";
    } else if (isBetween(heading, -157.5, -112.5)) {
      return "Southwest";
    } else if (isBetween(heading, -112.5, -67.5)) {
      return "West";
    } else if (isBetween(heading, -67.5, -22.5)) {
      return "Northwest";
    }
  };

  const oppositeDirections = {
    North: "South",
    Northeast: "Southwest",
    East: "West",
    Southeast: "Northwest",
    South: "North",
    Southwest: "Northeast",
    West: "East",
    Northwest: "Southeast",
  };

  const getFacingDirection = (heading) => {
    const compassDirection = getCompassDirection(heading);
    return oppositeDirections[compassDirection];
  };

  // Function to handle autocomplete of address input value through Google API
  const handleAutocomplete = () => {
    const addressInput = document.getElementById("address");
    const autocomplete = new google.maps.places.Autocomplete(addressInput);
    autocomplete.setFields(["address_components", "geometry", "icon", "name"]);
  };

  return (
    <>
      <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}>
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h1 id="title" className="text-4xl/8 font-bold mb-4">
                House Compass 🧭
              </h1>
              <p className="my-4 text-xl">
                Find the direction of any home.
              </p>
              <input
                type="text"
                id="address"
                placeholder="Enter an address"
                onFocus={handleAutocomplete}
                className="border p-2 mb-4 w-full"
              />
              <button
                id="submit"
                onClick={handleButtonClick}
                className="bg-blue-500 text-white p-2 rounded w-full"
              >
                Find Directions
              </button>
              {isSubmitted && (
                <>
                  <h2 className="my-4 text-3xl">{address}</h2>
                  <h2 id="direction" className="text-xl mt-4 animate-slideUp">
                    From the street looking at home: {direction}
                  </h2>
                  <h2 id="facing" className="text-xl mt-2 animate-slideUp">
                    From the home looking at street: {facing}
                  </h2>
                  <p className="success-message text-green-500 mt-2 animate-slideUp">
                    {successMessage}
                  </p>
                </>
              )}
            </div>
            <div>
              {isSubmitted && (
                <MapComponent
                  address={address}
                  onHeadingChange={handleHeadingChange}
                />
              )}
            </div>
          </div>
        </div>
      </LoadScript>
    </>
  );
}

export default App;
