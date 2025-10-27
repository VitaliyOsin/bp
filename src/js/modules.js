import { m, months } from "./date";
import { plan } from "./db";
import { makeLine, transformPlan_2 } from "./functions";
import { cel, gel } from "./utils";

export const page = (month) => {
  const root = gel("root");

  if (!localStorage.getItem("plan_b")) {
    if (!localStorage.getItem("plan")) {
      localStorage.setItem("plan_b", JSON.stringify(transformPlan_2(plan)));
    } else {
      const plan_b = JSON.parse(localStorage.getItem("plan"));
      localStorage.setItem("plan_b", JSON.stringify(transformPlan_2(plan_b)));
    }
  }

  //console.log(JSON.parse(localStorage.getItem("plan")));

  /* if (!localStorage.getItem("plan_b")) {
    localStorage.setItem("plan_b", JSON.stringify(transformPlan_2(plan)));
  } */

  const tplan = JSON.parse(localStorage.getItem("plan_b"));

  //console.log(transformPlan_2(plan));

  root.innerHTML = `
		<div class="ddd">
			<div data-rol="pickM" class="pickM"><div class="pickDiv" data-rol="pickDiv"></div></div>
			<h1>${months[month]}</h1>
			<button class="cls-btn" data-rol="cls-btn">Очистить</buttom>
		</div>
		`;

  root.innerHTML += tplan[month].map((v) => makeLine(month, v)).join("");
};

export const pickMonth = () => {
  const root = gel("root");
  const d = cel("div");
  const conDiv = cel("div");
  conDiv.className = "conDiv";
  d.className = "d";
  d.append(conDiv);
  months.map((v, i, arr) => {
    const dd = cel("div");
    const sp = cel("span");
    sp.className = "yes";
    sp.dataset.rol = "yes";
    dd.style.height = window.innerHeight / 4 - 20 + "px";
    if (i === m) {
      dd.style.background = "#6CFF6A";
    }
    sp.innerHTML = v;
    sp.setAttribute("point", i);
    sp.style.border = "none";
    dd.append(sp);
    dd.className = "yes";
    dd.dataset.rol = "yes";
    dd.setAttribute("point", i);

    conDiv.append(dd);
  });

  root.append(d);
};
