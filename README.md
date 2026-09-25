# pixelOS

a tiny operating system that lives in a browser tab. made for the
[webOS jam](https://jams.hackclub.com/batch/webOS/part-1) — html, css and a
few hundred lines of js, no frameworks.

![desktop](devlog3.png)

## run it

it's all static files, so any web server works:

```sh
python3 -m http.server 8123
# then open http://localhost:8123
```

(or just open index.html directly, but a server is nicer. no password, no
login, it's a website.)

## what's inside

- **about.txt** — who i am, what this is
- **notes** — autosaves as you type (localStorage, survives refresh)
- **links** — my stuff, elsewhere
- **terminal** — try `help`. yes, `sudo` is denied. there's a capybara.

windows drag from the title bar, close with the red button, and clicking one
brings it to front. the clock is real. the wallpaper glows.

## tricks

you can deep link apps and themes in the url:

```
index.html#notes,term      open these apps at boot
index.html?theme=mint      force a theme (night / mint / sunset / paper)
```

theme choice is saved, so normally you just pick a swatch in the top bar and
it remembers.

## build notes

progress + screenshots are in [devlog1](devlog1.md),
[devlog2](devlog2.md), [devlog3](devlog3.md).

file layout is deliberately boring:

```
index.html     markup for topbar, desktop, windows
style.css      all styling, colors live in css variables per theme
script.js      window manager (open/close/focus/drag) + clock
notes.js       the notepad + autosave
terminal.js    the terminal
theme.js       theme switching + persistence
```

webOS 2, i'm ready for you.
