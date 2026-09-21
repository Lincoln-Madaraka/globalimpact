# Global Impact Alliance website

The website for **Global Impact Alliance (GIA)**, which connects wisdom with action. GIA's global headquarters are in New York and its African hub is in Kenya.

Built with Next.js 16 (App Router) and Tailwind CSS 4, and exported as a fully static site.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000, reloads automatically on changes
npm run build    # static site written to /out
npm start        # serve /out locally to check the production build
npm run lint
npm run images   # re-optimise photos from /photos (see Photos below)
npm run flags    # copy African flags from flag-icons into public/flags
```

## Previewing the real speed

`npm run dev` compiles each page the first time you open it, so the first visit to every page is slow. That is only the development server. To see how fast the real site is, build it and serve the result:

```bash
npm run build && npm start
```

The built site is plain static HTML, CSS and JavaScript, so pages open instantly.

## Pages

| Page | Path |
|---|---|
| Home | `/en/` |
| About GIA | `/en/about/` |
| What we do (8 areas of work) | `/en/what-we-do/` |
| Path of Wisdom | `/en/path-of-wisdom/` |
| Path of Action | `/en/path-of-action/` |
| Africa | `/en/africa/` |
| Impact & projects | `/en/impact/` |
| Partners & Join the Alliance | `/en/partners/` |
| Insights + articles | `/en/insights/`, `/en/insights/<slug>/` |
| Start a conversation (contact) | `/en/contact/` |

`/` forwards to `/en/`. On Netlify, `public/_redirects` does this with a proper 301. On other hosts, add a `/ → /en/` redirect in the host settings.

## Editing content

| What | Where |
|---|---|
| All page copy (one file per page) | `src/i18n/dictionaries/en/*.ts` |
| The eight areas of work | `src/i18n/dictionaries/en/areas.ts` |
| Projects (challenge → approach → partnership → action → impact) | `src/i18n/dictionaries/en/impact.ts` |
| Insight articles | `src/i18n/dictionaries/en/insights.ts` |
| Email, domain, offices, socials, form endpoint | `src/config/site.ts` |
| Founder, team, advisors | `src/config/people.ts` |

Page titles and meta descriptions sit next to each page's copy (`metaTitle`, `metaDescription`).

## Photos

1. Put the original photos in `/photos`.
2. Map each file to a name in `scripts/optimize-images.mjs`. Name photos by what they show, e.g. `"my-photo.jpg": "boardroom"`.
3. Run `npm run images`. This writes optimised WebP files to `public/images/` and 440×630 crops for the social preview images to `src/assets/og/`.

The flags on the Africa page come from `flag-icons`. After changing the countries in `src/config/africa-countries.ts`, run `npm run flags` to copy the matching flags into `public/flags/`.

## Image credits and sources

- **Spinning Earth textures:** NASA Earth Observatory, Blue Marble Next Generation. Public domain; NASA asks for credit.
- **Earth photo:** *The Blue Marble*, NASA / Apollo 17. Public domain.
- **Photos and portraits:** from GIA's current website and the Wisdom Age Foundation. Rights for reuse still need to be confirmed.
- **Flags:** [flag-icons](https://github.com/lipis/flag-icons), MIT licence.
- **Africa map geography:** [Natural Earth](https://www.naturalearthdata.com/) (public domain), via the [world-atlas](https://github.com/topojson/world-atlas) package.

## SEO

Every page has:

- its own title, description and canonical URL
- Open Graph and Twitter tags
- a 1200×630 link-preview image, generated at build time by `src/lib/og.tsx` (served from `/og/`)

The site also has:

- schema.org JSON-LD: Organization (with the New York and Kenya offices), WebSite, page types, BreadcrumbList and Article
- `sitemap.xml`, `robots.txt` and a web manifest

## Before launch

- [ ] Fill in the office street addresses, phone numbers and the Kenya city in `src/config/site.ts`.
- [ ] Confirm the founder, team and advisor names and bios in `src/config/people.ts`.
- [ ] Confirm the partner and supporter names on the Partners page (`src/i18n/dictionaries/en/partners.ts`).
- [ ] Confirm the project details in `impact.ts` with the Wisdom Age Foundation.
- [ ] Check that GIA has the rights to use every photo in `/photos`. Several look like stock or social-media images.
- [ ] Optional: set `formEndpoint` in `site.ts` (e.g. Formspree) so the contact form sends messages directly. Until then, it opens the visitor's email app.

## Adding a language

Routes already include the language (`/en/…`). To add one:

1. Add the code to `src/i18n/config.ts`.
2. Create `src/i18n/dictionaries/<code>/` with the same shape as `en`.
3. Register it in `src/i18n/index.ts`.
