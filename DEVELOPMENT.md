# Development


```bash
gem install bundler
bundle config set --local path 'vendor/bundle'
bundle config set --local retry 3
bundle config set --local jobs 4
bundle install --gemfile Gemfile --retry 3 --jobs 4
npm install
sh scripts/build
```

## Setup Steps

Install Bundler:
```bash
gem install bundler
```

Configure Bundler variables:
```bash
bundle config set --local path 'vendor/bundle'
bundle config set --local retry 3
bundle config set --local jobs 4
```

Install Ruby dependencies:
```bash
bundle install --gemfile Gemfile
```

Install Node dependencies:
```bash
npm install
```

Build the project using the custom build script:
```bash
sh scripts/build
```

> **Note:**
> This script will copy over select packages installed by NPM. This is necessary because the `package.json` file is not used to install packages, but rather to specify which dependencies are required for the project.

You can use the `bootstrap` script that will automate the above steps:
```bash
sh scripts/bootstrap
```

> **Note:**
> However, using the `bootstrap` script has it's flaws, as it will do all the necessary steps except when it comes to running the `npm run <script>` commands it has issues with resolving the dependencies required in the scripts in `package.json`.

## Commands and Scripts

To build the Jekyll site:
```bash
npm run build
```

Run the server:
```bash
npm run serve
```

Run a the development server:
```bash
npm run dev
```
