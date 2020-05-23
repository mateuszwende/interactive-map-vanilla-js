import { $, clearElementContent, createParagraphElem } from "../helpers/dom";
import { createModeView } from "../view-creators/modeView";
import { createDataView } from "../view-creators/dataView";
import { MODE } from "../mode/constants";
import store from "../state";

const MapPanelView = () => {
  let parentSelector;

  const setParentSelector = (selector) => (parentSelector = selector);

  const subscribeToStore = () => store.subscribe(() => render());

  const render = () => {
    clearElementContent($(parentSelector));
    createView(
      parentSelector,
      createModeView(Object.values(MODE), store.getState().mode),
      createDataView(store.getState())
    );
  };

  const createView = (parentSelector, modeView, dataView) => {
    const modeTitle = createParagraphElem(
      "content-right__title",
      "Choose mode"
    );
    const dataTitle = createParagraphElem("content-right__title", "Map Data");

    $(parentSelector).appendChild(modeTitle);
    $(parentSelector).appendChild(modeView);
    $(parentSelector).appendChild(dataTitle);
    $(parentSelector).appendChild(dataView);
  };

  return {
    setParentSelector,
    subscribeToStore,
    render,
  };
};

const mapPanelView = MapPanelView();
mapPanelView.subscribeToStore();

export default mapPanelView;
