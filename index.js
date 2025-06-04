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
        } else if (name.includes("billa")) {
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

function addCustomMarker(place, type) {
  let iconUrl;
  let scale = 1.0;

  switch (type) {
    case "lidl":
      iconUrl = "./lidl-icon.png"; // your custom Lidl icon
      scale = 1.5;
      break;
    case "kaufland":
      iconUrl = "./kaufland-icon.png";
      scale = 1.3;
      break;
    case "billa":
      iconUrl = "./billa-icon.png";
      scale = 1.2;
      break;
    default:
      iconUrl = "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
      scale = 1.0;
  }

  new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    title: place.name,
    icon: {
      url: iconUrl,
      scaledSize: new google.maps.Size(32 * scale, 32 * scale),
    },
  });
}

getCurrentPosition();
