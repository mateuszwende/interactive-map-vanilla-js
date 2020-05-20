import {
  clearElementContent,
  $,
  createElement,
  addClass,
} from "../helpers/dom";
import { flyMapTo } from "../map/operations";
import { getCoordinatesStr } from "../data/operations";

const setSearchList = (data) => {
  const searchList = $("#search-list-js");
  clearElementContent(searchList);
  data.forEach((item) => searchList.appendChild(createListItem(item)));
};

const createListItem = (dataItem) => {
  const listItem = createElement("div");
  addClass(listItem, "search-list__item", "search-list-item-js");

  const pName = createElement("p");
  const spanCoords = createElement("span");

  pName.innerText = dataItem.name;
  spanCoords.innerText = getCoordinatesStr(dataItem.coordinates);

  listItem.appendChild(pName);
  listItem.appendChild(spanCoords);

  listItem.addEventListener("mousedown", (e) =>
    handleListItemOnClick(dataItem)
  );

  return listItem;
};

const handleListItemOnClick = (dataItem) => {
  $("#search-js").value = dataItem.name;

  const coordinates = {
    lng: parseFloat(dataItem.coordinates.lng),
    lat: parseFloat(dataItem.coordinates.lat),
  };

  flyMapTo(coordinates, 10);
};

export { setSearchList };
