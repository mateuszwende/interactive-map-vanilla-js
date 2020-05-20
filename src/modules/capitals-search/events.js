import { $, addClass, removeClass } from "../helpers/dom";
import { debounce } from "../helpers/debounce";
import { getCountryCapitals } from "../data/operations";
import { setSearchList } from "./operations";

export const addSearchEventListeners = () => {
  $("#search-js").addEventListener("keyup", (e) =>
    debounce(
      setSearchList(
        getCountryCapitals().filter((capital) =>
          capital.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      ),
      300
    )
  );

  $("#search-group-js").addEventListener("focusin", (e) => {
    addClass($("#search-group-js"), "active");
  });

  $("#search-group-js").addEventListener("focusout", (e) => {
    removeClass($("#search-group-js"), "active");
  });
};
