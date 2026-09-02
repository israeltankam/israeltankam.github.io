# Cropmix documentation site

Static documentation for `https://israeltankam.github.io/cropmix/`.

## Deploy in a personal GitHub Pages repository

Copy this entire `cropmix/` directory into the root of the repository that publishes `israeltankam.github.io`. Commit and push. Because every asset/link is relative, the site is designed to be served from the `/cropmix/` subpath.

The `.nojekyll` file prevents GitHub Pages from applying Jekyll processing.

## Main entry points

- `index.html` — documentation landing page
- `getting-started.html` — installation and quickstart
- `user-guide.html` — user-guide index
- `api.html` — exhaustive API reference
- `examples/` — runnable examples

## Local preview

From the directory containing `cropmix/`:

```bash
python -m http.server 8000
```

Open `http://localhost:8000/cropmix/`.
