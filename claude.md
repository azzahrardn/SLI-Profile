# CLAUDE.md — SLI Company Profile Website

## Project Overview

**SLI Company Profile Website** — a maritime/shipping industry company profile built with React + TypeScript + Vite.

The architecture has evolved from a **Single Page Application (SPA)** into a **multi-page application**. The home page (`/`) assembles key section components, while dedicated pages exist for About, Products, Articles, etc. What were originally pure section components are now being promoted into full pages as needed.

---

## Tech Stack

| Layer      | Technology                                            |
| ---------- | ----------------------------------------------------- |
| Framework  | React 18 + TypeScript                                 |
| Build Tool | Vite                                                  |
| Routing    | React Router DOM (inferred from multi-page structure) |
| Styling    | CSS Modules / global styles in `src/styles/`          |
| Data       | Static JSON files in `src/database/`                  |
| i18n       | Custom `LanguageContext.tsx` (multi-language support) |
| API        | `src/app/api.ts`                                      |

---

## Project Structure

```
src/
├── app/
│   ├── components/          # Reusable section & UI components
│   │   ├── effects/         # Animation/visual effects
│   │   ├── figma/           # Figma-exported components
│   │   ├── ui/              # Generic UI primitives (buttons, cards, etc.)
│   │   ├── AboutSection.tsx
│   │   ├── AffiliationSection.tsx
│   │   ├── ArticleSection.tsx
│   │   ├── CTASection.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── LanguageContext.tsx   # i18n provider
│   │   ├── Navbar.tsx
│   │   ├── OurProductSection.tsx
│   │   ├── TeamSection.tsx
│   │   ├── TechnologySection.tsx
│   │   ├── VisionMissionSection.tsx
│   │   └── WhySLISection.tsx
│   ├── pages/               # Full page components (each maps to a route)
│   ├── utils/               # Helper functions
│   ├── api.ts               # API layer
│   └── App.tsx              # Root app, routing setup
├── assets/                  # Static assets (images, icons)
├── data/                    # Additional static data
├── imports/                 # Shared imports / re-exports
├── public/                  # Public assets (served as-is)
├── styles/                  # Global CSS, design tokens
├── database/
│   ├── articles/            # Article JSON files (one file per article)
│   └── user/
│       └── admin.json
└── main.tsx
```

---

## Architecture Rules

### Component vs Page — When to Use Which

| Scenario                                               | Use                                                                               |
| ------------------------------------------------------ | --------------------------------------------------------------------------------- |
| A UI block displayed on the home page alongside others | `components/` (e.g. `HeroSection.tsx`)                                            |
| A standalone routed URL (`/about`, `/products`)        | `pages/`                                                                          |
| A component that has grown into its own page           | Move or wrap it: create a page in `pages/` that imports and renders the component |
| A small, reusable UI element (button, card, badge)     | `components/ui/`                                                                  |

### The SPA → Multi-Page Transition Pattern

When a section component needs to become a full page:

1. **Keep the original component** in `components/` — the Home page still uses it.
2. **Create a new page** in `pages/` (e.g. `pages/AboutPage.tsx`) that renders the component, possibly with additional content or layout.
3. **Add the route** in `App.tsx`.
4. **Do NOT delete or gut the section component** — it serves double duty.

```tsx
// pages/AboutPage.tsx — correct pattern
import AboutSection from "../components/AboutSection";
import VisionMissionSection from "../components/VisionMissionSection";
import TeamSection from "../components/TeamSection";

export default function AboutPage() {
  return (
    <>
      <AboutSection />
      <VisionMissionSection />
      <TeamSection />
    </>
  );
}
```

---

## Language & i18n

- All user-facing text **must** go through `LanguageContext.tsx`.
- Never hardcode Indonesian or English strings directly in JSX.
- The context provides the current language and a translation lookup function.
- When adding new text, add translations for **both** `id` (Indonesian) and `en` (English).

