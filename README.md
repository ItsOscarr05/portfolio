# Oscar Berrigan — Portfolio

A fast, single-page personal portfolio for Oscar Berrigan, a Computer Information
Systems student at James Madison University (expected May 2028). Built to give
recruiters a credible first impression in under 30 seconds.

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
    ├── MavenMarket_Report.pdf           # opens in the "View full report" modal
    ├── profile.png                      # hero headshot
    ├── *-banner.png                     # project card banners (maven, alyne, quadwear)
    └── certificate-*.png / cert-banner-*.png  # certificate images + thumbnails
```

## Editing content

Everything lives in `index.html`:

- **Hero / About** — tagline, bio, and quick facts. About now includes a coursework line
  (two business analytics courses + an information systems course). GPA is intentionally
  omitted since the site is reached via the resume, which already lists it.
- **Projects** — grouped into **Data Analytics & BI** (Maven Market) and **Software
  Engineering** (Alyne, QuadWear).
  - **Maven Market** is quantified: 7-table star schema (2 fact + 5 dimension),
    ~20 DAX measures, $1.76M revenue, 60k+ transactions, 59% margin, ~1% return rate.
    Includes a "View full report" modal (`MavenMarket_Report.pdf`).
  - **Alyne** and **QuadWear** each carry a BI/data angle so they support the
    BI-first positioning rather than reading as a separate SWE portfolio.
  - **AssignmentAI** is present but hidden (`style="display:none"`) until it's ready
    to relaunch.
  - Update GitHub links (`href="..."`), tech-stack `<li>` tags, and descriptions per card.
- **Skills** — grouped `<ul class="tags tags--lg">` lists (BI & Analytics, Languages,
  Software & Tools).
- **Certificates** — five course/credential cards (Power BI, MySQL, Excel, Python,
  Responsive Web Design), each opening its full image in a lightbox.
- **Contact** — email, LinkedIn, GitHub, and resume links.

### Recently completed

- [x] Quantified the Maven Market blurb with real model + performance numbers
- [x] Reframed Alyne & QuadWear with a BI/data angle
- [x] Trimmed the Skills list (removed `Cursor`)
- [x] Added a coursework line to About (GPA intentionally omitted)

### Things to finish

- [ ] Add a second real-data, quantified BI project as the new flagship
      (biggest remaining gap: proof of independent, real-data BI work)
- [ ] Deepen the Maven case study so the report shows actual DAX/SQL, not just screenshots
- [ ] (Optional) Add the Power BI model-view screenshot to the Maven card as visual proof
- [ ] Relaunch **AssignmentAI**: finish its description and remove the
      `style="display:none"` on its card (search for `AssignmentAI` in `index.html`)
- [ ] When updating the resume, edit the `.docx` and re-export to
      `OscarBerrigan_Resume_2026.pdf` (the resume buttons link to the PDF)

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
