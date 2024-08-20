import { useState, useEffect } from "react";
import "./App.css";
import loadGoogleMapsAPI from "./assets/loadGoogleMapsAPI";
import { initMap, getCompassDirection, getFacingDirection } from "./assets/initMap";

function App() {
  const [direction, setDirection] = useState("");
  const [facing, setFacing] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [address, setAddress] = useState("");

  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    async function fetchHeading() {
      await loadGoogleMapsAPI({
        key: apiKey,
        v: "weekly",
      });
    }

    fetchHeading();
  }, []);

  const handleButtonClick = async () => {
    const addressInput = document.getElementById("address");
    const address = addressInput.value;

    const onHeadingChange = (heading) => {
      const compassDirection = getCompassDirection(heading);
      const facingDirection = getFacingDirection(heading);
      setDirection(compassDirection);
      setFacing(facingDirection);
    };

    const initialHeading = await initMap(address, onHeadingChange);
    const initialCompassDirection = getCompassDirection(initialHeading);
    const initialFacingDirection = getFacingDirection(initialHeading);
    setDirection(initialCompassDirection);
    setFacing(initialFacingDirection);
    setAddress(address)

    setIsSubmitted(true);

    addressInput.value = '';
  };

  return (
    <>
      <h1 id="title">House Compass</h1>
      <p>
        House Compass is a web application that helps you find the direction a
        home is facing.
      </p>
      <input type="text" id="address" placeholder="Enter an address" />
      <button id="submit" onClick={handleButtonClick}>
        Submit/Reset
      </button>

      {isSubmitted && (
        <>
        <h2>{address}</h2>
        <h2 id="direction">The current direction is: {direction}</h2>
        <h2 id="direction">The home faces: {facing}</h2>
        </>
      )}
      <div id="pano"></div>
      
    </>
  );
}

export default App;
