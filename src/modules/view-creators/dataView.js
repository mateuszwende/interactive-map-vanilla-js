import { createElement, addClass } from "../helpers/dom";
import { createMarkerDataView } from "./markersDataView";
import { createMeasurePointsDataView } from "./measurePointsDataView";
import { MODE } from "../mode/constants";
import { createRadarMarkerDataView } from "./radarMarkersDataView";

export const createDataView = (state) => {
  const dataView = createElement("div");
  addClass(dataView, "content-right__data");

  if (state.mode.KEY === MODE.MEASURE_POINT.KEY) {
    dataView.appendChild(
      createMeasurePointsDataView(state.measurePoints, state.distance)
    );
  } else if (state.mode.KEY === MODE.MARKER.KEY) {
    dataView.appendChild(createMarkerDataView(state.markers));
  } else if (state.mode.KEY === MODE.RADAR_MARKER.KEY) {
    dataView.appendChild(createRadarMarkerDataView(state.radarMarkers));
  }

  return dataView;
};
