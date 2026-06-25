# Jelajah Malaysia — Tourism Website

A modern, responsive, multi-page tourism website for exploring Malaysia.
Built as a **static site with plain HTML & CSS** (vanilla JavaScript only for menu, form
validation, gallery filtering and the FAQ accordion). No frameworks, no build step.

> Delivered for invoice **INV-2026-001**. Client: Nisa.

## Pages (11)

| Page | File |
|------|------|
| Home | `index.html` |
| About | `about.html` |
| Destinations (hub) | `destinations.html` |
| Destination — Langkawi | `destination-langkawi.html` |
| Destination — Borneo | `destination-borneo.html` |
| Packages | `packages.html` |
| Gallery | `gallery.html` |
| Blog | `blog.html` |
| Contact (with validated form) | `contact.html` |
| FAQ | `faq.html` |
| Testimonials | `testimonials.html` |

## Structure

```
.
├── index.html, about.html, …      # 11 pages
├── css/styles.css                 # full design system (one stylesheet)
├── js/main.js                     # nav, form validation, gallery filter, FAQ, reveal
├── images/                        # all photos & avatars (local assets)
├── favicon.svg
└── README.md
```

## Run locally

It's a static site — just open `index.html` in a browser. For correct relative paths,
serving over HTTP is recommended:

```bash
# any one of these, from this folder:
python3 -m http.server 8080      # then visit http://localhost:8080
npx serve .
```

## Contact form

`contact.html` uses **client-side validation** (required fields, email & phone format,
message length) handled in `js/main.js`. On success it shows a confirmation message.

To make the form actually deliver email without a backend, point it at a free form
service — e.g. [Web3Forms](https://web3forms.com) or [Formspree](https://formspree.io):

```html
<!-- in contact.html, change the form tag to: -->
<form id="contact-form" class="form" novalidate
      action="https://api.web3forms.com/submit" method="POST">
  <input type="hidden" name="access_key" value="YOUR-KEY-HERE">
  ...
```

The existing validation runs first; once valid you can let it POST.

## Editing content

- **Text:** edit the relevant `.html` file directly.
- **Colours / fonts / spacing:** all design tokens live at the top of `css/styles.css`
  under `:root` (e.g. `--ocean`, `--sunset`). Change once, applies everywhere.
- **Images:** drop replacements into `images/` and keep the same filenames, or update the
  `src` / `background-image` paths.

## Hosting

Deployed on Vercel (free tier). To redeploy after changes:

```bash
vercel --prod
```

Any static host works too (Netlify, GitHub Pages, cPanel) — just upload the whole folder.

---
© Jelajah Malaysia. Source handed over in full per invoice INV-2026-001.
