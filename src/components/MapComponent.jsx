// import React, { useEffect, useState } from 'react';
// import { Loader } from "@googlemaps/js-api-loader"


// const MapComponent = ({ address, onHeadingChange }) => {
//   const [location, setLocation] = useState({ lat: 35.11464, lng: -80.81398 }); // Default location
//   const [panorama, setPanorama] = useState(null);

//   useEffect(() => {
//     let map;
  
//     const loadMap = async () => {
//       const { Map } = await google.maps.importLibrary('maps');
  
//       const location = await getGeocodeLocation(address);
//       setLocation(location);
  
//       const panorama = initializePanorama(location);
//       setPanorama(panorama);
  
//       const sv = new google.maps.StreetViewService();
//       sv.getPanorama({ location: location, radius: 50 }).then(processSVData);
//     };
  
//     const getGeocodeLocation = (address) => {
//       return new Promise((resolve, reject) => {
//         const geocoder = new google.maps.Geocoder();
//         geocoder.geocode({ address }, (results, status) => {
//           if (status === 'OK') {
//             resolve(results[0].geometry.location);
//           } else {
//             reject(status);
//           }
//         });
//       }).catch((error) => {
//         console.error('Geocode failed due to: ' + error);
//         return { lat: 35.11464, lng: -80.81398 }; // Default location if geocoding fails
//       });
//     };
  
//     const initializePanorama = (location) => {
//       return new google.maps.StreetViewPanorama(
//         document.getElementById('pano')
//       );
//     };
  
//     const processSVData = ({ data }) => {
//       console.log(data);
//       const heading = data.links[0].heading;
//       ;
//     };
  
//     loadMap();
//   }, [address]);
  

//   return <div id="pano" style={{ width: '100%', height: '400px' }}></div>;
// };

// export default MapComponent;

import React, { useEffect, useState } from 'react';


const MapComponent = ({ address, onHeadingChange }) => {
  const [location, setLocation] = useState(null);
  const [panorama, setPanorama] = useState(null);

  useEffect(() => {
    const loadMap = async () => {
      try {
        const { Map } = await google.maps.importLibrary('maps');
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
          return { lat: 35.11464, lng: -80.81398 }; // Default location if geocoding fails
        });

        setLocation(location);

        const panorama = new google.maps.StreetViewPanorama(
          document.getElementById('pano'),
          {
            position: location,
            pov: { heading: 165, pitch: 0 },
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
        const heading = data.links[0]?.heading;
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

  return <div id="pano" style={{ height: '500px', width: '100%' }} />;
};

export default MapComponent;
