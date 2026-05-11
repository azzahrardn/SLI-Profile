# SLI Company Profile — Design & Development Guidelines

## Brand Context

SLI builds maritime monitoring technology — AI-powered ship CCTV and fleet management software. The visual language should convey **trust, precision, and technical authority** while remaining approachable. Think: deep ocean blues, clean structure, purposeful motion.

---

## Color System

All colors are used as Tailwind arbitrary values `[#hex]`. These are the canonical tokens — do not introduce new colors without a strong reason.

### Primary Palette

| Token           | Hex       | Usage                                                                |
| --------------- | --------- | -------------------------------------------------------------------- |
| `brand-primary` | `#0891b2` | Primary actions, active states, links, accent lines, icon highlights |
| `brand-deep`    | `#0c4a6e` | Headings, dark text on light bg, gradient endpoint, deep UI elements |
| `brand-surface` | `#f0f9ff` | Section backgrounds (alternating), light container fills             |
| `brand-border`  | `#e0f2fe` | Card borders, dividers, subtle outlines                              |

### Neutral Palette

| Token       | Hex       | Usage                                                  |
| ----------- | --------- | ------------------------------------------------------ |
| `text-body` | `#64748b` | Body text, descriptions, secondary labels              |
| `white`     | `#ffffff` | Card backgrounds, active card fill, image caption bars |

### Gradient

The canonical brand gradient is always **`from-[#0891b2] to-[#0c4a6e]`**, direction `bg-gradient-to-br` (for icons/badges) or `bg-gradient-to-r` (for tab indicators and horizontal elements).

```tsx
// Correct — icon container active state
"bg-gradient-to-br from-[#0891b2] to-[#0c4a6e]";

// Correct — tab / button active state
"bg-gradient-to-r from-[#0891b2] to-[#0c4a6e]";
```

Never use a single flat color where the gradient is established (e.g. active icon backgrounds, active tab pills).

---

## Typography

### Scale

| Element                   | Classes                                                        | Notes                                                |
| ------------------------- | -------------------------------------------------------------- | ---------------------------------------------------- |
| Section label (eyebrow)   | `text-xs sm:text-sm tracking-[0.2em] uppercase text-[#0891b2]` | Always uppercase, wide tracking                      |
| Section heading (h2)      | `text-2xl sm:text-3xl md:text-4xl text-[#0c4a6e]`              | Responsive, deep blue                                |
| Card / feature title (h4) | `font-semibold text-base sm:text-lg`                           | Active: `text-[#0891b2]`, Inactive: `text-[#0c4a6e]` |
| Body / description        | `text-sm text-[#64748b] leading-relaxed`                       | Slate-500 equivalent                                 |
| Caption / small label     | `text-sm font-semibold text-[#0c4a6e]`                         | Used in image caption bars                           |

### Rules

- Section headings always have a corresponding **eyebrow label** above them (uppercase, tracked, `#0891b2`).
- After the heading, always add a **20px accent underline**: `<div className="w-20 h-1 bg-[#0891b2] mx-auto mt-4" />`
- No bold on body text. Bold is reserved for headings and card titles.
- Subheadings under section headings use `text-[#64748b] max-w-3xl mx-auto text-sm sm:text-base`.

---

## Spacing & Layout

### Section Padding

All top-level `<section>` elements use this vertical padding pattern:

```tsx
className = "py-14 sm:py-20 md:py-28";
```

### Container

```tsx
className = "max-w-7xl mx-auto px-5 sm:px-6 lg:px-8";
```

### Section Header Block

Every section starts with this structure:

```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="text-center mb-10 sm:mb-12"
>
  <p className="text-[#0891b2] tracking-[0.2em] uppercase text-xs sm:text-sm mb-3">
    {t("section.label")}
  </p>
  <h2 className="text-[#0c4a6e] text-2xl sm:text-3xl md:text-4xl mb-3 px-2">
    {t("section.heading")}
  </h2>
  <p className="text-[#64748b] max-w-3xl mx-auto text-sm sm:text-base">
    {t("section.subheading")}
  </p>
  <div className="w-20 h-1 bg-[#0891b2] mx-auto mt-4" />
</motion.div>
```

