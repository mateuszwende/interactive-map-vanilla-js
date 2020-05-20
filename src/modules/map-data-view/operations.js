import { createElement, addClass } from "../helpers/dom";
import { removeMapMarker, removeMapDistancePoint } from "../map/operations";
import { MODE_TYPES } from "../state/types";

// Create view
export const createDataView = (dataState) => {
  if (dataState.mode === MODE_TYPES.MARKER) {
    return createMarkersDataView(
      createDataTable(getMarkersToTableData(dataState.markers))
    );
  } else if (dataState.mode === MODE_TYPES.DISTANCE) {
    return createDistanceDataView(
      createDataTable(getDistancePointsTableData(dataState.distancePoints)),
      dataState.distance
    );
  }
};

const createDataTable = (data) => {
  if (data.length) {
    throw new Error("The provided table data is empty");
  }
  const table = createElement("div");
  const className = "map-data-table";
  addClass(table, className);

  const header = createTableHeader(data.header, className);
  table.appendChild(header);

  data.rows.forEach((rowItem) => {
    const row = createElement("div");
    addClass(row, `${className}__row`);

    rowItem.forEach((colElement) => {
      const col = createCol(colElement, className);
      row.appendChild(col);
    });
    table.appendChild(row);
  });

  return table;
};

const createTableHeader = (headerData, tableClassName) => {
  const headerRow = createElement("div");
  addClass(headerRow, `${tableClassName}__header`);

  headerData.forEach((hData) => {
    const col = createElement("div");
    addClass(col, `${tableClassName}__col`);

    col.innerText = hData;
    headerRow.appendChild(col);
  });

  return headerRow;
};

const createCol = (element, tableClassName) => {
  const col = createElement("div");
  addClass(col, `${tableClassName}__col`);
  col.appendChild(element);
  return col;
};

// TABLE DATA
const pointsTableHeader = ["#", "Longitude", "Latitude", "Remove"];

const getMarkersToTableData = (markers) => ({
  header: pointsTableHeader,
  rows:
    markers &&
    markers.map((marker, i) => [
      createColumnTextElement(i + 1),
      createColumnTextElement(marker.getLngLat().lng.toString()),
      createColumnTextElement(marker.getLngLat().lat.toString()),
      createColumnBtnElement("Remove", () => removeMapMarker(marker)),
    ]),
});

const getDistancePointsTableData = (distancePoints) => ({
  header: pointsTableHeader,
  rows:
    distancePoints &&
    distancePoints.map((point, i) => [
      createColumnTextElement(i + 1),
      createColumnTextElement(point.geometry.coordinates[0].toString()),
      createColumnTextElement(point.geometry.coordinates[1].toString()),
      createColumnBtnElement("Remove", () =>
        removeMapDistancePoint(point.properties.id)
      ),
    ]),
});

const createColumnTextElement = (text) => {
  const p = createElement("p");
  addClass(p, "table-text-column");
  p.innerText = text.toString();
  return p;
};

const createColumnBtnElement = (text, onClick) => {
  const btn = createElement("button");
  btn.innerText = text;
  btn.addEventListener("click", onClick);
  return btn;
};

// Views
const createDistanceDataView = (table, distanceStr) => {
  const titleElem = createViewTitle("Distance data");
  const distanceInfoElem = createDistanceInfo(distanceStr);

  const view = createElement("div");
  addClass(view, "view");

  view.appendChild(titleElem);
  view.appendChild(distanceInfoElem);
  view.appendChild(table);

  return view;
};

const createMarkersDataView = (table) => {
  const titleElem = createViewTitle("Markers data");

  const view = createElement("div");
  addClass(view, "view");

  view.appendChild(titleElem);
  view.appendChild(table);

  return view;
};

const createViewTitle = (title) => {
  const h3 = createElement("h3");
  h3.innerText = title;
  return h3;
};

const createDistanceInfo = (distanceStr) => {
  const p = createElement("p");
  p.innerText = `Distance: ${distanceStr ? distanceStr : ""}`;
  return p;
};
