---
title: Install Custom Node Version
author: xransum
date: 2023-06-17 02:38:24 -0500
categories:
  - Development
  - Version Management
tags:
  - installation
  - linux
  - nodejs
image:
  path: /commons/beard-05.jpg
  lqip: null
  alt: null
---

If you've run into issues trying to install Node.js or npm on your server, you may want to consider installing a custom Node version. This post will walk you through the steps of installing a custom Node version on your server or any other Linux-based machine.

Ain't got time to read all this info? No matter, there's a [tldr;](#tldr) section.

## Installation

The best method for installing a custom Node version is to use [nvm](https://github.com/nvm-sh/nvm#install-script) (Node Version Manager). This will allow you to install multiple Node versions and switch between them easily.

You can install nvm by running the following command:

```bash
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

### Listing Versions

You can see which versions of Node.js or ones you have installed already, by using any of the below following command(s).

List all available versions:
```bash
$ nvm list-remote
```

List all currently installed versions:
```bash
$ nvm list
```

List all currently installed versions and their paths:
```bash
$ nvm list -p
```

### Install Node

Once you've determined what version of Node you want to install, you can use any of the below following command(s).

Install latest version:
```bash
$ nvm install node
```

Install latest LTS version:
```bash
$ nvm install --lts
```

Install a specific version:
```bash
$ nvm install 14.17.0
```

Install a specific version from a specific release name:
```bash
$ nvm install lts/fermium
```

### Switch Node Versions

At times you may need to switch between Node versions. You can do this by using any of the below following command(s).

Switch to latest version:
```bash
$ nvm use node
```

Switch to latest LTS version:
```bash
$ nvm use --lts
```

Switch to a specific version:
```bash
$ nvm use 14.17.0
```

Switch to a specific version from a specific release name:
```bash
$ nvm use lts/fermium
```

### Uninstall Node

When you no longer need a specific version of Node, you can uninstall it by using any of the below following command(s).

Uninstall latest version:
```bash
$ nvm uninstall node
```

Uninstall latest LTS version:
```bash
$ nvm uninstall --lts
```

Uninstall a specific version:
```bash
$ nvm uninstall 14.17.0
```

Uninstall a specific version from a specific release name:
```bash
$ nvm uninstall lts/fermium
```


## TLDR

Install NVM (Node Version Manager):
```bash
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash # Install nvm
```

Install example version (Node.js 14.17.0):
```bash
$ nvm install 14.17.0        # Install example version
$ nvm use 14.17.0            # Switch to example version  
$ nvm alias default 14.17.0  # Optional, set as default 
$ nvm uninstall 14.17.0      # Uninstall
```


## Conclusion

That's it! You should now have a custom Node version installed on your server or any other Linux-based machine.

**Happy coding!**
