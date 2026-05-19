# A design system and operational workflow exploration for Invisible Scheduling — an in-home healthcare scheduling and dispatch platform.

Focused on:
- AI-assisted scheduling workflows
- Operational orchestration systems
- Dispatch coordination
- Human-in-the-loop healthcare operations
- Design system architecture

Primary product:
Partner Dashboard — a desktop platform for scheduling, clinician assignment, branch management, and operational monitoring.
---

## Index

Foundations
- `colors_and_type.css` — CSS variables for colors, type scale, radii, shadows, spacing
- `fonts/` — Roboto + Roboto Condensed + Roboto SemiCondensed TTF files (locally hosted, 100→900 + italics)

Preview cards (registered in the Design System tab)
- `preview/` — one HTML card per design-system token group

UI kit
- `ui_kits/partner-dashboard/` — high-fidelity recreation of the Partner Dashboard
  - `index.html` — interactive click-through of the key screens
  - `*.jsx` — component files (Sidebar, Topbar, JobTable, StatusChip, etc.)

Skill
- `SKILL.md` — Agent Skill front-matter so this folder is portable to Claude Code

---

## Sources

- **Figma file:** "Design System v1.fig" — mounted as a virtual filesystem.
  Top-level pages: Cover, Design-Principles, AI-Generated-Design-Usage-Guidelines,
  Favicon, Logos, Typography-Scale, Color-Tokens, Icons, Spacing-Scale,
  Shadows-blurs, Grids-spacing, Buttons-WIP, Chips, Alert, Container, Date-Picker,
  Table-and-Row, Indicator, DS-Support. Authored by Rachel Cho.
- **Codebase:** `RachelCho/invisible-scheduling` — **not accessible**. The GitHub
  App is not installed on this repo. See CAVEATS.

---

## Company & product context

Invisible Scheduling runs a logistics layer for in-home clinical visits: physical
therapy, labs, vaccinations, post-acute follow-ups. Partner health systems and
payers use the Invisible Scheduling Partner Dashboard to:

- Enter a patient / home address / service type
- Let the system auto-schedule against a pool of field clinicians
- Monitor branches, clinicians and the queue of appointments that need action
- See status at a glance ("Needs Assignment", "In Review", "Completed", "Failed")

The dashboard is information-dense but restrained: mostly white surfaces, a
single teal brand color, status driven by semantic color + icon, and Material-y
chrome (Roboto type, 4/8px rhythm, subtle shadows, small dashed WIP borders in
Figma that are **not** shipped).

The "Invisible Scheduling" framing: operators shouldn't have to manually assign
appointments — the product makes the scheduling disappear.

---

## CONTENT FUNDAMENTALS

**Voice.** Plainspoken, operational, clinical-adjacent. Think airline gate
agent: short, accurate, no exclamation points. Never marketing-speak inside the
product.

**Tense & person.** Second-person ("you") for instructions; imperatives for
actions ("Assign clinician", "Confirm visit"). Never "we" inside the product.

**Casing.** Title Case on primary buttons and nav items; Sentence case on
secondary labels, helper text, and descriptions. Status chips are Title Case:
"Needs Assignment", "In Review", "Completed", "Failed". Headings are bold
Roboto, no all-caps.

**Tone.** Direct and calm. Error messages describe what happened and what to
do next — never blame the user. Empty states acknowledge the nothing and
suggest one action.

**Emoji.** Not used in product UI. Status is conveyed with icons + color + text
(the color system explicitly says "Never use color alone"). Emoji do appear in
*specimen screens inside the Figma* (✓ ⚠ ℹ ✕ on status pills in the color
sheet) but those are placeholders for real icons.

**Specific examples (all pulled from the Figma):**
- `Heading 1`: "Button Component" / "Design System"
- `Subtitle`: "Comprehensive design system documentation for button components"
- `Supporting text`: "Our design system leverages a purposeful set of color styles. Based on Invisible Scheduling Design System with optimized color palette for healthcare dashboards. Designed for accessibility and clear visual hierarchy."
- `Section header`: "Needs Scheduling"
- `Status chip labels`: "Completed", "Needs Assignment", "In Review", "Failed"
- `Principle`: "Consistency builds trust. Users should not have to relearn behaviors across surfaces."
- `Principle`: "Prevent errors before explaining them. The best error message is the one users never see."
- `Footer`: "Invisible Scheduling Brand Guidelines • Updated for WCAG 2.1 AA/AAA Compliance • Version 2.0 • Last Updated: 2025"

---

## VISUAL FOUNDATIONS

**Colors.** The system is built around a single brand color — **primary
teal `#007A75`** — on a near-white surface (`#FFFFFF` / `#F9F9F9` off-white). Dark
text sits on `#181D27` or `#111827`. Supporting palette: navy `#1A1F36`,
mint accent `#4FA79F`, light mint `#7BCDC7`, accessible gray `#767676`, dark
gray `#5A5A5A`. Semantic: green `#10B981` success, red `#DC362E` error,
yellow/amber warning, blue info. Each hue has a 50–900 ramp. Primary 900 is
`#003331`. Never use color alone to convey state — always pair with icon/text.

**Typography.** `Roboto` is the single product typeface, shipped in three
width families — **Roboto** (proportional, default), **Roboto SemiCondensed**
(~92% width), and **Roboto Condensed** (~80% width). All three families ship
the full weight axis from **100 Thin → 900 Black** with italics; default body
text is 400, emphasis is 500/600, headings are 700. Use the condensed widths
for dense tabular layouts or tight KPI labels; default to proportional Roboto
everywhere else. Mono is `Roboto Mono` for token names / code.
Scale is a classic 12-step display/text ramp: Display 2xl 72/90 →
Display xl 60/72 → lg 48/60 → md 36/44 → sm 30/38 → xs 24/32 →
Text xl 20/30 → lg 18/28 → md 16/24 → sm 14/20 → xs 12/18 → xxs 10/14. Display
sizes use -2% letterspacing; body is neutral. Line height is px-locked in the
Figma; rem values are documented in the type sheet.

