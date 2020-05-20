import { ACTION_TYPES } from "./types";

export const addDistancePoint = (lngLat) => ({
  type: ACTION_TYPES.ADD_DISTANCE_POINT,
  payload: lngLat,
});

export const removeDistancePoint = (id) => ({
  type: ACTION_TYPES.REMOVE_DISTANCE_POINT,
  payload: id,
});

export const setDistanceStr = (distanceStr) => ({
  type: ACTION_TYPES.SET_DISTANCE_STR,
  payload: distanceStr,
});
export const addMarker = (marker) => ({
  type: ACTION_TYPES.ADD_MARKER,
  payload: marker,
});

export const removeMarker = (lngLat) => ({
  type: ACTION_TYPES.REMOVE_MARKER,
  payload: lngLat,
});

export const setMode = (mode) => ({
  type: ACTION_TYPES.REMOVE_MARKER,
  payload: mode,
});
