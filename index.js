let map;

async function initMap(lat, lng) {
  if (lat && lng) {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    map = new Map(document.getElementById("map"), {
      center: { lat, lng },
      zoom: 8,
      mapId: "39527057a1723443e3f04892",
    });

    const marker = new AdvancedMarkerElement({
      map,
      position: { lat, lng },
    });
  } else {
    console.error("Latitude and Longitude are required to initialize the map.");
  }
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

// fetch("https://ipapi.co/json/")
//   .then((res) => res.json())
//   .then((location) => {
//     initMap(location.latitude, location.longitude);
//   })
//   .catch((err) => {
//     console.error(err);
//     initMap(37.7749, -122.4194); // fallback
//   });
