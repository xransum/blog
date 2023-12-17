---
title: Install Ruby Using Ruby Version Manager (RVM)
author: xransum
date: 2023-12-15 00:08:00 -0500
categories:
  - Development
  - Version Management
tags:
  - environments
  - programming
  - ruby
image:
  path: /commons/moon.png
  lqip: null
  alt: null
---

## Installation

Install GPG Keys:
```bash
gpg2 --keyserver keyserver.ubuntu.com --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
```

Install RVM:
```bash
curl -sSL https://get.rvm.io | bash -s stable
```

Use the following to your shell config so RVM is usable:
```bash
echo '[ -f "$HOME/.rvm/scripts" ] && . "$HOME/.rvm/scripts/rvm"' >> ~/.bashrc
```

List all available versions:
```bash
rvm list known
```

Install a specified version:
```bash
rvm install ruby 3.3.0
```

List installed versions:
```bash
rvm list
```

Set the default Ruby:
```bash
rvm --default use ruby-3.3.0
```

Revert to using the system default:
```bash
rvm use system
```

or:
```bash
rvm reset
```

## Troubleshooting

### Error running \_\_rvm_make

Try to update your rvm with head and try again, hopefully it should fix this:
```bash
rvm get head
```

### Cannot load such file -- openssl

```bash
rvm pkg install openssl
```

Reinstall your version with the new openssls:
```bash
rvm reinstall ruby-3.3.0 --with-openssl-dir="$rvm_path/usr"
```

or reinstall all versions:
```bash
rvm reinstall all --force
```
