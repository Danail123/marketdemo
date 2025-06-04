import { searchLidlStores } from "./index.js";

const getCurrentPosition = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log("Current Position:", position.coords.latitude);
      initMap(position.coords.latitude, position.coords.longitude);
    },
    (error) => {
      console.error("Error getting current position:", error);
      fallbackToIP();
    },
    {
      enableHighAccuracy: true, // <-- IMPORTANT for phones!
      timeout: 10000, // 10 seconds timeout
      maximumAge: 0,
    }
  );
};

let map;

async function initMap(lat, lng) {
  if (lat && lng) {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    map = new Map(document.getElementById("map"), {
      center: { lat, lng },
      zoom: 15,
      mapId: "39527057a1723443e3f04892",
    });

    const marker = new AdvancedMarkerElement({
      map,
      position: { lat, lng },
    });
    searchLidlStores(lat, lng);
  } else {
    console.error("Latitude and Longitude are required to initialize the map.");
    fallbackToIP();
  }
}

function fallbackToIP() {
  console.warn("Falling back to IP-based location...");
  fetch("https://ipapi.co/json/")
    .then((res) => res.json())
    .then((location) => {
      const lat = location.latitude;
      const lng = location.longitude;
      console.log("IP-based location:", lat, lng);
      initMap(lat, lng);
    })
    .catch((err) => {
      console.error("IP fallback failed:", err);
      // Default fallback to center of the world :)
      init(0, 0);
    });
}

export {
  fallbackToIP,
  getCurrentPosition,
  initMap,
  // searchLidlStores,
  // addCustomMarker,
  map,
  // position,
  // PlacesService
};
