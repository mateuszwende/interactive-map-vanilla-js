import { getCoordinatesStr } from "../data/operations";
import { createElement, addClass, createParagraphElem } from "../helpers/dom";
import { removeMapMeasurePoint } from "../map/operations";

export const createMeasurePointsDataView = (points, distance) => {
  const view = createElement("div");
  addClass(view, "data-view");

  const distanceElem = createParagraphElem(
    "data-view__distance",
    `Distance: ${distance}`
  );
  view.appendChild(distanceElem);

  points.forEach((point) => {
    view.appendChild(createMarkersDataRow(point));
  });
  return view;
};

const createMarkersDataRow = (point) => {
  const row = createElement("div");
  addClass(row, "data-view__row");

  row.appendChild(createMeasurePointIconElement(point));
  row.appendChild(
    createLngLatTextElement(
      point.item.geometry.coordinates[0],
      point.item.geometry.coordinates[1]
    )
  );
  row.appendChild(createRemoveElement(() => removeMapMeasurePoint(point)));

  return row;
};

const createMeasurePointIconElement = (point) => {
  const icon = createElement("div");
  addClass(icon, "measure-point");
  icon.style.backgroundColor = point.color;
  icon.style.transform = "scale(0.8)";

  return icon;
};

const createLngLatTextElement = (lng, lat) => {
  const coordsText = getCoordinatesStr({
    lat: lat.toFixed(6),
    lng: lng.toFixed(6),
  });
  const coordsTextElem = createParagraphElem("data-name", coordsText);

  return coordsTextElem;
};

const createRemoveElement = (onClick) => {
  const btn = createElement("button");
  addClass(btn, "btn-remove");

  btn.addEventListener("click", onClick);
  return btn;
};
