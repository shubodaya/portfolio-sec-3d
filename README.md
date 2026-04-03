# portfolio-sec-3d

Static Vite portfolio deployed with GitHub Pages.

## Commands

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`

## GitHub Pages

- The Vite base path is set to `/portfolio-sec-3d/`.
- `npm run build` also creates `dist/404.html` and `.nojekyll` for GitHub Pages SPA routing.
- The repository includes `.github/workflows/deploy.yml` for GitHub Actions Pages deployment.

## Admin Console

- Local admin route: `/admin`
- Drafts are saved to browser local storage.
- The Publish screen can commit `src/content/site-content.json` back to GitHub using a fine-grained personal access token with repository contents write access.
