import { $ } from "../helpers/dom";
import store from "../state";
import { ACTION_TYPES } from "../state/types";

export const addModeSelectEventListeners = (selector) =>
  $(selector).addEventListener("change", (e) =>
    store.dispatch({ type: ACTION_TYPES.SET_MODE, payload: e.target.value })
  );
