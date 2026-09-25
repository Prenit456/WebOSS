const pad = $("#notepad");
const status = $("#note-status");

pad.value = localStorage.getItem("pixelos-notes") || "";
if (pad.value) status.textContent = "loaded your saved notes";

let t;
pad.addEventListener("input", () => {
  status.textContent = "typing...";
  clearTimeout(t);
  t = setTimeout(() => {
    localStorage.setItem("pixelos-notes", pad.value);
    const time = new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    status.textContent = "saved at " + time;
  }, 400);
});
