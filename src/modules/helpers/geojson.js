import * as turf from "@turf/turf";

export const createGeojsonDataObj = (type, features = []) => ({
  type,
  features: features,
});

export const createPoint = (id, lngLat) => ({
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [lngLat.lng, lngLat.lat],
  },
  properties: { id },
});

export const createLinestring = (coordinates) => ({
  type: "Feature",
  geometry: {
    type: "LineString",
    coordinates: coordinates,
  },
});

export const getNearestPoint = (targetPointLngLat, lngLatPoints) => {
  const targetPoint = turf.point(targetPointLngLat);

  const points = turf.featureCollection(
    lngLatPoints.map((lngLat) => turf.point(lngLat))
  );

  return turf.nearest(targetPoint, points);
};

export const getLength = (geojsonObj) => turf.length(geojsonObj);
