export const clearElementContent = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

export const createElement = (name) => document.createElement(name);

export const hasClass = (elem, ...cl) => elem.classList.contains(cl);

export const removeClass = (elem, ...cl) => elem.classList.remove(cl);

export const addClass = (elem, ...cl) => elem.classList.add(...cl);

export const replaceClass = (elem, cl1, cl2) =>
  elem.classList.replace(cl1, cl2);

export function $() {}

$ = (identifer) => document.querySelector(identifer);
$.all = (identifer) => document.querySelectorAll(identifer);
$.id = (identifer) => document.getElementById(identifer);
