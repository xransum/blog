---
title: Install Python, Node, and Ruby Version Managers
author: xransum
date: 2023-12-16 15:01:13 -0500
categories:
  - Development
  - Version Management
tags:
  - environments
  - programming
  - python
  - ruby
  - nodejs
  - npm
pin: false
image:
  path: /commons/random-html-code-01.jpg
  lqip: null
  alt: null
---

# Python Version Manager (Pyenv)

## 1\. Install required system dependencies

Depending on your operating system, you'll need to install some dependencies:

- **Ubuntu/Debian**:
  ```shell
  sudo apt install -y make build-essential libssl-dev zlib1g-dev \
  libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev \
  libncursesw5-dev xz-utils tk-dev libffi-dev liblzma-dev python3-openssl git
  ```

- **CentOS/RHEL**:
  ```shell
  sudo yum install -y make gcc gcc-c++ openssl-devel zlib-devel \
  bzip2-devel readline-devel sqlite-devel wget curl llvm ncurses-devel \
  ncurses-libs xz-devel tk-devel libffi-devel xz git
  ```

## 2\. Install Pyenv

To manage your Python versions, install [pyenv](https://github.com/pyenv/pyenv) by running the following command:

```shell
curl https://pyenv.run | bash
```

## 3\. Configure User Settings

Add the following [pyenv](https://github.com/pyenv/pyenv) environment variables to your `~/.bashrc` file:

```
# Pyenv environment variables
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
export PATH="$PYENV_ROOT/shims:$PATH"

# Pyenv init
eval "$(pyenv init --path)"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
```

## 4\. Reload your Shell

To apply the changes, reload your terminal or run the following command:

- For Bash:
  ```bash
  source ~/.bashrc
  ```

- For Zsh:
  ```bash
  source ~/.zshrc
  ```

## 5\. Install Python

With Pyenv installed, you can now install different Python versions. To do so, use the following command:

```bash
pyenv install <version>
```

To install the latest version of Python 3, use:

```bash
pyenv install 3
```

This will install the `X.Y.Z` version of Python.

You can set a version as your default by running:

```bash
pyenv global X.Y.Z
```

And if you want to use a specific version at any point, you can run:

```bash
pyenv shell A.B.C
```

Plus, it's easy to manage multiple Python versions across different projects that require different versions by setting the versions for a specific project.

```bash
pyenv local A.B.C D.E.F
```



# Node Version Manager

## 1\. Install the Node Version Manager (nvm)

To install nvm, open your terminal and execute the following command:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# or

wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

You can use either `curl` or `bash`, depending on what's available on your system.

These commands will clone the nvm repository into a `~/.nvm` directory on your system.

## 2\. Update your shell profile configuration

The installation process from step 1 should automatically add the nvm configuration to your shell profile. If you're using zsh, that would be `~/.zshrc`. If you're using bash, that would be `~/.bash_profile` or a similar profile.

If the nvm configuration isn't automatically added, you can manually add it to your profile file:

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

This command loads nvm for use.

## 3\. Reload your shell configuration

After updating your profile configuration, you need to reload the configuration for your terminal to recognize it:

- Bash:
  ```bash
  source ~/.bashrc
  ```

- Zsh:
  ```bash
  source ~/.zshrc
  ```

After executing this command, nvm should be ready for use. You can confirm that nvm is installed correctly by running:

```bash
nvm -v
```

This should display the installed version of nvm.

## 4\. Installing Node.js

With nvm installed, you can now install, uninstall, and switch between different Node.js versions on your Windows, Linux, or Mac system.

To install Node.js, use the following command:

```bash
nvm install node
```

To install a specific version of Node.js, use:

```bash
nvm install vX.Y.Z
```

This will install the `X.Y.Z` version of Node.js.

You can set a version as your default by running:

```bash
nvm alias default vX.Y.Z
```

And if you want to use a specific version at any point, you can run:

```bash
nvm use vA.B.C
```

NVM simplifies the management of multiple Node.js versions across different projects that require different versions.


# Ruby Version Manager

## 1\. Install Ruby Version Manager (RVM)

To install RVM, open your terminal and execute the following command:

```bash
curl -sSL https://get.rvm.io | bash
```

## 2\. Load RVM into your shell sessions

Depending on your shell, add the following line to your shell profile:

- For Bash:
  ```bash
  echo "source ~/.rvm/scripts/rvm" >> ~/.bashrc
  ```

- For Zsh:
  ```bash
  echo "source ~/.rvm/scripts/rvm" >> ~/.zshrc
  ```

## 3\. Reload your shell configuration

After updating your profile configuration, you need to reload the configuration for your terminal to recognize it:

- For Bash:
  ```bash
  source ~/.bashrc
  ```

- For Zsh:
  ```bash
  source ~/.zshrc
  ```

## 4\. List available Ruby versions

To display a list of all known Ruby versions that RVM can install, run:

```bash
rvm list known
```

## 5\. Install a Ruby version

To install a specific version of Ruby (for example, `2.1.1`), use:

```bash
rvm install 2.1
```

## 6\. Use the newly installed Ruby

To switch to the newly installed Ruby version, use:

```bash
rvm use 2.1
```

You can confirm that the switch was successful by checking the Ruby version:

```bash
ruby -v
```

And the path to the Ruby executable:

```bash
which ruby
```

## 7\. Set a default Ruby version

Optionally, you can set a version of Ruby to use as the default for new shells. Note that this will override the 'system' Ruby:

```bash
rvm use 2.1 --default
```

RVM makes it easy to manage multiple Ruby versions across different projects that require different versions.
