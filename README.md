# 4TP website

The marketing site for 4TP (4 The People): automated software for typing centers,
restaurants, retail and van sales in the UAE.

The look follows the 4TP origami film (`4tp-video/src/origami`): cream sketchbook paper,
ink outlines that "boil", orange folded paper. The logo is the 4TP wordmark from the
Ledgerly sidebar, traced to paths in `src/origami/logoPaths.js`.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run deploy   # build for GitHub Pages and push it to the gh-pages branch
```

Live: https://ledgerly111.github.io/4thepeople/

## Where things are

- `src/origami/` — the paper kit: fold geometry, ink filters (`InkDefs`, `useBoil`),
  the logo, scroll reveals (`useReveal`).
- `src/components/HeroFilm.jsx` — the hero: the sheet folds into the 4TP icon and the dot
  hops round every system.
- `src/components/FoldingSheet.jsx` — the looping fold on the custom-software sections.
- `src/data/products.js` — all copy for the system pages (desks, CRM, MCP server, BYTE AI).
- `src/components/byte/ByteAurora.jsx` — BYTE AI's icon, as drawn in ledgerly-react.
