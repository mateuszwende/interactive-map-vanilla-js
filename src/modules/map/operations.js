import mapboxgl from "mapbox-gl";
import {
  createGeojsonDataObj,
  createLinestring,
  createPoint,
  getLength,
} from "../helpers/geojson";
import { createElement, addClass } from "../helpers/dom";
import radarIcon from "../../assets/images/radar.svg";
import { getRandomColor } from "../helpers/colors";
import { MODE } from "../mode/constants";
import { v4 as uuidv4 } from "uuid";
import { createMarker, createMeasurePoint } from "./models";
import {
  removeMarkerAction,
  removeRadarMarkerAction,
  updateMarkerAction,
  updateRadarMarkerAction,
  addMarkerAction,
  addRadarMarkerAction,
  addMeasurePointAction,
  removeMeasurePointAction,
  setDistanceStrAction,
} from "../state/actions";
import store from "../state";
import map from "./";

// ------------------------------------
// ON LOAD
// ------------------------------------

export const handleOnMapLoad = () => {
  map.on("load", () => {
    addSource("geojson-measure-lines", {
      type: "geojson",
      data: createGeojsonDataObj("FeatureCollection"),
    });

    addLayer({
      id: "measure-lines",
      type: "line",
      source: "geojson-measure-lines",
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "#000",
        "line-width": 2.5,
      },
      filter: ["in", "$type", "LineString"],
    });

    addMapOnClickEventListener();
    addMapOnMousemoveEventListener();
  });
};

// ------------------------------------
// EVENTS LISTENERS
// ------------------------------------

const addMapOnClickEventListener = () =>
  map.on("click", (e) => handleMapOnClick(e, store.getState().mode));

const addMapOnMousemoveEventListener = () => {
  map.on("mousemove", function (e) {
    if (MODE.MEASURE_POINT.KEY === store.getState().mode.KEY) {
      const measurePoints = store.getState().measurePoints;
      const cursor = getMouseHoveredMapFeatures(e, measurePoints).length
        ? "pointer"
        : "crosshair";
      setMapCursor(cursor);
    } else {
      setMapCursor("pointer");
    }
  });
};

// ------------------------------------
// ON-CLIK HANDLERS
// ------------------------------------

const handleMapOnClick = (e, mode) => {
  if (mode.KEY === MODE.MEASURE_POINT.KEY) handleMapMeasurePointOnClick(e);
  else if (mode.KEY === MODE.MARKER.KEY) handleMapMarkerOnClick(e);
  else if (mode.KEY === MODE.RADAR_MARKER.KEY) handleMapRadarMarkerOnClick(e);
};

const handleMapMarkerOnClick = (e) => {
  addMapMarker(e.lngLat);
};

const handleMapRadarMarkerOnClick = (e) => {
  addRadarMarker(e.lngLat);
};

const handleMapMeasurePointOnClick = (e) => {
  const measurePoints = store.getState().measurePoints;
  const features = getMouseHoveredMapFeatures(e, measurePoints);

  if (features.length) {
    const id = features[0].properties.id;
    const clickedPoint = measurePoints.find((point) => point.id === id);

    removeMapMeasurePoint(clickedPoint);
  } else {
    addMapMeasurePoint(e.lngLat);
  }
};

const getMouseHoveredMapFeatures = (e, points) => {
  const pointsLayersIds = points.map((point) => point.layerId);
  const features = map.queryRenderedFeatures(e.point, {
    layers: pointsLayersIds.length ? pointsLayersIds : [],
  });

  return features;
};

// ------------------------------------
// MARKER
// ------------------------------------
const addDraggableMapMarker = ({ marker, onAdd, onDragEnd }) => {
  marker.item.on("dragend", () => onDragEnd(marker));
  onAdd(marker);
};

const createMapMarker = ({ draggable, coords = [0, 0], color, map }) =>
  new mapboxgl.Marker({ color })
    .setLngLat(coords)
    .addTo(map)
    .setDraggable(draggable);

const createCustomMapMarker = ({
  className,
  draggable,
  coords = [0, 0],
  color,
  map,
}) => {
  const el = createElement("div");
  addClass(el, className);

  el.style.backgroundColor = color;
  el.style.maskImage = `url(${radarIcon})`;

  return new mapboxgl.Marker(el)
    .setLngLat(coords)
    .addTo(map)
    .setDraggable(draggable);
};

// ------------------------------------
// NORMAL MARKER
// ------------------------------------

export const addMapMarker = (lngLat) => {
  const marker = createMarker(
    uuidv4(),
    createMapMarker({
      draggable: true,
      coords: [lngLat.lng, lngLat.lat],
      color: getRandomColor(),
      map,
    })
  );

  addDraggableMapMarker({
    marker: marker,
    onAdd: addMarkerAction,
    onDragEnd: updateMarkerAction,
  });
};

export const removeMapMarker = (marker) => {
  removeMarkerAction(marker.id);
  marker.item.remove();
};

// ------------------------------------
// RADAR MARKER
// ------------------------------------

export const addRadarMarker = (lngLat) => {
  const radarMarker = createMarker(
    uuidv4(),
    createCustomMapMarker({
      className: "radar-marker-icon",
      draggable: true,
      coords: [lngLat.lng, lngLat.lat],
      color: getRandomColor(),
      map,
    })
  );

  addDraggableMapMarker({
    marker: radarMarker,
    onAdd: addRadarMarkerAction,
    onDragEnd: updateRadarMarkerAction,
  });
};

export const removeRadarMapMarker = (marker) => {
  removeRadarMarkerAction(marker.id);
  marker.item.remove();
};

// ------------------------------------
// MEASURE POINT
// ------------------------------------

export const addMapMeasurePoint = (lngLat) => {
  const id = uuidv4();
  const sourceId = `geojson-measure-point-${id}`;
  const layerId = `layer-measure-point-${id}`;
  const color = getRandomColor();

  const measurePoint = createMeasurePoint(
    id,
    color,
    layerId,
    sourceId,
    createPoint(id, lngLat)
  );

  addSource(sourceId, {
    type: "geojson",
    data: createGeojsonDataObj("FeatureCollection", [measurePoint.item]),
  });

  addLayer({
    id: layerId,
    type: "circle",
    source: sourceId,
    paint: {
      "circle-radius": 5,
      "circle-color": color,
    },
    filter: ["in", "$type", "Point"],
  });

  addMeasurePointAction(measurePoint);
  updateMapLinestring();
};

export const removeMapMeasurePoint = (point) => {
  removeMeasurePointAction(point.id);
  map.removeLayer(point.layerId);
  map.removeSource(point.sourceId);
  updateMapLinestring();
};

const updateMapLinestring = () => {
  const newLinestring = createLinestring(
    store
      .getState()
      .measurePoints.map((point) => point.item.geometry.coordinates)
  );
  map.getSource("geojson-measure-lines").setData(newLinestring);

  setDistanceStrAction(`${getLength(newLinestring).toLocaleString()} km`);
};

// ------------------------------------
// MAP API WRAPPERS
// ------------------------------------

export const flyMapTo = (coordinates, zoom) =>
  map.flyTo({ center: coordinates, zoom });

export const zoomMapTo = (level, duration, offset) =>
  map.zoomTo(level, {
    duration,
    offset: offset ? offset : [0, 0],
  });

const setMapCursor = (cursor) => {
  map.getCanvas().style.cursor = cursor;
};

const addSource = (sourceName, source) => {
  map.addSource(sourceName, source);
};

const addLayer = (layer) => {
  map.addLayer(layer);
};
