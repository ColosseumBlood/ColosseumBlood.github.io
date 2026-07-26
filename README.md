# Colosseum Blood website

Official download landing page for
[Colosseum Blood](https://github.com/romajs/ColosseumBlood).

The site is a static Vite application deployed to GitHub Pages. It queries the
public GitHub Releases API at runtime, displays the latest published version,
and connects each platform button to the matching release asset.

## Local development

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
npm run preview
```

## Release integration

The game release workflow publishes stable filenames:

- `ColosseumBlood-macOS-universal.zip`
- `ColosseumBlood-Windows-x86_64.zip`
- `ColosseumBlood-Linux-x86_64.tar.gz`
- `SHA256SUMS.txt`

Because those names remain stable, publishing a new latest GitHub Release
updates the download buttons without requiring another website deployment.

## Deployment

Pushes to `main` build the Vite site and deploy `dist/` through the official
GitHub Pages Actions. The production URL is:

<https://romajs.github.io/ColosseumBlood-site/>

No analytics or tracking scripts are included.
