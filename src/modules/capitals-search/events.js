import { $, addClass, removeClass } from "../helpers/dom";
import { debounce } from "../helpers/debounce";
import { getCountryCapitals } from "../data/operations";
import { setSearchList } from "./operations";

const handleSearchBordersRadius = () => {
  const isVisible =
    $("#search-list-js").style.display !== "none" &&
    $("#search-list-js").hasChildNodes();

  if (isVisible) addClass($("#search-js"), "input-with-list");
  else removeClass($("#search-js"), "input-with-list");
};

export const addSearchEventListeners = () => {
  $("#search-js").addEventListener("keyup", (e) => {
    debounce(
      setSearchList(
        getCountryCapitals().filter((capital) =>
          capital.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      ),
      300
    );
    handleSearchBordersRadius();
  });

  $("#search-group-js").addEventListener("focusin", (e) => {
    addClass($("#search-group-js"), "active");
    $("#search-list-js").style.display = "block";
    handleSearchBordersRadius();
  });

  $("#search-group-js").addEventListener("focusout", (e) => {
    removeClass($("#search-group-js"), "active");
    $("#search-list-js").style.display = "none";
    handleSearchBordersRadius();
  });
};
