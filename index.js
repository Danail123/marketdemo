let map;

async function initMap(lat, lng) {
  if (lat && lng) {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    map = new Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
      mapId: "39527057a1723443e3f04892",
    });

    const marker = new google.maps.marker.AdvancedMarkerElement({
      map,
      position: { lat: 37.4239163, lng: -122.0947209 },
    });
  } else {
    console.error("Latitude and Longitude are required to initialize the map.");
  }
}

if ("geolocation" in navigator) {
  /* geolocation is available */
  console.log("Geolocation is available");
} else {
  /* geolocation IS NOT available */
  console.log("Geolocation is NOT available");
}

navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log("Current Position:", position.coords.latitude);
    initMap(position.coords.latitude, position.coords.longitude);
  },
  (error) => {
    console.error("Error getting current position:", error);
  }
);
