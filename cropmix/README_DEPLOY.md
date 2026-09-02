# Cropmix static documentation deployment

This folder is ready to be served at:

`https://israeltankam.github.io/cropmix/`

## Personal GitHub Pages repository

Copy the **entire `cropmix` folder** into the root of the repository that serves `israeltankam.github.io`:

```text
israeltankam.github.io/
  cropmix/
    index.html
    assets/
    examples/
    ...
```

All internal URLs are relative; no base-path setting is required.

Then commit and push:

```bash
git add cropmix
git commit -m "Add Cropmix documentation"
git push
```

The `.nojekyll` marker is included because the site is plain HTML/CSS/JS.

## Version scope

The content targets the Cropmix 0.2.0 project API and corrected scientific semantics. Before a future package release, update the version badge, API inventory and examples against the frozen source tree.

## Source audit

See `SOURCE_AUDIT.md`, `API_INVENTORY.md`, and `api-snapshot.json`.
