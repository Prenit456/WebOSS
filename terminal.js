const out = $("#term-out");
const input = $("#term-in");

function print(text, cls) {
  const line = document.createElement("div");
  if (cls) line.className = cls;
  line.textContent = text;
  out.appendChild(line);
  out.scrollTop = out.scrollHeight;
}

const commands = {
  help: () => print("commands: help, whoami, date, open <app>, clear, sudo, capybara"),
  whoami: () => print("visitor (nice to meet you)"),
  date: () => print(new Date().toString()),
  clear: () => (out.innerHTML = ""),
  open: (arg) => {
    if ($("#win-" + arg)) {
      openWin(arg);
      print("opening " + arg + "...");
    } else {
      print("no such app: " + arg);
    }
  },
  sudo: () => print("nice try. this is my computer."),
  capybara: () => print("   (рука)\n  ( •̀ ω •́ )✧  capybara approved"),
};

input.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  const raw = input.value.trim();
  input.value = "";
  if (!raw) return;
  print("visitor@pixelos:~$ " + raw, "cmd");
  const [cmd, ...args] = raw.split(/\s+/);
  if (commands[cmd]) commands[cmd](...args);
  else print(cmd + ": command not found (try help)");
});

print("pixelOS terminal. type help to see commands.");
