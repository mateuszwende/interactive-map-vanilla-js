import { createDataView } from "./operations";
import { $, clearElementContent } from "../helpers/dom";
import store from "../state";

const MapDataView = () => {
  let parentId;

  const subscribeToStore = () =>
    store.subscribe(() => rerender(renderToParent(parentId)));

  const renderToParent = (_parentId) => {
    parentId = _parentId;
    return createDataView(store.getState());
  };

  const rerender = (newDataTable) => {
    clearElementContent($(`#${parentId}`));
    $(`#${parentId}`).appendChild(newDataTable);
  };

  return {
    subscribeToStore,
    renderToParent,
  };
};

const mapDataView = MapDataView();
mapDataView.subscribeToStore();

export default mapDataView;
