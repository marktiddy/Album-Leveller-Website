# Album Leveler website

A static, one-page site: `index.html`, `styles.css`, `script.js` and `images/`. No build step.

## Preview locally

```bash
cd ~/Developer/Logic/AlbumLeveler_Website && python3 -m http.server 8765
```

Then open http://127.0.0.1:8765.

## Regenerate the screenshots

The images come straight from the plug-in's own drawing code. The test runner sets up the thirteen
songs of Rock and Roll Heart with Logic-style track names, analyses and calculates it, and then captures each tab at 2x:

```bash
cd ~/Developer/Logic/AlbumLeveler_Advanced && cmake --build build --config Release --target AlbumLevelerTests && build/AlbumLevelerTests_artefacts/Release/AlbumLevelerTests --screenshots ~/Developer/Logic/AlbumLeveler_Website/images
```

## Selling: connect Gumroad

At the top of `script.js`, set `STORE.url` to your Gumroad product link and `STORE.price` to
the same price you set on Gumroad:

```js
const STORE = {
  url: "https://marktiddy.gumroad.com/l/albumleveler",
  price: "£7",
};
```

Until `url` is set, the page shows "Coming soon" and the button is disabled.

In the Gumroad product's receipt settings, add a short note: "Quit Logic, run the installer,
reopen Logic. Updates: download again from this receipt or gumroad.com/library."

## version.json and the update section

The plug-in checks `https://albumleveler.marktiddy.co.uk/version.json` once a day. Its `url`
points at the **Already bought it?** section (`#update`), which tells owners how to re-download
from Gumroad, so the update button never sends them to the buy button.

To release an update:

1. Build, sign and notarise the new version, then replace the file on Gumroad.
2. Add a line at the top of **What's new** in `index.html`, and change the version in the
   "Get it" heading if it's a big release.
3. Change `version` in `version.json`, for example to `"1.1.0"`, and add a one-line `notes`.
4. Push. Installed copies show **Update 1.1.0** within a day.

## Deploying to GitHub Pages with albumleveler.marktiddy.co.uk

The folder is ready to deploy as it is. `CNAME` holds the custom domain, and `.nojekyll`
tells GitHub to serve the files unchanged.

1. Create a **public** repository (free accounts need public for Pages), for example
   `albumleveler-site`, and push this folder to its `main` branch. Keep the plug-in source
   code out of this repository.
2. In the repository, go to **Settings → Pages**, set **Source** to "Deploy from a branch",
   choose `main`, folder `/ (root)`, and save.
3. At your DNS provider for marktiddy.co.uk, add a **CNAME** record: name `albumleveler`,
   value `<your-github-username>.github.io`.
4. Back in **Settings → Pages**, check that the custom domain shows
   `albumleveler.marktiddy.co.uk`. Wait for the DNS check to pass, then tick
   **Enforce HTTPS**. The certificate can take up to an hour or so to appear.
5. Open https://albumleveler.marktiddy.co.uk/version.json and check that it loads.
6. Build the release plug-in with that address:

   ```bash
   cmake -B build -S . -DJUCE_DIR="$HOME/Developer/JUCE" -DCMAKE_BUILD_TYPE=Release -DALBUMLEVELER_UPDATE_URL="https://albumleveler.marktiddy.co.uk/version.json"
   ```

   Never change this address after the first sale. If the site ever moves, keep this
   subdomain and redirect it.

## Before publishing

- Set `STORE.url` and `STORE.price` in `script.js` (see above).
- Make sure `version.json` matches the version you're selling.
