# sable-ui

A small, token-driven React design system built on plain CSS custom properties.

[![CI](https://github.com/Minghan1994/sable-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/Minghan1994/sable-ui/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/sable-ui.svg)](https://www.npmjs.com/package/sable-ui)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

**[Storybook →](https://minghan1994.github.io/sable-ui/)** · [繁體中文說明](./README.zh-TW.md)

---

Most component libraries are a pile of components. The interesting part of a design system is
the layer underneath — where a colour gets a name, where a theme is allowed to change, and what
the build refuses to let you ship. This repository is that layer, with twenty components on top
of it to prove it works.

## What is actually decided here

**Tokens are the only source of truth.** `tokens/*.json` is the one place a raw value may live.
A build step compiles it into 199 CSS custom properties and a typed TypeScript module. No
component hard-codes a colour, a length, or a duration.

**Two layers, and components may only touch one.** Primitives (`color.brand.600`, `space.4`) are
raw values with no opinion about use. Semantic tokens (`color-accent-solid`, `color-text-muted`)
say what a value is *for*. Components reference the semantic layer exclusively, which is what
makes re-theming a change to one file rather than a search across twenty.

**Themes cannot drift.** The token build fails if the light and dark files declare different
token names. Theme drift is the bug that surfaces months later as one unreadable label in dark
mode, and it is much cheaper to fail the build.

**Contrast is tested, not asserted.** A test computes the WCAG contrast ratio of every
text/background and solid/on-solid pair in both themes and fails below 4.5:1. The dark theme
reaches that by inverting the relationship — a light fill with dark text — rather than by
darkening a mid-tone until it goes muddy.

**Plain CSS, no runtime.** No CSS-in-JS, no styling dependency, no class-name hashing. One
stylesheet, ordinary specificity, overridable with a stylesheet of your own.

## Install

```bash
npm install sable-ui
```

```tsx
import { Button, Input, Stack } from 'sable-ui';
import 'sable-ui/styles.css';

export function SignIn() {
  return (
    <form className="sable-root">
      <Stack gap={4}>
        <Input label="Email" type="email" required />
        <Input label="Password" type="password" required />
        <Button type="submit">Sign in</Button>
      </Stack>
    </form>
  );
}
```

`sable-root` opts into the typographic defaults (font stack, page colours). The components work
without it — put it on your app shell or leave it off entirely.

Only interested in the tokens? `import 'sable-ui/tokens.css'` ships the custom properties on
their own, with no component CSS attached.

## Theming

Light is the default. Dark follows the operating system unless the page states a preference:

```html
<html data-theme="dark">
```

`data-theme` works on any element, so one panel can be dark inside a light page.

Re-skinning means overriding the semantic layer — a dozen or so declarations, and never a
component:

```css
:root {
  --sable-color-accent-solid: #0f766e;
  --sable-color-accent-solid-hover: #115e59;
  --sable-color-accent-on-solid: #ffffff;
  --sable-color-focus-ring: #14b8a6;
}
```

Token values are also available to JavaScript, resolved per theme:

```ts
import { themes, token } from 'sable-ui';

themes.dark['--sable-color-accent-solid']; // '#818cf8'
token('color-accent-solid'); // 'var(--sable-color-accent-solid)'
```

## Components

| | |
| --- | --- |
| **Actions** | `Button` · `IconButton` |
| **Forms** | `Field` · `Input` · `Textarea` · `Select` · `Checkbox` · `Radio` · `RadioGroup` · `Switch` |
| **Feedback** | `Alert` · `Spinner` · `Tooltip` · `Modal` |
| **Display** | `Badge` · `Avatar` · `Card` · `Divider` |
| **Navigation** | `Tabs` |
| **Layout** | `Stack` · `VisuallyHidden` |

Each one is documented with live examples in [Storybook](https://minghan1994.github.io/sable-ui/).

## Accessibility

Not a checklist item — several of the API decisions exist because of it:

- `IconButton` cannot be constructed without a `label`. The type will not allow it.
- Form controls own their `aria-describedby` and `aria-invalid` wiring, so help text and error
  messages are always announced.
- `RadioGroup` renders a real `<fieldset>`, so the legend names the set rather than leaving each
  option to be read out of context.
- `Modal` is built on the native `<dialog>`: the focus trap, the inert background, Escape, and
  the top layer come from the platform instead of from code that usually gets one of them wrong.
- `Tabs` implements the ARIA tabs pattern — one tab stop, arrow-key navigation, Home/End.
- `Alert` maps tone to live-region politeness: `warning` and `danger` interrupt, `info` and
  `success` wait.
- Focus is restyled, never removed. Every animation collapses to 1ms under
  `prefers-reduced-motion`.
- Every story is checked by axe through the Storybook a11y addon.

## Development

```bash
npm install        # also generates tokens
npm run dev        # Storybook at :6006
npm test           # Vitest
npm run typecheck
npm run lint       # Biome
npm run build      # library -> dist/
```

Editing a token means editing `tokens/*.json` and running `npm run tokens`. The generated
`src/styles/tokens.css` and `src/tokens/index.ts` are not checked in and never edited by hand.

Changes ship through [changesets](https://github.com/changesets/changesets):

```bash
npx changeset
```

## Not included, on purpose

No data table, no date picker, no combobox, no toast. Each is a project of its own, and a
half-finished one is worse than none. If they arrive, they arrive as considered work — a
Tooltip that keeps its own positioning maths honest is a better argument for the system than a
combobox that only handles the happy path.

The Tooltip is the one place where that trade is visible today: it is positioned with plain CSS
relative to its trigger, so a tip near a clipping container can be cut off. Shipping a
positioning engine to fix it is a bigger decision than it looks, and it has not been made yet.

## License

MIT © Minghan Cheng
