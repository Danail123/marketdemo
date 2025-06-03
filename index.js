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
  },
  {
    enableHighAccuracy: true, // <-- IMPORTANT for phones!
    timeout: 10000, // 10 seconds timeout
    maximumAge: 0,
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

// let map;

// async function loadMap(lat, lng) {
//   const { Map } = await google.maps.importLibrary("maps");
//   const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

//   map = new Map(document.getElementById("map"), {
//     center: { lat, lng },
//     zoom: 15,
//     mapId: "YOUR_MAP_ID", // Replace with your real Map ID
//   });

//   const marker = new AdvancedMarkerElement({
//     map,
//     position: { lat, lng },
//   });
// }

// function fallbackToIP() {
//   console.warn("Falling back to IP-based location...");
//   fetch("https://ipapi.co/json/")
//     .then((res) => res.json())
//     .then((location) => {
//       const lat = location.latitude;
//       const lng = location.longitude;
//       console.log("IP-based location:", lat, lng);
//       loadMap(lat, lng);
//     })
//     .catch((err) => {
//       console.error("IP fallback failed:", err);
//       // Default fallback to center of the world :)
//       loadMap(0, 0);
//     });
// }

// function getLocation() {
//   if ("geolocation" in navigator) {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         console.log("Device location found:", position.coords);
//         loadMap(position.coords.latitude, position.coords.longitude);
//       },
//       (error) => {
//         console.error("Geolocation error:", error);
//         fallbackToIP();
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 10000,
//         maximumAge: 0,
//       }
//     );
//   } else {
//     console.warn("Geolocation not supported.");
//     fallbackToIP();
//   }
// }

// // Start everything
// getLocation();
