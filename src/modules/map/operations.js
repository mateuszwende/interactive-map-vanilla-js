import mapboxgl from "mapbox-gl";
import turfLength from "@turf/length";
import { createGeojsonObj, createLinestring } from "../helpers/geojson";
import { ACTION_TYPES, MODE_TYPES } from "../state/types";
import store from "../state";
import map from "./";

export const handleOnMapLoad = () => {
  map.on("load", () => {
    addSource("geojson", {
      type: "geojson",
      data: createGeojsonObj("FeatureCollection"),
    });

    addLayer({
      id: "measure-points",
      type: "circle",
      source: "geojson",
      paint: {
        "circle-radius": 5,
        "circle-color": "#000",
      },
      filter: ["in", "$type", "Point"],
    });

    addLayer({
      id: "measure-lines",
      type: "line",
      source: "geojson",
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

const addMapOnClickEventListener = () =>
  map.on("click", (e) => handleMapOnClick(e, store.getState().mode));

const handleMapOnClick = (e, mode) => {
  if (mode === MODE_TYPES.DISTANCE) handleMapDistanceOnClick(e);
  else if (mode === MODE_TYPES.MARKER) handleMapMarkerOnClick(e);
};

const addMapOnMousemoveEventListener = () => {
  map.on("mousemove", function (e) {
    if (MODE_TYPES.DISTANCE === store.getState().mode) {
      var features = map.queryRenderedFeatures(e.point, {
        layers: ["measure-points"],
      });

      const cursor = features.length ? "pointer" : "crosshair";
      setMapCursor(cursor);
    } else {
      setMapCursor("pointer");
    }
  });
};

const handleMapDistanceOnClick = (e) => {
  const features = map.queryRenderedFeatures(e.point, {
    layers: ["measure-points"],
  });

  const pointIsClicked = features.length;

  if (pointIsClicked) {
    const id = features[0].properties.id;
    removeMapDistancePoint(id);
  } else {
    addMapDistancePoint(e.lngLat);
  }
};

const handleMapMarkerOnClick = (e) => {
  addMapMarker(e.lngLat);
};

const setMapCursor = (cursor) => {
  map.getCanvas().style.cursor = cursor;
};

const addSource = (sourceName, source) => {
  map.addSource(sourceName, source);
};

const addLayer = (layer) => {
  map.addLayer(layer);
};

const updateMapDistancePoints = () => {
  const linestring = createLinestring(
    store.getState().distancePoints.map((point) => point.geometry.coordinates)
  );
  store.dispatch({
    type: ACTION_TYPES.SET_DISTANCE_STR,
    payload: `${turfLength(linestring).toLocaleString()} km`,
  });

  const geojsonFeatures = [...store.getState().distancePoints, linestring];
  const geojson = createGeojsonObj("FeatureCollection", geojsonFeatures);

  map.getSource("geojson").setData(geojson);
};

export const addMapMarker = (lngLat) => {
  const marker = createMapMarker(true, [lngLat.lng, lngLat.lat], map);
  store.dispatch({ type: ACTION_TYPES.ADD_MARKER, payload: marker });
};

export const removeMapMarker = (marker) => {
  store.dispatch({
    type: ACTION_TYPES.REMOVE_MARKER,
    payload: marker.getLngLat(),
  });

  marker.remove();
};

export const addMapDistancePoint = (lngLat) => {
  store.dispatch({ type: ACTION_TYPES.ADD_DISTANCE_POINT, payload: lngLat });
  updateMapDistancePoints();
};

export const removeMapDistancePoint = (id) => {
  store.dispatch({ type: ACTION_TYPES.REMOVE_DISTANCE_POINT, payload: id });
  updateMapDistancePoints();
};

export const flyMapTo = (coordinates, zoom) =>
  map.flyTo({ center: coordinates, zoom });

export const zoomMapTo = (level, duration, offset) =>
  map.zoomTo(level, {
    duration,
    offset: offset ? offset : [0, 0],
  });

export const createMapMarker = (draggable, coords = [0, 0], map) =>
  new mapboxgl.Marker({ draggable }).setLngLat(coords).addTo(map);
