// CSS
import "../style.css";

// JS
import pages from "./pages/index";
import utils from "./util/index";

(() => {
  window.addEventListener("load", () => {
    pages();
    utils();
  });

})();
