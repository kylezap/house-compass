// // initMap.js
// export async function initMap(onHeadingChange) {
//   const { Map } = await google.maps.importLibrary("maps");
//   const val = document.getElementById("address").value
//   const home = { lat: 35.11464, lng: -80.81398 };

//   const panorama = new google.maps.StreetViewPanorama(
//     document.getElementById("pano"),
//     {
//       position: home,
//       pov: {
//         heading: 180 + 34,
//         pitch: 10,
//       },
//     }
//   );

//   panorama.addListener('pov_changed', () => {
//     const heading = panorama.getPov().heading;
//     onHeadingChange(heading);
//   });

//   return panorama.getPov().heading;
// }

// export function getCompassDirection(heading) {
//   if (heading >= 337.5 || heading < 22.5) {
//     return 'N';
//   } else if (heading >= 22.5 && heading < 67.5) {
//     return 'NE';
//   } else if (heading >= 67.5 && heading < 112.5) {
//     return 'E';
//   } else if (heading >= 112.5 && heading < 157.5) {
//     return 'SE';
//   } else if (heading >= 157.5 && heading < 202.5) {
//     return 'S';
//   } else if (heading >= 202.5 && heading < 247.5) {
//     return 'SW';
//   } else if (heading >= 247.5 && heading < 292.5) {
//     return 'W';
//   } else if (heading >= 292.5 && heading < 337.5) {
//     return 'NW';
//   }
// }

// initMap.js
export async function initMap(address, onHeadingChange) {
  const { Map } = await google.maps.importLibrary("maps");

  // Geocoder is accessed through google.maps namespace
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

  const location = await geocodePromise.catch((error) => {
    console.error("Geocode failed due to: " + error);
    return { lat: 35.11464, lng: -80.81398 }; // Default location if geocoding fails
  });

  const panorama = new google.maps.StreetViewPanorama(
    document.getElementById("pano"),
    {
      position: location,
      // Use default POV
    }
  );

  // Trigger the onHeadingChange callback with the default heading
  const defaultHeading = panorama.getPov().heading;
  onHeadingChange(defaultHeading);

  panorama.addListener('pov_changed', () => {
    const heading = panorama.getPov().heading;
    onHeadingChange(heading);
  });

  return defaultHeading;
}

export function getCompassDirection(heading) {
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
}

export function getFacingDirection(heading) {
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
}