import { ACTION_TYPES } from "./types";
import store from ".";

export const addMeasurePointAction = (point) =>
  store.dispatch({
    type: ACTION_TYPES.ADD_MEASURE_POINT,
    payload: point,
  });

export const removeMeasurePointAction = (id) =>
  store.dispatch({
    type: ACTION_TYPES.REMOVE_MEASURE_POINT,
    payload: id,
  });

export const addMarkerAction = (marker) =>
  store.dispatch({
    type: ACTION_TYPES.ADD_MARKER,
    payload: marker,
  });

export const removeMarkerAction = (id) =>
  store.dispatch({
    type: ACTION_TYPES.REMOVE_MARKER,
    payload: id,
  });

export const updateMarkerAction = (marker) =>
  store.dispatch({
    type: ACTION_TYPES.UPDATE_MARKER,
    payload: marker,
  });

export const addRadarMarkerAction = (radarMarker) =>
  store.dispatch({
    type: ACTION_TYPES.ADD_RADAR_MARKER,
    payload: radarMarker,
  });

export const removeRadarMarkerAction = (id) =>
  store.dispatch({
    type: ACTION_TYPES.REMOVE_RADAR_MARKER,
    payload: id,
  });

export const updateRadarMarkerAction = (radarMarker) =>
  store.dispatch({
    type: ACTION_TYPES.UPDATE_RADAR_MARKER,
    payload: radarMarker,
  });

export const setDistanceStrAction = (distanceStr) =>
  store.dispatch({
    type: ACTION_TYPES.SET_DISTANCE_STR,
    payload: distanceStr,
  });

export const setModeAction = (mode) =>
  store.dispatch({
    type: ACTION_TYPES.SET_MODE,
    payload: mode,
  });
