import { ACTION_TYPES } from "./types";
import { MODE } from "../mode/constants";

const initialState = {
  measurePoints: [],
  markers: [],
  radarMarkers: [],
  distance: "0 km",
  mode: MODE["MARKER"],
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_MEASURE_POINT:
      return {
        ...state,
        measurePoints: [...state.measurePoints, action.payload],
      };
    case ACTION_TYPES.REMOVE_MEASURE_POINT:
      return {
        ...state,
        measurePoints: state.measurePoints.filter(
          (point) => point.id !== action.payload
        ),
      };
    case ACTION_TYPES.SET_DISTANCE_STR:
      return {
        ...state,
        distance: action.payload,
      };

    case ACTION_TYPES.ADD_MARKER:
      return {
        ...state,
        markers: [...state.markers, action.payload],
      };
    case ACTION_TYPES.REMOVE_MARKER:
      return {
        ...state,
        markers: state.markers.filter((marker) => marker.id !== action.payload),
      };
    case ACTION_TYPES.UPDATE_MARKER:
      return {
        ...state,
        markers: state.markers.map((marker) =>
          marker.id === action.payload.id
            ? { ...marker, ...action.payload }
            : marker
        ),
      };
    case ACTION_TYPES.ADD_RADAR_MARKER:
      return {
        ...state,
        radarMarkers: [...state.radarMarkers, action.payload],
      };
    case ACTION_TYPES.REMOVE_RADAR_MARKER:
      return {
        ...state,
        radarMarkers: state.radarMarkers.filter(
          (marker) => marker.id !== action.payload
        ),
      };
    case ACTION_TYPES.UPDATE_RADAR_MARKER:
      return {
        ...state,
        radarMarkers: state.radarMarkers.map((marker) =>
          marker.id === action.payload.id
            ? { ...marker, ...action.payload }
            : marker
        ),
      };
    case ACTION_TYPES.SET_MODE:
      return {
        ...state,
        mode: MODE[action.payload],
      };
    default:
      return state;
  }
};
