import { ACTION_TYPES } from "./types";
import { createPoint } from "../helpers/geojson";
import { MODE_TYPES } from "./types";

const initialState = {
  distancePoints: [],
  markers: [],
  distance: "",
  mode: MODE_TYPES["MARKER"],
};

const isValidMode = (modes, mode) =>
  Object.values(modes).find((m) => m === mode);

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_DISTANCE_POINT:
      return {
        ...state,
        distancePoints: [
          ...state.distancePoints,
          createPoint(action.payload.lng, action.payload.lat),
        ],
      };
    case ACTION_TYPES.REMOVE_DISTANCE_POINT:
      return {
        ...state,
        distancePoints: state.distancePoints.filter(
          (point) => point.properties.id !== action.payload
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
        markers: state.markers.filter((marker) => {
          const markerlngLat = marker.getLngLat();
          return (
            markerlngLat.lat !== action.payload.lat &&
            markerlngLat.lng !== action.payload.lng
          );
        }),
      };
    case ACTION_TYPES.SET_MODE:
      return {
        ...state,
        mode: isValidMode(MODE_TYPES, action.payload)
          ? action.payload
          : state.mode,
      };
    default:
      return state;
  }
};
