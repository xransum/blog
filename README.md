# Blog

## Setup

Run this once after cloning, or any time dependencies change. Requires `ruby`, `bundle`, `node`, and `npm` to be installed.

```bash
./scripts/setup
```

This installs Ruby gems via Bundler, installs Node packages via npm, and compiles the JS assets under `assets/js/dist/`.

## Run the Dev Server

```bash
./scripts/run
```

Starts Jekyll at `http://localhost:4000` with LiveReload and draft posts enabled. Checks that deps are installed and assets are built before starting — if anything is missing it will point you back to `./scripts/setup`.

This now runs with `JEKYLL_ENV=development` explicitly so local authoring mode is unambiguous.

## Run a Production-Parity Server

```bash
./scripts/run-prod
```

Starts Jekyll locally with `JEKYLL_ENV=production` and drafts disabled so rendered output matches the production environment much more closely.

## Test (HTML validation)

```bash
./scripts/test
```

Does a production Jekyll build and runs `htmlproofer` to validate links and HTML.

Use this when you want the closest match to the GitHub Pages build pipeline.

## Python Training Editors

Interactive PyScript editor snippets are stored in `_data/python_training_editors.yml` and rendered through `_includes/embed/python-training/python-editor.html`.

This keeps starter code out of raw inline `<script type="py-editor">` tags so production HTML processing does not accidentally rewrite editor whitespace.

## Build Assets Only

If you only need to rebuild JS assets (e.g. after pulling changes):

```bash
./scripts/build
```

## Pushing Changes

### Committing Changes

```bash
git add .
git commit -m "Commit message"
```

### Pushing Changes

```bash
git switch --create my-changes master
git push -u origin my-changes
```

### Creating a Pull Request

```bash
gh pr create --base master --head my-changes --fill
gh pr status
gh pr merge 6 --merge --delete-branch
```

### Deleting a Branch

```bash
git switch master
git branch -d my-changes
```