**Spacing.** 4px base, 8px rhythm. Container padding is typically 16, 20 or
24px. Section gap is 32 / 48 / 53 / 64 depending on density (the color sheet
uses 53 between palette rows, 60 between groups — more atmospheric than a
strict 8-grid).

**Backgrounds.** Almost always flat white (`#FFFFFF`) or off-white
(`#F8F9FA` / `#F9F9F9`). One brand gradient exists, on the file cover only:
`radial-gradient(#1D3E3C, #00DAD5)`. There is a 12px teal "gradient strip" at
the top of documentation pages. **No hand-drawn illustrations, no repeating
patterns, no noise textures** in product UI.

**Animation.** Not explicitly specified in the Figma. Product convention:
150–200ms ease-out on hover, 200–300ms ease-in-out on open/close, no bounces.
Page transitions are instant.

**Hover.** Buttons darken by ~1 step in the ramp (Teal 600 → Teal 700). Row
hover is a flat `#F9FAFB` (gray-50) fill. Icon-only buttons show a
`#F3F4F6` circular wash.

**Press.** Buttons slightly darker again (Teal 800) and shift shadow down —
no scale/shrink. Pressed rows get a `#ECEEF2` fill.

**Borders.** Almost always hairline `1px solid #E5E7EB` (gray-200). Stronger
dividers use `rgba(0,0,0,0.1)`. Component outlines use `2px` for emphasis
blocks (error/success cards in the style guide). Dashed violet borders
(`#7B61FF` / `#9747FF` / `#8A38F5`) are Figma-only "WIP" frame guides — they
are **not** part of the real UI.

**Shadows.** Two systems:
- *Soft product shadow:* `0px 1px 2px -1px rgba(0,0,0,0.1), 0px 1px 3px 0px rgba(0,0,0,0.1)` — on cards, nav, modals.
- *Material elevated shadow:* `0px 1px 3px 1px rgba(0,0,0,0.15), 0px 1px 2px 0px rgba(0,0,0,0.3)` — on popovers, icon buttons, elevated toolbars.

**Corner radii.** `4`, `6`, `8`, `10`, `12`, `14`, `16`. Buttons are `8`;
cards/containers `10–14`; pills/chips `999` (fully round); the app logo mark
is `12`.

**Cards.** White fill, `1px solid rgba(0,0,0,0.1)` border, `10–14px` radius,
soft product shadow, `24–33px` padding, 8–16px internal gap.

**Transparency & blur.** Minimal. Overlays use `rgba(0,0,0,0.5)` solid, not
backdrop blur. Disabled UI uses solid low-contrast fills, not opacity.

**Imagery.** Not a photography-led brand. The sole bitmap in the Figma is a
dark avatar portrait (owner chip on the cover) — product imagery is
effectively absent.

**Layout rules.** Documentation pages are 1920–2400 wide with 152px
horizontal gutters; a fixed 64–100px top app bar with logo + title sits on
`#FFFFFF` with a hairline bottom border. The app shell uses a left sidebar
(nav) + main content pattern.

---

## ICONOGRAPHY

- **System in Figma:** a mix of Material Symbols / Material Icons
  (`keyboard_arrow_down`, `more_vert`, `check_box_outline_blank`,
  `radio_button_unchecked`, `stars_filled`, `InfoOutlined`,
  `CheckCircleOutlined`) and Heroicons (micro) pulled into a shared icon page.
- **Usage conventions:** 24×24 default bounding box; 20×20 for dense tables;
  16×16 inline with text. Stroke style matches Material's filled+outlined
  duality — filled for active/selected, outlined for idle.
- **Icons:** we load **Material Symbols** from the Google Fonts CDN (matches
  the Figma's icon family exactly). No bundled logo/wordmark assets — ask
  design for the wordmark SVG if you need one.
- **Emoji/unicode:** emoji are used as *placeholder* icons in one Figma
  specimen sheet (✓ ⚠ ℹ ✕ on status pills) — do **not** ship emoji in real UI.
  Unicode arrows (`→`) are used in list bullets inside the Design Principles
  document.
- **SVG vs PNG vs icon font:** SVGs for the logo/favicon; icon font
  (Material Symbols) for everything else. No PNG icons.

---

## CAVEATS

See the bottom of `SKILL.md` and the final assistant message for the
iteration-ready caveat list. Major ones:

1. **GitHub repo `RachelCho/invisible-scheduling` could not be read** — the
   app isn't installed on that account. This system was derived entirely from
   the Figma. If you grant access (install at
   https://github.com/apps/claude-design-import/installations/new) we can
   pull real component source.
2. **Fonts are now local.** Roboto, Roboto Condensed, and Roboto SemiCondensed
   are bundled in `fonts/` with the full weight axis (100–900) + italics.
   `@font-face` declarations in `colors_and_type.css` reference them directly.
   Roboto Mono is still pulled from Google Fonts — drop TTFs in `fonts/` if
   you want it local too.
3. **Only the primary ramp (Teal) is exact;** the rest of the ramps are
   approximated from the token names + the palette examples that were exact
   in the Figma. We flagged the teal + navy + mint values from the styleguide
   page precisely.