### Grid

- Two-column feature layout: `grid md:grid-cols-2 gap-6 md:gap-10 items-start`
- No more than 2 columns on content-heavy layouts. Use 3 columns only for cards with minimal content (e.g. stat cards, icon grids).

---

## Motion & Animation

All animations use **Framer Motion** (`motion/react`). Never use CSS keyframes for entrance animations — use motion.

### Section Entrance (standard)

```tsx
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6 }}
```

### Staggered Children (delayed)

```tsx
transition={{ duration: 0.5, delay: 0.2 }}
```

Use increments of `0.1–0.2s` for staggered items.

### Tab / Panel Swap

```tsx
// Horizontal slide on tab change
initial={{ opacity: 0, x: -20 }}  // or x: 20 depending on direction
animate={{ opacity: 1, x: 0 }}
exit={{ opacity: 0, x: 20 }}
transition={{ duration: 0.3 }}
```

### Image / Content Swap (vertical fade)

```tsx
initial={{ opacity: 0, y: 16 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -16 }}
transition={{ duration: 0.35, ease: "easeInOut" }}
```

### Expand / Collapse (mobile accordion)

```tsx
initial={{ opacity: 0, height: 0 }}
animate={{ opacity: 1, height: "auto" }}
exit={{ opacity: 0, height: 0 }}
transition={{ duration: 0.3 }}
```

### Tab Indicator (shared layout)

Use `layoutId` for smooth tab pill movement — never re-render the indicator:

```tsx
<motion.div
  layoutId="activeTabIndicator"
  className="absolute inset-0 bg-gradient-to-r from-[#0891b2] to-[#0c4a6e] rounded-lg shadow-md"
  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
/>
```

### Rules

- Always use `viewport={{ once: true }}` on `whileInView` — elements should not re-animate on scroll back up.
- Do not animate layout-affecting properties (width, padding) on hover. Use `scale` or `opacity` only for hover micro-interactions.
- Auto-cycling interactive elements (carousels, feature scrollers) use **5000ms intervals**.

---

## Components

### Card (Feature Card)

Feature cards have two states: **active** and **inactive**.

```tsx
// Inactive
"rounded-xl p-5 border-2 border-[#e0f2fe] bg-white/60 cursor-pointer
 hover:border-[#0891b2]/40 hover:bg-white transition-all duration-300"

// Active
"rounded-xl p-5 border-2 border-[#0891b2] bg-white shadow-lg"
```

- Border radius: `rounded-xl` (12px)
- Padding: `p-5`
- Transition: `transition-all duration-300`
- Active state adds `shadow-lg` — inactive has no shadow.

### Icon Container (inside card)

```tsx
// Inactive
"w-12 h-12 rounded-xl bg-[#e0f2fe] flex items-center justify-center shadow-md";
// Icon: text-[#0891b2]

// Active
"w-12 h-12 rounded-xl bg-gradient-to-br from-[#0891b2] to-[#0c4a6e] scale-110 shadow-md";
// Icon: text-white
```

- Always `w-12 h-12` (48px) for feature icons, `w-9 h-9` (36px) for caption/small contexts.
- Icon size inside: `w-6 h-6` for large containers, `w-5 h-5` for small.
- `scale-110` on active state for the subtle "pop" effect.

### Tab Switcher

```tsx
// Outer container
"inline-flex bg-white rounded-xl p-1.5 shadow-md border border-[#e0f2fe]";

// Button base
"relative px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300";

// Active: text-white (color comes from gradient overlay via layoutId motion.div)
// Inactive: text-[#64748b] hover:text-[#0891b2] hover:bg-[#f0f9ff]
```

