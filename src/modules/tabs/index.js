import {
  $,
  removeClass,
  addClass,
  createElement,
  hasClass,
} from "../helpers/dom";

export const createTabs = (
  items = [],
  tabsSelector,
  tabsContentSelector,
  tabClass,
  tabPaneClass
) => {
  items.forEach((item) => {
    const tab = createTab(item, tabClass, tabPaneClass);
    const tabPane = createTabPane(item, tabPaneClass);

    $(tabsSelector).appendChild(tab);
    $(tabsContentSelector).appendChild(tabPane);
  });

  if (items.length) setInitialActive(0, tabClass, tabPaneClass);
};

const createTab = (item, tabClass, tabPaneClass) => {
  const tab = createElement("li");
  const a = createElement("a");
  a.setAttribute("href", `#${item.tabPaneId}`);
  a.innerText = item.tabText;

  addClass(tab, tabClass);
  tab.appendChild(a);

  tab.addEventListener("click", (e) => onTabClick(e, tabClass, tabPaneClass));

  return tab;
};

const createTabPane = (item, tabPaneClass) => {
  const tabPane = createElement("div");
  addClass(tabPane, tabPaneClass);
  tabPane.id = item.tabPaneId;

  tabPane.appendChild(item.element);
  return tabPane;
};

const setInitialActive = (index, tabClass, tabPaneClass) => {
  addClass($.all(`.${tabClass}`)[index], "active");
  addClass($.all(`.${tabPaneClass}`)[index], "active");
};

const onTabClick = (e, tabClass, tabPaneClass) => {
  const isAlreadyActive = hasClass(e.currentTarget, "active");
  if (isAlreadyActive) return;

  $.all(`.${tabClass}`).forEach((tab) => removeClass(tab, "active"));

  const currTab = e.currentTarget;
  addClass(currTab, "active");

  $.all(`.${tabPaneClass}`).forEach((content) =>
    removeClass(content, "active")
  );

  const paneId = currTab.firstChild.getAttribute("href");
  const pane = $(paneId);
  addClass(pane, "active");
};
