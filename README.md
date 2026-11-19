# Deadlock Analysis and Resource Allocation Dashboard

AI-Assisted Dashboard Development and Deadlock Analysis – Operating Systems internal assessment (Third-Year Computer Engineering).

An interactive web application that demonstrates resource allocation and deadlock management:
Banker's Algorithm (Need matrix, safe sequence), resource-request validation, deadlock detection,
prevention (resource ordering) and recovery (process termination), plus six executable test cases.

Plain HTML, CSS and JavaScript. **No dependencies, no build step.**

## Run locally (VS Code)

1. Extract `Deadlock_Analysis_Dashboard_Source_Code.zip` (right-click → Extract All).
2. In VS Code: **File → Open Folder…** and choose `Deadlock_Analysis_Dashboard`.
3. Run it using ONE of these:
   - **Simplest:** double-click `index.html` to open it in your browser.
   - **Live Server:** install the "Live Server" extension, right-click `index.html` → *Open with Live Server*.
   - **Node.js (optional):** open a terminal (Ctrl+`) and run `npm start`, then visit http://localhost:3000.
4. Optional headless test run (needs Node.js 16+): `npm test`. No `npm install` is needed.

## Folder structure

```
Deadlock_Analysis_Dashboard/
├── index.html          Page shell, sidebar, loads CSS and scripts
├── css/styles.css      Dark navy dashboard theme
├── js/
│   ├── state.js        Default sample data, saved state, helpers
│   ├── banker.js       Need matrix, Safety Algorithm, Request Algorithm, validation
│   ├── graph.js        Resource Allocation Graph, DFS cycle detection, SVG drawing
│   ├── pages.js        Overview, Configuration, Banker, Request, Detection, Recovery, Prevention
│   ├── tests.js        TC1–TC6 and the Test Cases / report page
│   └── main.js         About page, router and start-up
├── tests/run-tests.js  Runs TC1–TC6 in Node
├── scripts/serve.js    Optional local web server
├── package.json
├── .gitignore
└── README.md
```

Scripts are plain `<script>` tags (not ES modules) so the app also works when opened straight from disk.
Keep the load order in `index.html`.

## Algorithms

- Banker's Safety Algorithm (`safety` in `js/banker.js`)
- Banker's Resource-Request Algorithm (`req` in `js/banker.js`): validation order is Need, then Available, then temporary allocation, then safety check
- Cycle detection by depth-first search on a resource allocation graph (`cycle` in `js/graph.js`)
- Prevention by fixed resource ordering, recovery by process termination

## Test cases

| ID | Scenario | Expected |
|----|----------|----------|
| TC1 | Default dataset | SAFE, P1 → P3 → P4 → P0 → P2 |
| TC2 | P0 requests (0,4,0) | WAITING, state unchanged |
| TC3 | P4 requests (3,3,0) | DENIED (unsafe), state restored |
| TC4 | R1/R2 single-instance example | Cycle found, DEADLOCK |
| TC5 | Ordering R1 → R2 | R2-then-R1 rejected, no cycle |
| TC6 | Available = 0, Need = 0, bad ID, negative request, Allocation > Maximum | Each handled correctly |

Run them in the app (Test Cases page) or in the terminal with `npm test`.

## Known limitations

- Detection and recovery use the fixed two-process, single-instance example; there is no general multi-instance detection matrix.
- The prevention demo covers P0, P1, R1 and R2 only.
- A cycle proves deadlock only for single-instance resources.
- Desktop/laptop layout (basic phone fallback). Dark theme only.

## Publish on GitHub Pages

Push the folder to a repository, then Settings → Pages → Deploy from branch → `main` / root. The site opens at `https://<your-username>.github.io/<repo-name>/`.
