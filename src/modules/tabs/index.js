import {
  $,
  removeClass,
  addClass,
  createElement,
  hasClass,
} from "../helpers/dom";

const tabsContainer = $("#tabs-nav");
const tabContentContainer = $("#tabs-content");
const tabClass = "nav-tab";
const tabPaneClass = "tab-pane";

export const createTabs = (items = []) => {
  items.forEach((item, i) => {
    const tab = createTab(item, i);
    const tabPane = createTabPane(item, i);

    tabsContainer.appendChild(tab);
    tabContentContainer.appendChild(tabPane);
  });

  if (items.length) setInitialActive(0);
};

const createTab = (item, i) => {
  const tab = createElement("li");
  const a = createElement("a");
  a.setAttribute("href", `#${item.tabPaneId}`);
  a.innerText = item.tabText;

  addClass(tab, tabClass);
  tab.appendChild(a);

  tab.addEventListener("click", (e) => onTabClick(e, item.renderPane));

  return tab;
};

const createTabPane = (item, i) => {
  const tabPane = createElement("div");
  addClass(tabPane, tabPaneClass);
  tabPane.id = item.tabPaneId;

  tabPane.appendChild(item.element);
  return tabPane;
};

const setInitialActive = (index) => {
  addClass($.all(`.${tabClass}`)[index], "active");
  addClass($.all(`.${tabPaneClass}`)[index], "active");
};

const onTabClick = (e) => {
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
