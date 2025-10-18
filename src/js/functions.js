import { dd, m } from "./date";
import { page } from "./modules";

export function transformPlan(startPlan) {
  let p = Object.values(startPlan);
  let newPlan = [...p].reduce((t, a, i) => {
    let ix = Object.values(a);
    const m = ix.reduce((t1, a1, i1) => {
      t1[i1.toString()] = {
        date: (i1 + 1).toString(),
        month: i,
        list: a1,
        done: false,
      };
      return t1;
    }, []);
    t.push(m);
    return t;
  }, []);
  return newPlan;
}

export function makeLine(
  mth = 0,
  value = {
    date: 1,
    month: 0,
    list: ["Пс.55", "Деян.27", "Лев.20-21"],
    done: false,
  }
) {
  const isT = value.date === dd.toString() && Number(mth) === m ? "today" : "";
  const isTCh =
    value.date === dd.toString() && Number(mth) === m && value.done
      ? "today-ch"
      : "";
  const isCh = value.done ? "ch" : "";
  return `<div class="div ${isT} ${isCh} ${isTCh}" ${isT ? `mark="today"` : ""}>
        
        <input class="input" type="checkbox" data-done="${mth}-${value.date}" ${
    value.done ? "checked" : ""
  }>
        <div class="dayN">${value.date}</div>
        ${value.list.map((v) => `<div class="di">${v}</div>`).join("")}
    </div>`;
}

export function inputHandler(e) {
  const [mo, da] = e.target.dataset.done.split("-");
  const pl = JSON.parse(localStorage.getItem("plan"));
  pl[mo][da - 1].done = !pl[mo][da - 1].done;
  localStorage.setItem("plan", JSON.stringify(pl));
  page(mo);
}

export function cleanHandler() {
  localStorage.removeItem("plan");
  page(m);
}
