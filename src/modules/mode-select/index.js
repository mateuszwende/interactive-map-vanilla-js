import { MODE_TYPES } from "../state/types";
import { addModeSelectOptions } from "./operations";
import { addModeSelectEventListeners } from "./events";

const selector = "#mode-select-js";
const modeOptions = Object.values(MODE_TYPES);

addModeSelectOptions(selector, modeOptions);
addModeSelectEventListeners(selector);
