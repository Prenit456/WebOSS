const $ = (sel) => document.querySelector(sel);

const openWins = [];
let topZ = 10;

function focusWin(win) {
  if (win.style.zIndex != topZ) {
    topZ++;
    win.style.zIndex = topZ;
  }
  openWins.forEach((w) => w.classList.remove("focused"));
  win.classList.add("focused");
}

function openWin(id) {
  const win = $("#win-" + id);
  if (!win) return;
  win.classList.add("open");
  if (!openWins.includes(win)) {
    const n = openWins.length;
    win.style.left = 90 + n * 32 + "px";
    win.style.top = 70 + n * 26 + "px";
    openWins.push(win);
  }
  focusWin(win);
  if (id === "notes") $("#notepad").focus();
  if (id === "term") $("#term-in").focus();
}

function closeWin(win) {
  win.classList.remove("open");
  const i = openWins.indexOf(win);
  if (i > -1) openWins.splice(i, 1);
}

function makeDraggable(win) {
  const bar = win.querySelector(".win-bar");
  bar.addEventListener("pointerdown", (e) => {
    if (e.target.classList.contains("win-x")) return;
    focusWin(win);
    const startX = e.clientX - win.offsetLeft;
    const startY = e.clientY - win.offsetTop;
    const move = (ev) => {
      win.style.left = ev.clientX - startX + "px";
      win.style.top = Math.max(34, ev.clientY - startY) + "px";
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  });
}

["about", "notes", "links", "term"].forEach((id) => {
  const win = $("#win-" + id);
  win.querySelector(".win-x").addEventListener("click", () => closeWin(win));
  makeDraggable(win);
  win.addEventListener("pointerdown", () => focusWin(win));
  $("#menu-" + id).addEventListener("click", () => openWin(id));
  const icon = document.querySelector('.dicon[data-app="' + id + '"]');
  if (icon) icon.addEventListener("click", () => openWin(id));
});

function tick() {
  const d = new Date();
  let h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, "0");
  const ampm = h >= 12 ? "pm" : "am";
  h = h % 12 || 12;
  $("#clock").textContent = h + ":" + m + " " + ampm;
}
tick();
setInterval(tick, 1000);

const deep = location.hash.slice(1);
(deep ? deep.split(",") : ["about"]).forEach(openWin);
