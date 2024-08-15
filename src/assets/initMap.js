// initMap.js
export async function initMap() {
    let map;
    const { Map } = await google.maps.importLibrary("maps");
    const location = { lat: 35.11464, lng: -80.81398 };
  
    const panorama = new google.maps.StreetViewPanorama(
      document.getElementById("pano"),
      {
        position: location,
        pov: {
          heading: 180 + 34,
          pitch: 0,
        },
      }
    );

    return panorama.getPov().heading;
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