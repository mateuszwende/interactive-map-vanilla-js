import data from "./countriesCapitals.json";

export const getCountryCapitals = () =>
  data.map((item) => ({
    name: item.properties.capital,
    coordinates: {
      lng: item.geometry.coordinates[0],
      lat: item.geometry.coordinates[1],
    },
  }));

export const getCoordinatesStr = (coord) => {
  const lat = coord.lat >= 0 ? `${coord.lat}°N` : `${coord.lat * -1}°S`;
  const lng = coord.lng >= 0 ? `${coord.lng}°E` : `${coord.lng * -1}°W`;

  return `${lat} ${lng}`;
};
