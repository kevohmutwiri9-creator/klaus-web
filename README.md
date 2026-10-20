# Klaus Portfolio — HTML/CSS/JavaScript

A responsive one-page developer portfolio inspired by the section structure and dark, technical aesthetic of the reference portfolio. It is an original implementation, not a copy of the reference source.

## Files
- `index.html` — page structure and editable content
- `styles.css` — layout, colors, responsive design, and animations
- `script.js` — mobile menu, reveal animations, current year, and live public GitHub projects

## Run locally
Open `index.html` in a browser. For a local development server, open this folder in VS Code and use Live Server, or run `python -m http.server 8000` and visit `http://localhost:8000`.

## Personalize before publishing
1. In `index.html`, update your name and bio text as needed. The current copy introduces you as Kelvin Mutwiri, known as Klaus.
2. Update the email, WhatsApp number, and GitHub profile links in the contact section if they change.
3. The Projects section loads your public, non-fork repositories from the GitHub API. It requires an internet connection and may be affected by GitHub's unauthenticated API rate limit; private repositories are not displayed.
4. Update the skills and journey sections to reflect your experience.
5. Google Fonts are loaded remotely; if offline, the page falls back to system fonts.

## Deploy to Netlify
1. Sign in at https://app.netlify.com/
2. Open https://app.netlify.com/drop
3. Drag the entire `klaus-portfolio` folder into the drop area.
4. Open the generated `*.netlify.app` URL to test the live website.
5. To change the URL, use the site's settings in Netlify.
6. When you make later changes, upload the updated folder again from the site's Deploys page.

This is a static site: no build command, Node.js, database, or paid API is required.
