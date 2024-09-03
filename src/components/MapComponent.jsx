import React, { useEffect, useState } from "react";
import "../App.css";

const MapComponent = ({ address, onHeadingChange }) => {
  const [location, setLocation] = useState(null);
  const [panorama, setPanorama] = useState(null);
  const [heading, setHeading] = useState(null);

  useEffect(() => {
    const loadMap = async () => {
      try {
        // Get the latitude and longitude from the address
        const geocoder = new google.maps.Geocoder();
        const geocodePromise = new Promise((resolve, reject) => {
          geocoder.geocode({ address: address }, (results, status) => {
            if (status === "OK") {
              resolve(results[0].geometry.location);
            } else {
              reject(status);
            }
          });
        });

        // Wait for the geocodePromise to resolve
        const location = await geocodePromise;
        const lat = location.lat();
        const lng = location.lng();

        // Create a point for the Street View service
        const point = new google.maps.LatLng(lat, lng);
        const streetViewService = new google.maps.StreetViewService();
        const panorama = new google.maps.StreetViewPanorama(
          document.getElementById("pano")
        );

        // Set the panorama to the default and set up some defaults
        streetViewService.getPanoramaByLocation(
          point,
          100, // Maximum distance to search for a Street View panorama
          (streetViewPanoramaData, status) => {
            if (status === google.maps.StreetViewStatus.OK) {
              const oldPoint = point;
              const newPoint = streetViewPanoramaData.location.latLng;

              const heading = google.maps.geometry.spherical.computeHeading(
                newPoint,
                oldPoint
              );

              panorama.setPosition(newPoint);
              panorama.setPov({
                heading: heading,
                zoom: 1,
                pitch: 0,
              });
              panorama.setVisible(true);

              // Set the heading and location state
              setLocation(location);
              setHeading(heading);
              setPanorama(panorama);

              // Call the onHeadingChange callback
              onHeadingChange(heading);

            } else {
              console.log("Street View data not found for this location.");
            }
          }
        );
      } catch (error) {
        console.error("Error loading map: ", error);
      }
    };

    loadMap();
  }, [address, onHeadingChange]);


  console.log("This is the location:" + location);
  console.log("This is the heading:" + heading);

  return <div id="pano" style={{ height: "500px", width: "100%" }} />;
};

export default MapComponent;
