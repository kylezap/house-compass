// initMap.js
export async function initMap(address, onHeadingChange) {
  const { Map } = await google.maps.importLibrary("maps"); // Import Map class
  const sv = new google.maps.StreetViewService(); // StreetViewService instance
  const geocoder = new google.maps.Geocoder(); // Geocoder instance

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

//Streetview Panorama 

//91 Oxford Rd, Westwood MA

  const panorama = new google.maps.StreetViewPanorama(
    document.getElementById("pano"), );

  sv.getPanorama({ location: location, radius: 50 }).then(processSVData);
  
  function processSVData({data}) {
    console.log(data);
    const location = data.location;
    const heading = data.links[0].heading;
  }
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