import data from "./countriesCapitals.json";

export const getCountryCapitals = () =>
  data.map((item) => ({
    name: item.properties.capital,
    coordinates: {
      lng: item.geometry.coordinates[0],
      lat: item.geometry.coordinates[1],
    },
  }));

export const getCoordinatesStr = (coord) => `${coord.lng}°N ${coord.lat}°E`;
