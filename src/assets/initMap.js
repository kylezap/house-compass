// initMap.js
export async function initMap() {
    let map;
    const { Map } = await google.maps.importLibrary("maps");
    const home = { lat: 35.11464, lng: -80.81398 };
  
    const panorama = new google.maps.StreetViewPanorama(
      document.getElementById("pano"),
      {
        position: home,
        pov: {
          heading: 180 + 34,
          pitch: 10,
        },
      }
    );
  }