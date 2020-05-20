import { createElement, $ } from "../helpers/dom";

export const addModeSelectOptions = (selector, options) => {
  const select = $(selector);
  options.forEach((option) => select.appendChild(createOption(option)));
};

const createOption = (value) => {
  const option = createElement("option");
  option.value = value;
  option.innerText = value;
  return option;
};
