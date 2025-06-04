import { getCurrentPosition, map } from "./initMap.js";

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
      iconUrl = "./lidl.png"; // your custom Lidl icon
      scale = 1.5;
      break;
    case "kaufland":
      iconUrl = "./kaufland.png";
      scale = 1.3;
      break;
    case "billa":
      iconUrl = "./billa.png";
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

export {
  //   getCurrentPosition,
  searchLidlStores,
  addCustomMarker,
  // map,
  // position: null, // Placeholder for position, can be updated later
  // PlacesService
};
