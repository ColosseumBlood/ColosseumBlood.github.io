# Colosseum Blood website

Official download landing page for
[Colosseum Blood](https://colosseumblood.github.io/).

The site is a static Vite application deployed to GitHub Pages. It queries the
public rolling release tagged `colosseum-blood-latest` in
[`romajs/game-downloads`](https://github.com/romajs/game-downloads), displays
the mirrored version, and connects each platform button to the matching release
asset.

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

The private source repository keeps the complete versioned release history.
After each successful private release, its workflow replaces the assets in the
public `colosseum-blood-latest` release. Because the tag and asset names remain
stable, the download buttons update without requiring another website
deployment.

## Deployment

Pushes to `main` build the Vite site and deploy `dist/` through the official
GitHub Pages Actions. The production URL is:

<https://colosseumblood.github.io/>

No analytics or tracking scripts are included.
