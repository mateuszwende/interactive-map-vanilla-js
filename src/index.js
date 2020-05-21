import "./assets/sass/main.scss";
import { $ } from "./modules/helpers/dom";
import "./modules/capitals-search";
import "./modules/mode-select";
import { handleOnMapLoad } from "./modules/map/operations";
import { createTabs } from "./modules/tabs";
import mapDataView from "./modules/map-data-view";

handleOnMapLoad();

createTabs(
  [
    {
      tabText: "Map",
      tabPaneId: "map",
      element: $("#map-container"),
    },
    {
      tabText: "Data table",
      tabPaneId: "data-table",
      element: mapDataView.renderToParent("data-table"),
    },
  ],
  "#tabs-nav",
  "#tabs-content",
  "nav-tab",
  "tab-pane"
);
