import { m } from "./js/date";
import { cleanHandler, diHandler, inputHandler } from "./js/functions";
import { page, pickMonth } from "./js/modules";
import { gel } from "./js/utils";

page(m);

//console.log(localStorage.getItem("plan"));

window.addEventListener("click", (e) => {
  switch (e.target.dataset.rol) {
    case "input":
      inputHandler(e);
      break;
    case "pickM":
      gel("root").innerHTML = "";
      pickMonth();
      break;
    case "pickDiv":
      gel("root").innerHTML = "";
      pickMonth();
      break;
    case "yes":
      gel("root").innerHTML = "";
      if (parseInt(e.target.getAttribute("point")) === m) {
        page(e.target.getAttribute("point"));
      } else {
        page(e.target.getAttribute("point"));
      }
      break;
    case "cls-btn":
      cleanHandler();
      break;
    case "di":
      const { target: t } = e;
      console.log(t.dataset.point);
      diHandler(t.dataset.point);

      break;
    default:
      () => null;
      break;
  }
});
