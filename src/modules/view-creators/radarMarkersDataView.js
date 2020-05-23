import { getCountryCapitals } from "../data/operations";
import { createElement, addClass, createParagraphElem } from "../helpers/dom";
import { removeRadarMapMarker } from "../map/operations";
import { getNearestPoint } from "../helpers/geojson";

export const createRadarMarkerDataView = (radarMarkers) => {
  const view = createElement("div");
  addClass(view, "data-view");
  radarMarkers.forEach((marker) => {
    view.appendChild(createMarkersDataRow(marker));
  });
  return view;
};

const createMarkersDataRow = (marker) => {
  const row = createElement("div");
  addClass(row, "data-view__row");

  row.appendChild(createRadarMarkerIconElement(marker.item));
  row.appendChild(createClosestCapitalTextElement(marker.item));
  row.appendChild(createRemoveElement(() => removeRadarMapMarker(marker)));

  return row;
};

const createRadarMarkerIconElement = (radarMarker) => {
  const icon = radarMarker.getElement().cloneNode(true);
  icon.style.position = "initial";
  icon.style.transform = "none";
  return icon;
};

const createClosestCapitalTextElement = (marker) => {
  const countryCapitals = getCountryCapitals();
  const nearestPoint = getNearestPoint(
    [marker.getLngLat().lat, marker.getLngLat().lng],
    countryCapitals.map((capital) => [
      capital.coordinates.lat,
      capital.coordinates.lng,
    ])
  );

  const distanceToPoint = nearestPoint.properties.distanceToPoint.toFixed(2);
  const nearestCapital = countryCapitals.find(
    (capital) =>
      capital.coordinates.lat === nearestPoint.geometry.coordinates[0] &&
      capital.coordinates.lng === nearestPoint.geometry.coordinates[1]
  );

  const textElem = createParagraphElem(
    "capital",
    `${nearestCapital.name} (${distanceToPoint} km)`
  );
  return textElem;
};

const createRemoveElement = (onClick) => {
  const btn = createElement("button");
  addClass(btn, "btn-remove");

  btn.addEventListener("click", onClick);
  return btn;
};
