import "./assets/sass/main.scss";
import "./modules/capitals-search";
import { handleOnMapLoad } from "./modules/map/operations";
import mapPanelView from "./modules/map-panel-view";

handleOnMapLoad();

mapPanelView.setParentSelector("#map-panel");
mapPanelView.render();
