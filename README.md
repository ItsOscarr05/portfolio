# Oscar Berrigan — Portfolio

A fast, single-page personal portfolio for Oscar Berrigan, a Computer Information
Systems student at James Madison University (expected May 2028). Built to give
recruiters a credible first impression in under 30 seconds.

**Live site:** _add your Vercel URL here after deploying_

## Tech stack

- HTML5, CSS3, vanilla JavaScript — no frameworks, no build step
- Deployed on [Vercel](https://vercel.com) (zero-config static hosting)
- Fonts: Sora + Inter (Google Fonts)

## Structure

```
portfolio/
├── index.html      # All content: hero, about, projects, skills, contact
├── styles.css      # Modern dark theme, responsive, single accent color
├── script.js       # Sticky nav, mobile menu, scroll-spy, reveal animations
├── vercel.json      # Static hosting config
└── assets/
    └── OscarBerrigan_Resume_2026.docx   # linked from the resume buttons
```

## Editing content

Everything lives in `index.html`:

- **Hero / About** — tagline, bio, and quick facts.
- **Projects** — three `<article class="card">` blocks (Alyne, QuadWear, AssignmentAI).
  Update the GitHub links (`href="..."`), tech-stack `<li>` tags, and descriptions.
- **Skills** — grouped `<ul class="tags tags--lg">` lists.
- **Contact** — email, LinkedIn, GitHub, and resume links.

### Things to finish (from the PRD open items)

- [ ] Consider exporting the resume to PDF (recruiters often prefer PDF over .docx);
      if you do, update the three `href="assets/..."` links in `index.html`
- [ ] Write the final one-sentence description for **AssignmentAI**
      (search for `TODO` in `index.html`)
- [ ] Point each project's GitHub/live-demo links at the correct repos/URLs
- [ ] (Optional) Add real project screenshots — currently gradient placeholders

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
