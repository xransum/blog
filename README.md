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

