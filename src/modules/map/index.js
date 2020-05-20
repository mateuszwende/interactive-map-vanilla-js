import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = process.env.MAP_ACCESS_TOKEN;

const map = new mapboxgl.Map({
  container: "map-container",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [50.96, 20.47],
  zoom: 2,
});

export default map;
