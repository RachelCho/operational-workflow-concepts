---
name: invisible-scheduling-design
description: Use this skill to generate well-branded interfaces and assets for Invisible Scheduling, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping the Invisible Scheduling Partner Dashboard and related surfaces.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick orientation

- **Brand**: Invisible Scheduling — home healthcare scheduling platform
- **Primary typeface**: Roboto (400/500/600/700)
- **Primary color**: Primary teal `#007A75` · Primary container `#003331` · Tertiary container `#B3E4DE`
- **Tokens**: `colors_and_type.css` — import this in every artifact
- **Icons**: Material Symbols Outlined, 24px optical, weight 400, fill 0

## Files

- `README.md` — full product context, content + visual foundations, iconography
- `colors_and_type.css` — design tokens (colors, type scale, spacing, shadows, radii)
- `assets/` — logos, brand marks
- `preview/*.html` — small specimens for each token group (for reference)
- `ui_kits/partner-dashboard/` — React + Babel recreation of the Partner Dashboard
  - `components.jsx` — Sidebar, TopBar, Button, StatusChip, KpiCard, Alert, DashboardTable, Tabs, Avatar, Icon
  - `screens.jsx` — TodayScreen, VisitsScreen, CliniciansScreen
  - `index.html` — click-thru prototype

## Rules of thumb

- Default background for dashboards: `var(--gray-50)` (#F9F9F9). Cards are `#fff` with `1px solid var(--gray-200)` and `border-radius: 12px`, shadow `var(--shadow-xs)`.
- Never use color alone for status — always pair with an icon or label. The `StatusChip` component is the canonical pattern.
- Primary actions use the primary teal (`#007A75`) as the solid fill. Secondary actions are white with a gray-300 border.
- Tone: direct, action-first, clinical but human. "Needs assignment", not "Pending". Avoid filler words.
- No emoji in UI (except the occasional checkmark/warning inside chip labels, but prefer icons).
- No gradients in product UI. The deep teal radial gradient is reserved for marketing/cover art.
