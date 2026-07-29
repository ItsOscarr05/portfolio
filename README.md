# Oscar Berrigan — Portfolio

A fast, single-page personal portfolio for Oscar Berrigan, a Computer Information
Systems student at James Madison University (expected May 2028). Positioned
**SWE-primary**, with data & BI kept as a clear secondary, evidence-backed strength.
Built to give recruiters a credible first impression in under 30 seconds.

**Live site:** [oscarberrigan.com](https://oscarberrigan.com)

## Tech stack

- HTML5, CSS3, vanilla JavaScript — no frameworks, no build step
- Deployed on [Vercel](https://vercel.com) (zero-config static hosting)
- Fonts: Sora + Inter (Google Fonts)

## Structure

```
portfolio/
├── index.html      # All content: hero, about, projects, skills, certificates, contact
├── styles.css      # Modern dark theme, responsive, single accent color
├── script.js       # Sticky nav, mobile menu, scroll-spy, reveal, lightbox, report modal
├── vercel.json     # Static hosting config
└── assets/
    ├── OscarBerrigan_Resume_2026.pdf    # linked from the resume buttons
    ├── OscarBerrigan_Resume_2026.docx   # editable resume source
    ├── MavenMarket_report_view.pdf      # dashboard PDF in the report modal
    ├── MavenMarket_model_view.pdf       # star-schema PDF (Data model tab)
    ├── About_me_pfp.png                 # hero headshot
    ├── Maven_market_banner.png / alyne_banner.png / QuadWear_banner.png
    └── PBI_ / SQL_ / Excel_ / Python_ / HTML_CSS_ cert + cover images
```

## Editing content

Everything lives in `index.html`:

- **Hero / About** — SWE-first tagline and bio; BI framed as depth/differentiator,
  not a co-equal identity. About includes coursework (information systems + two
  business analytics courses). GPA is intentionally omitted since the site is
  reached via the resume, which already lists it.
- **Projects** — grouped into **Software Engineering** first (Alyne, QuadWear), then
  **Data & BI Work** (Maven Market) as a supporting section with a "Supporting
  strength" eyebrow.
  - **Alyne** and **QuadWear** read as SWE builds (marketplace / e-commerce), not
    BI justifications.
  - **Maven Market** is quantified: 7-table star schema (2 fact + 5 dimension),
    ~20 DAX measures, $1.76M revenue, 60k+ transactions, 59% margin, ~1% return rate.
    Includes a "View full report" modal (`MavenMarket_report_view.pdf` +
    `MavenMarket_model_view.pdf`).
  - **AssignmentAI** is present but hidden (`style="display:none"`) until it's ready
    to relaunch — it sits inside the SWE group so it surfaces with the primary work.
  - Update GitHub links (`href="..."`), tech-stack `<li>` tags, and descriptions per card.
- **Skills** — Languages and Software & Tools first; **Data & BI** last as supporting range.
- **Certificates** — five course/credential cards (Power BI, MySQL, Excel, Python,
  Responsive Web Design), each opening its full image in a lightbox.
- **Contact** — seeking SWE internships; email, LinkedIn, GitHub, and resume links.

### Recently completed

- [x] Repositioned site SWE-primary (hero, About, projects order, skills, contact)
- [x] Kept Maven Market as a dedicated Data & BI Work section (supporting strength)
- [x] Rewrote Alyne & QuadWear as SWE project copy (removed BI-angle closers)
- [x] Quantified the Maven Market blurb with real model + performance numbers
- [x] Added the Maven star-schema model into the "View full report" modal

### Things to finish

- [ ] Relaunch **AssignmentAI**: finish its description and remove the
      `style="display:none"` on its card (search for `AssignmentAI` in `index.html`)
- [ ] Optionally deepen the Maven case study so the report shows actual DAX/SQL,
      not just screenshots (existing Maven content already tells a credible BI story)
- [ ] Align resume / LinkedIn headline with SWE-primary positioning (out of scope
      for the site reframe — update `.docx` and re-export
      `OscarBerrigan_Resume_2026.pdf` when ready)

## Run locally

No build step. Open `index.html` directly, or serve it:

```bash
# Python
python -m http.server 5173

# or Node
npx serve .
```

Then visit http://localhost:5173.

## Deploy to Vercel

1. Push this repo to GitHub (repo name: `portfolio`).
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Framework preset: **Other** — no build command, output directory is the root.
4. Deploy. You'll get a `*.vercel.app` URL.

After deploying, add the URL to your GitHub bio, LinkedIn, and resume header.

---

Designed & built by Oscar Berrigan.
