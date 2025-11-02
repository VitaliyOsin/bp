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

export function transformPlan_2(startPlan) {
  const tp = Object.values(startPlan);
  const newPlan = tp.map((v, i) => {
    const tv = Object.values(v);
    return tv.map((m, n) => ({
      date: (n + 1).toString(),
      month: i,
      list: m.list
        ? m.list.map((l, li) => ({
            text: l,
            done: false,
          }))
        : m.map((l, li) => ({
            text: l,
            done: false,
          })),
      done: m.done !== undefined ? m.done : false,
    }));
  });
  return newPlan;
}

export function makeLine(
  mth = 0,
  value = {
    date: 1,
    month: 0,
    list: [
      { text: "Пс.55", done: false },
      { text: "Деян.27", done: false },
      { text: "Лев.20-21", done: false },
    ],
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
        
        <input class="input" type="checkbox" data-rol="input" data-done="${mth}-${
    value.date
  }" ${value.done ? "checked" : ""}>
        <div class="dayN">${value.date}</div>
        ${value.list
          .map(
            (v, i) =>
              `<div ${
                v.text.length > 10 ? "style='font-size:11px'" : ""
              } data-point="${mth}-${
                value.date - 1
              }-${i}" data-rol="di" class="di${v.done ? " di-marked" : ""}">${
                v.text
              }</div>`
          )
          .join("")}
    </div>`;
}

export function inputHandler(e) {
  const [mo, da] = e.target.dataset.done.split("-");
  const pl = JSON.parse(localStorage.getItem("plan_b"));
  pl[mo][da - 1].done = !pl[mo][da - 1].done;
  if (!pl[mo][da - 1].done) {
    pl[mo][da - 1].list.forEach((v) => {
      v.done = false;
    });
  }
  localStorage.setItem("plan_b", JSON.stringify(pl));
  page(mo);
}

export function diHandler(point) {
  const [mo, da, pos] = point.split("-");
  const pl = JSON.parse(localStorage.getItem("plan_b"));
  pl[mo][da].list[pos].done = !pl[mo][da].list[pos].done;
  if (pl[mo][da].list.reduce((t, a) => t & a.done, true)) {
    pl[mo][da].done = true;
  } else {
    pl[mo][da].done = false;
  }
  localStorage.setItem("plan_b", JSON.stringify(pl));
  page(mo);
}

export function cleanHandler() {
  localStorage.removeItem("plan_b");
  if (localStorage.getItem("plan_b")) {
    localStorage.removeItem("plan_b");
  }
  page(m);
}
