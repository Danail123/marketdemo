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

async function addCustomMarker(place, type) {
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  let iconUrl;
  let scale = 1.0;

  switch (type) {
    case "lidl":
      iconUrl = "./lidl.png"; // your custom Lidl icon
      scale = 1.5;
      break;
    case "kaufland":
      iconUrl = "./kauflandNew.png";
      scale = 1.5;
      break;
    case "billa":
      iconUrl = "./billa.png";
      scale = 1.5;
      break;
    default:
      iconUrl = "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
      scale = 1.0;
  }

  const markerContent = document.createElement("div");
  markerContent.style.backgroundImage = `url(${iconUrl})`;
  markerContent.style.backgroundSize = "contain";
  markerContent.style.width = `${32 * scale}px`;
  markerContent.style.height = `${32 * scale}px`;

  new AdvancedMarkerElement({
    map: map,
    position: place.geometry.location,
    content: markerContent,
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
