# score-93fyi

Pickleball doubles scoring, live at https://score.93.fyi. Static files, no build step. Vercel deploys `main`.

- `/` (`index.html`): the odd-or-even explainer, the score checker and the rally simulator.
- `/quiz/` (`quiz/index.html`): the scoring quiz. `?topic=points|call|serve|sides` opens on one topic.
- `shared.js`: every string (EN, DE, FR, IT, RM), the language switch, the scoring rules (`PB.step`) and the court drawing (`PB.mountCourt`).
- `shared.css`: colours, buttons and the court.

To preview locally, run `python3 -m http.server` in this folder. The pages load `/shared.js` and `/shared.css` by absolute path, so opening the HTML files directly will not work.
