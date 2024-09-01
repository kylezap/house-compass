import React, { useEffect, useState } from 'react';
import '../App.css';


const MapComponent = ({ address, onHeadingChange }) => {
  const [location, setLocation] = useState(null);
  const [panorama, setPanorama] = useState(null);
  const [heading, setHeading] = useState(null);

  useEffect(() => {
    const loadMap = async () => {
      try {
        const sv = new google.maps.StreetViewService();
        const geocoder = new google.maps.Geocoder();

        const geocodePromise = new Promise((resolve, reject) => {
          geocoder.geocode({ address: address }, (results, status) => {
            if (status === 'OK') {
              resolve(results[0].geometry.location);
            } else {
              reject(status);
            }
          });
        });

        const location = await geocodePromise.catch((error) => {
          console.error('Geocode failed due to: ' + error);
          return { lat: 35.11464, lng: -80.81398 };
        });

        setLocation(location);

        const panorama = new google.maps.StreetViewPanorama(
          document.getElementById('pano'),
          {
            position: location,
            pov: { heading: heading, pitch: 0 },
            visible: true,
          }
        );

        sv.getPanorama({ location: location, radius: 50 }).then(processSVData);
        setPanorama(panorama);
      } catch (error) {
        console.error('Error loading map: ', error);
      }
    };

    const processSVData = ({ data }) => {
      if (data) {
        console.log(data);
        const heading = data.links[0]?.heading;
        setHeading(heading);
        if (heading !== undefined) {
          onHeadingChange(heading);
        } else {
          console.error('Heading not found in Street View data.');
        }
      } else {
        console.error('No data returned from Street View Service.');
      }
    };

    loadMap();
  }, [address, onHeadingChange]);
  
  console.log('This is the location:'+location);
  console.log('This is the heading:'+heading);
  console.log('This is the panorama:' +panorama);

  return <div id="pano" style={{ height: '500px', width: '100%' }} />;
};

export default MapComponent;
