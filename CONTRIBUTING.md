# Contributing

Issues and pull requests are welcome. This is a small library with a deliberately narrow scope,
so the most useful contributions are usually depth on what already exists rather than another
component.

## Getting set up

```bash
npm install     # runs the token build as part of `prepare`
npm run dev     # Storybook on http://localhost:6006
```

Node 22 or newer (see `.nvmrc`). The published package supports Node 20, but the toolchain does
not.

## The rules the codebase actually enforces

**No raw values outside `tokens/`.** If a component needs a colour, a length, or a duration,
there is a token for it — and if there is not, add one to `tokens/*.json` and regenerate. A
literal `#4f46e5` or `12px` in a component stylesheet is a bug, not a shortcut.

**Components use semantic tokens only.** `var(--sable-color-accent-solid)`, never
`var(--sable-color-brand-600)`. The primitive layer belongs to the themes.

**Both themes, always.** Every semantic token must exist in `semantic.light.json` and
`semantic.dark.json`. The build fails otherwise, which is the point.

**New colour pairs get a contrast test.** If you add a token pair that ends up as text on a
background, add it to the list in `src/tokens/contrast.test.ts`.

## Adding a component

Each component is a folder under `src/components/`:

```
Thing/
  Thing.tsx          # the component
  Thing.css          # its styles, semantic tokens only
  Thing.stories.tsx  # every state worth seeing
  Thing.test.tsx     # behaviour and accessibility
```

Then export it from `src/index.ts`.

Some conventions worth matching:

- Variants and states are `data-*` attributes, not extra class names. CSS reads them with
  attribute selectors, which keeps the class list flat and the stylesheet greppable.
- Where a component has both a palette and a weight — `tone` and `variant` on `Button` — the
  tone sets local custom properties and the variant paints with them. Adding a tone should be
  one rule block, not four.
- Anything that can be uncontrolled should be, through `useControllableState`.
- Prefer the platform. A native `<select>`, a native `<dialog>`, a real `<fieldset>` — these
  carry behaviour that is expensive and error-prone to rebuild.

## Accessibility expectations

A component is not finished until:

- it is operable by keyboard alone, with a visible focus style;
- its accessible name and description come from the DOM, not from a comment saying they should;
- the a11y panel in Storybook is clean for every story;
- motion respects `prefers-reduced-motion`.

If an API makes it possible to build an inaccessible instance, consider changing the API. That
is why `IconButton` takes a required `label`.

## Before opening a pull request

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Then describe the change for the changelog:

```bash
npx changeset
```

Pick `patch` for a fix, `minor` for a new component or prop, `major` for anything that breaks
existing usage — including a token rename, since consumers style against those names.
