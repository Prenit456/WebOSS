const forced = new URLSearchParams(location.search).get("theme");
const saved = forced || localStorage.getItem("pixelos-theme");
if (saved) document.body.dataset.theme = saved;

document.querySelectorAll(".tbtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.body.dataset.theme = btn.dataset.theme;
    localStorage.setItem("pixelos-theme", btn.dataset.theme);
  });
});