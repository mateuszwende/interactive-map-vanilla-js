import { getCoordinatesStr } from "../data/operations";
import { createElement, addClass, createParagraphElem } from "../helpers/dom";
import { removeMapMarker } from "../map/operations";

export const createMarkerDataView = (markers) => {
  const view = createElement("div");
  addClass(view, "data-view");
  markers.forEach((marker) => {
    view.appendChild(createMarkersDataRow(marker));
  });
  return view;
};

const createMarkersDataRow = (marker) => {
  const row = createElement("div");
  addClass(row, "data-view__row");

  row.appendChild(createMarkerIconElement(marker.item));
  row.appendChild(createLngLatTextElement(marker.item));
  row.appendChild(createRemoveElement(() => removeMapMarker(marker)));

  return row;
};

const createMarkerIconElement = (marker) => {
  const icon = marker.getElement().firstChild.cloneNode(true);
  icon.style.transform = "scale(0.7)";
  return icon;
};

const createLngLatTextElement = (marker) => {
  const lat = marker.getLngLat().lat.toFixed(6);
  const lng = marker.getLngLat().lng.toFixed(6);

  const coordsText = getCoordinatesStr({ lat, lng });
  const coordsTextElem = createParagraphElem("data-name", coordsText);

  return coordsTextElem;
};

const createRemoveElement = (onClick) => {
  const btn = createElement("button");
  addClass(btn, "btn-remove");

  btn.addEventListener("click", onClick);
  return btn;
};