```tsx
// Correct usage
const { t } = useLanguage();
return <h1>{t("hero.title")}</h1>;

// Wrong — hardcoded string
return <h1>Tentang Kami</h1>;
```

---

## Data & Content

### Articles

- Each article is a separate JSON file in `src/database/articles/`.
- Filename format: `kebab-case-slug.json`
- When adding a new article, create a new JSON file — do not merge into an existing file.
- The `ArticleSection.tsx` component reads and renders these dynamically.

### Static Data

- Company data (team, products, affiliations) lives in `src/data/` or as props passed to components.
- User/admin data is in `src/database/user/admin.json` — do not expose sensitive fields to the frontend bundle.

---

## Naming Conventions

| Thing           | Convention                 | Example                                    |
| --------------- | -------------------------- | ------------------------------------------ |
| Component files | PascalCase                 | `HeroSection.tsx`                          |
| Page files      | PascalCase + `Page` suffix | `AboutPage.tsx`                            |
| Utility files   | camelCase                  | `formatDate.ts`                            |
| CSS modules     | camelCase classes          | `.heroWrapper`                             |
| JSON data files | kebab-case                 | `our-products.json`                        |
| Article slugs   | kebab-case, descriptive    | `kerjasama-pelni-digitalisasi-armada.json` |

---

## Styling Guidelines

- Global styles and design tokens live in `src/styles/`.
- Prefer **CSS Modules** for component-scoped styles.
- Follow the design system established in the `figma/` components — do not introduce new color values or font sizes without checking existing tokens first.
- The two logo variants (`logo_putih` = white, `logo-CoZwrWTO` = default) are in `dist/assets/` — reference the correct one based on background context (dark navbar → white logo).

---

## Common Tasks

### Adding a New Page

1. Create `src/app/pages/NewPage.tsx`
2. If the page reuses existing section components, import them — don't rewrite.
3. Register the route in `App.tsx`:
   ```tsx
   <Route path="/new-page" element={<NewPage />} />
   ```
4. Add a nav link in `Navbar.tsx` if it should appear in navigation.
5. Add translations for the nav label in `LanguageContext.tsx`.

### Adding a New Article

1. Create `src/database/articles/judul-artikel-singkat.json`
2. Follow the same JSON schema as existing articles (check any existing file for reference).
3. No code changes needed if `ArticleSection.tsx` reads articles dynamically.

### Adding a New Section Component

1. Create `src/app/components/NewSection.tsx`
2. Use `useLanguage()` for all text.
3. Import and place it in the appropriate page(s).
4. If it will appear on Home, add it to `App.tsx` or the home page component in the correct order.

### Modifying the Navbar

- `Navbar.tsx` handles both desktop and mobile navigation.
- If adding a new page link, update both the desktop menu and the mobile menu (they are likely separate JSX blocks).
- Navbar is aware of language — update translations too.

---

## Do's and Don'ts

### ✅ Do

- Keep section components in `components/` even after creating a corresponding page.
- Use the existing `LanguageContext` for every user-visible string.
- Match article JSON filenames to their slug/URL.
- Check `guidelines/Guidelines.md` for brand and design guidelines before making visual changes.
- Use TypeScript types — no `any` unless absolutely necessary.

### ❌ Don't

- Don't hardcode language strings in JSX.
- Don't create a new page by duplicating an existing component's JSX — import and reuse instead.
- Don't add new global CSS that overrides the design token system without discussion.
- Don't modify files in `dist/` — that is the build output, not source.
- Don't add logic to JSON data files — keep them as pure data.
- Don't expose `database/user/admin.json` credentials or sensitive fields in client-rendered components.

---

## Build & Dev

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

Output goes to `dist/`. The `dist/assets/` folder contains hashed JS/CSS bundles — do not edit these manually.

---

## Guidelines Reference

Brand guidelines, tone of voice, and visual standards are documented in:

```
guidelines/Guidelines.md
```

Always consult this before making design or copy decisions.
