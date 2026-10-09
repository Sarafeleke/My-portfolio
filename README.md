# Sara Feleke — Personal Portfolio

A single-page personal portfolio built with **HTML5, CSS3, and vanilla JavaScript** — no frameworks required.

## Run locally

Open `index.html` directly in your browser, or serve the folder locally:

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

Then visit `http://localhost:8000`.

## Replace the profile photo

Replace `assets/images/sara-profile.jpg` with your own photo using the **same filename**.
The hero and About sections will pick it up automatically. For best results, use a
portrait-oriented image (roughly 4:5) with your face near the top of the frame.

## Replace project screenshots

The project thumbnails in `assets/images/` are **placeholder SVGs** — replace them with
real screenshots. Either keep the same filenames or update the `src` paths in `index.html`:

- `amanawit-design.svg` — Amanawit Design
- `yeab-pharmaceuticals.svg` — Yeab Pharmaceuticals
- `movie-choice.svg` — Movie Choice
- `equb-management.svg` — Round Saving (Equb)
- `hello-coffee.svg` — Hello Coffee

Recommended size: ~1200×900px (4:3 ratio). `.jpg`, `.png`, or `.webp` all work —
just update the file extension in the HTML if it changes.

## Edit projects

Each project is an `<article class="project-card">` in the Projects section of `index.html`.
To update one:

- **Title / description** — edit the `<h3>` and `<p>` text.
- **Categories** — edit `data-category` (space-separated: `web`, `fullstack`, `graphic`).
- **Tech tags** — edit the `<span>` items inside `.tag-list`.
- **Links** — add/remove `<a>` items inside `.project-links`. Only show buttons for real links.

## Update contact links

Contact details live in two places in `index.html`:

- The contact items in the `#contact` section (`mailto:`, `tel:`, LinkedIn, GitHub).
- The footer `.footer-socials` links.

## Connect a real contact form

The form currently validates input on the front end and clearly states that no message
is sent. To make it functional later, point the form's `action` to a service such as
Formspree or Netlify Forms, or post the data to your own backend in `js/script.js`.
Remove the `.form-note` notice once messages are actually delivered.

## Deploy

This is a fully static site — deploy it anywhere:

- **GitHub Pages**: push the `sara-portfolio` folder to a repo and enable Pages.
- **Netlify / Vercel / Cloudflare Pages**: drag-and-drop the folder or connect the repo.

## Image status

- `sara-profile.jpg` — real photo (copied from the workspace).
- All five project images — labeled placeholders, replace with real screenshots.
