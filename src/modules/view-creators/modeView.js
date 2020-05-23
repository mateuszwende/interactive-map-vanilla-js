import { createElement, addClass, createParagraphElem } from "../helpers/dom";
import { setModeAction } from "../state/actions";

export const createModeView = (modeDataArr, currMode) => {
  const view = createElement("div");
  addClass(view, "mode-view");

  const btnsWrapper = createBtnsWrapper("content-right__tags");
  createModeBtns(modeDataArr, currMode, btnsWrapper);

  const modeName = createParagraphElem("content-right__name", currMode.NAME);
  const modeDescr = createParagraphElem(
    "content-right__descr",
    currMode.DESCRIPTION
  );

  view.appendChild(btnsWrapper);
  view.appendChild(modeName);
  view.appendChild(modeDescr);

  return view;
};

const createBtnsWrapper = (className) => {
  const wrapper = createElement("div");
  addClass(wrapper, className);
  return wrapper;
};

const createModeBtns = (modesDataArr, currMode, parent) => {
  modesDataArr.forEach((mode) => {
    const btn = createElement("button");
    addClass(btn, "mode-btn", mode.ICON_CSS_CLASS);

    if (currMode.KEY === mode.KEY) addClass(btn, "active");

    btn.addEventListener("click", (e) => setModeAction(mode.KEY));

    parent.appendChild(btn);
  });
};

const handleOnModeBtnClick = (modeType) => {};