- Always use `layoutId` animated indicator — never toggle background classes directly on the button.
- Tab switchers sit centered: `flex justify-center`.
- Max 4 tabs. If more options needed, use a dropdown instead.

### Image Card (sticky preview)

```tsx
"rounded-2xl overflow-hidden shadow-2xl border-2 border-[#e0f2fe]";
```

- Image inside: `w-full object-contain aspect-video`
- Caption bar below image: `bg-white px-5 py-4 flex items-center gap-3`
- Caption icon: `w-9 h-9 rounded-lg bg-gradient-to-br from-[#0891b2] to-[#0c4a6e]`
- Caption text: `text-[#0c4a6e] font-semibold text-sm`

### Section Background Alternation

Alternate between two backgrounds for visual rhythm:

- Light sections: `bg-[#f0f9ff]`
- White sections: `bg-white`

Never use two consecutive sections with the same background.

### Accent Divider Line

```tsx
<div className="w-20 h-1 bg-[#0891b2] mx-auto mt-4" />
```

Used only under section headings, always centered.

---

## Scrollable Lists

When a list is scrollable on desktop but not mobile:

```tsx
"md:max-h-[560px] md:overflow-y-auto scroll-smooth
 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
```

Always hide scrollbars visually — no native scrollbar should ever be visible.

---

## Responsive Strategy

- **Mobile-first**: write base styles for mobile, add `sm:`, `md:`, `lg:` overrides.
- The sticky image preview (desktop) is **hidden on mobile** — `hidden md:block`. On mobile, the active item's image expands inline below the text using `AnimatePresence`.
- Never use `absolute` positioning for layout — use flex/grid.
- Sticky desktop elements use `md:sticky md:top-28`.

---

## Icons

- Icon library: **Lucide React** (`lucide-react`). Do not import from other icon libraries.
- Icons are always used inside a styled container div, never bare in the DOM.
- Standard sizes: `w-6 h-6` (24px) for feature icons, `w-5 h-5` (20px) for smaller contexts.

---

## Tone of Voice & Copy

SLI operates in the maritime technology sector (AI-powered ship CCTV + fleet monitoring). Copy should be:

- **Precise and technical**, but not jargon-heavy — operators and executives both read this.
- **Confidence-first**: lead with capability, not caveats.
- **Action-oriented**: use active voice. "Monitor your fleet in real-time" not "Fleet monitoring can be done in real-time."
- **Bilingual (ID/EN)**: always provide both. Indonesian is the primary language for the domestic market; English for international/formal contexts.
- Avoid superlatives like "best" or "most advanced" unless backed by a specific claim.
- Section eyebrow labels are short noun phrases: "OUR PRODUCTS", "OUR TEAM", "WHY SLI" — not sentences.

---

## Do's and Don'ts

### ✅ Do

- Use the brand gradient (`#0891b2` → `#0c4a6e`) for all active/highlighted icon containers and tab indicators.
- Wrap all section entrance animations in `whileInView` with `once: true`.
- Use `AnimatePresence` with `mode="wait"` when swapping content panels.
- Keep `border-2` on all interactive cards — width never changes, only color.
- Always pair a section heading with an eyebrow label above and an accent line below.
- Hide scrollbars on all custom scrollable containers.

### ❌ Don't

- Don't use colors outside the defined palette — especially not generic Tailwind blues like `blue-500` or `sky-600`.
- Don't animate `height` or `width` directly except inside `AnimatePresence` expand/collapse patterns.
- Don't use `useEffect` with `setInterval` without cleaning up in the return.
- Don't show a scrollbar on any scrollable container — always apply the `[scrollbar-width:none]` trio.
- Don't use bare flat colors (`bg-[#0891b2]`) for icon containers — always use the gradient.
- Don't place two sections with the same background color (`bg-[#f0f9ff]`) side by side.
- Don't hardcode text — use `t()` from `useLanguage()` for every user-visible string.
