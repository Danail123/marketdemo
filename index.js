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

async function searchLidlStores(lat, lng) {
  const { PlacesService } = await google.maps.importLibrary("places");

  const service = new PlacesService(map);

  const request = {
    location: { lat, lng },
    radius: 10000, // 10km radius
    keyword: "supermarket",
  };

  service.nearbySearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      results.forEach((place) => {
        const name = place.name.toLowerCase();

        if (name.includes("lidl")) {
          addCustomMarker(place, "lidl");
        } else if (name.includes("kaufland")) {
          addCustomMarker(place, "kaufland");
        } else if (name.includes("BILLA")) {
          addCustomMarker(place, "billa");
        } else {
          addCustomMarker(place, "default");
        }
      });
    } else {
      console.error("Places search failed:", status);
    }
  });
}
getCurrentPosition();
