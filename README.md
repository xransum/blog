# Blog

## Compiling JS Files

From scratch, the project will not have any JS files provided under `assets/js/dist/`, so they will need to be compiled from the source files under `_javascript/`.

```bash
npm i && npm run build
```

## Build the Jekyll Dependencies

Once you've compiled the JS files, you can build the Jekyll dependencies.

```bash
bundle install
```

## Run the Jekyll Server

```bash
./tools/run
```

## Pushing Changes

### Committing Changes

```bash
git add .
git commit -m "Commit message"
git switch --create my-changes master
git push -u origin my-changes
```

### Creating a Pull Request

```bash
gh pr create --base master --head my-changes
gh pr status
gh pr merge 5 --merge --delete-branch
```