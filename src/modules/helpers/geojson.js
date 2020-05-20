export const createGeojsonObj = (type, features = []) => ({
  type,
  features: features,
});

export const createPoint = (lng, lat) => ({
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [lng, lat],
  },
  properties: {
    id: String(new Date().getTime()),
  },
});

export const createLinestring = (coordinates) => ({
  type: "Feature",
  geometry: {
    type: "LineString",
    coordinates: coordinates,
  },
});
