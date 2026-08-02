# Shobitha A Rao — Portfolio

A single-page site: dark lab-at-night background, a slowly "migrating" gel-electrophoresis
animation behind the hero, and skill chips color-coded amber (wet lab) vs. cyan
(computational). No frameworks — plain HTML/CSS/JS, so GitHub Pages can serve it as-is.

## Publish it on GitHub Pages (2 minutes)

1. Create a new repository on GitHub — if you want it at `https://<username>.github.io`,
   name the repo exactly `<username>.github.io`. Otherwise any repo name works and it'll
   live at `https://<username>.github.io/<repo-name>`.
2. Upload these files to the repo root: `index.html`, `style.css`, `script.js`, and the
   `assets/` folder (contains your CV as a downloadable PDF).
3. In the repo, go to **Settings → Pages**, set **Source** to the `main` branch, root folder,
   and save.
4. Your site goes live in a minute or two at the URL GitHub shows you.

## Add your GitHub username

Open `script.js`, find `SITE_CONFIG` near the top, and fill in:

```js
const SITE_CONFIG = {
  githubUsername: "your-username",
};
```

The GitHub link in the Contact section fills itself in automatically.

## Add a new project later

Open `script.js` and add an object to the `PROJECTS` array — no HTML editing needed:

```js
{
  tag: "Category · Short label",
  title: "Project title",
  points: ["What you did.", "Another result."],
  tools: ["Tool A", "Tool B"],
  repoUrl: "https://github.com/your-username/repo-name", // or null if not on GitHub yet
}
```

New entries render as a new card automatically, in the order you add them.

## Files

- `index.html` — page structure and content
- `style.css` — all design tokens (colors, type, spacing) and layout
- `script.js` — renders skills/projects from data, hero animation, scroll reveals
- `assets/Shobitha_Rao_CV.pdf` — your résumé, linked from the "Download CV" button
