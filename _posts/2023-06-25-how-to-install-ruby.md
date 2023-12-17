---
title: How to Install Ruby
author: xransum
date: 2023-06-25 04:10:29 -0500
categories:
  - Development
tags:
  - installation
  - linux
  - macos
  - ruby
  - windows
image:
  path: /commons/nasa-06.jpg
  lqip: null
  alt: null
---

## Introduction

You might believe this post is unnecessary, but I have seen many people struggle with installing Ruby as of late. So, I decided to write this post to help those people and my future self.

Depending on a handful of factors independent to your operating system in question, installing Ruby can be a breeze or a nightmare. I will try to cover the most common scenarios, the issues you might encounter, and how to solve them.

## Installing Ruby

### Linux

#### Step 1: Install prerequisites

*Fedora*:

```
sudo dnf install ruby ruby-devel openssl-devel redhat-rpm-config @development-tools
```

*RHEL8/CentOS 8*:

```
sudo dnf install ruby ruby-devel
sudo dnf group install "Development Tools"
```

*Debian*:

```
sudo apt-get install ruby-full build-essential
```

*Gentoo*:

```
sudo emerge dev-lang/ruby
```

*Arch Linux*:

```
sudo pacman -S ruby base-devel
```

*OpenSUSE*:

```
sudo zypper install -t pattern devel_ruby devel_C_C++
sudo zypper install ruby-devel
```

*Clear Linux*:

```
sudo swupd bundle-add ruby-basic
```

> Note: 
> Avoid installing RubyGems packages (called gems) as the root user. Instead, set up a gem installation directory for your user account.

#### Step 2: Add environment variables to your `~/.bashrc` file (Optional)

The following commands will add environment variables to your `~/.bashrc` file to configure the gem installation path.

```bash
echo '''# Install Ruby Gems to ~/gems
export GEM_HOME="$HOME/gems"
export PATH="$HOME/gems/bin:$PATH"
''' >> ~/.bashrc
```

Reload your shell configuration:

```bash
source ~/.bashrc
```

Quit and relaunch your terminal to continue.

### macOS

#### Step 1: Install Homebrew

[Homebrew](https://brew.sh/) makes it easy to install development tools on a Mac.

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

#### Step 2: Install chruby and the Latest Ruby with ruby-install

1. Install `chruby` and `ruby-install` with Homebrew:
```
brew install chruby ruby-install xz
```

2. Install the latest stable version of Ruby:
```
ruby-install ruby 3.1.3
```

3. This will take a few minutes, and once it’s done, configure your shell to automatically use `chruby`:
```
echo "source $(brew --prefix)/opt/chruby/share/chruby/chruby.sh" >> ~/.zshrc
echo "source $(brew --prefix)/opt/chruby/share/chruby/auto.sh" >> ~/.zshrc
echo "chruby ruby-3.1.3" >> ~/.zshrc # run 'chruby' to see actual version
```

> Note:
> If you’re using Bash, replace `.zshrc` with `.bash_profile`. If you’re not sure, read this external guide to [find out which shell you’re using](https://www.moncefbelyamani.com/which-shell-am-i-using-how-can-i-switch/).

4. Quit and relaunch Terminal, then check that everything is working:

```
ruby -v
```

### Windows

1. Download and install a **Ruby+Devkit** version from [RubyInstaller Downloads](https://rubyinstaller.org/downloads/). Use default options for installation.
2. Run the `ridk install` step on the last stage of the installation wizard. This is needed for installing gems with native extensions. You can find additional information regarding this in the [RubyInstaller Documentation](https://github.com/oneclick/rubyinstaller2#using-the-installer-on-a-target-system). From the options choose `MSYS2 and MINGW development tool chain`.
3. Open a new command prompt window from the start menu, so that changes to the PATH environment variable becomes effective.
4. Check that everything is working.


## Troubleshooting Issues

### Ruby Gems Timeout Due to Source Protocol

After installing Ruby, you might encounter an issue where Ruby Gems continually keeps timing out.

```
Fetching source index from https://rubygems.org/

Retrying fetcher due to error (2/4): Bundler::HTTPError Could not fetch specs from https://rubygems.org/ due to underlying error <Net::OpenTimeout: execution expired (https://rubygems.org/specs.4.8.gz)>
Retrying fetcher due to error (3/4): Bundler::HTTPError Could not fetch specs from https://rubygems.org/ due to underlying error <Net::OpenTimeout: execution expired (https://rubygems.org/specs.4.8.gz)>
```

This could be caused by a handful of factors, but the most common issue is that you might be trying to fetch the gems from `https://rubygems.org/` instead of `https://rubygems.org/`, or vice versa.

To fix this issue, you need to add/edit the `source` line to your `Gemfile` and specify the protocol.

```ruby
source 'https://rubygems.org/'
```

Try both protocols `http` and `https` to see if your issue is resolved, but it is recommended to use `https://rubygems.org/` if you can.

If you still have issues, then you might be experiencing the issue [Ruby Gems Timeout Due to IPv6](#ruby-gems-timeout-due-to-ipv6).


### Ruby Gems Timeout Due to IPv6

Similarly to the issue [Ruby Gems Timeout Due to Source Protocol](#ruby-gems-timeout-due-to-source-protocol), you might encounter an issue where Ruby Gems continually keeps timing out, however, this solution is primarily for Linux users.

```
Fetching source index from https://rubygems.org/

Retrying fetcher due to error (2/4): Bundler::HTTPError Could not fetch specs from https://rubygems.org/ due to underlying error <Net::OpenTimeout: execution expired (https://rubygems.org/specs.4.8.gz)>
Retrying fetcher due to error (3/4): Bundler::HTTPError Could not fetch specs from https://rubygems.org/ due to underlying error <Net::OpenTimeout: execution expired (https://rubygems.org/specs.4.8.gz)>
```

The issue is that your system might be attempting to use IPv6 instead of IPv4, though this can be verified by running a `curl` command specifying either `--ipv4` or `--ipv6` to see if you get a response is from `https://rubygems.org/`.

To check if you are using IPv4, you can use:
```bash
$ curl -L https://rubygems.org/ --max-time 5 --ipv4 -o /dev/null
```

To check if you are using IPv6, you can use:
```bash
$ curl -L https://rubygems.org/ --max-time 5 --ipv6 -o /dev/null
```

If you get an output like the following, then the issue is that your system is prioritizing IPv6 over IPv4.

```bash
$ curl -L https://rubygems.org/ --ipv6 --max-time 5 -o /dev/null
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:--  0:00:04 --:--:--     0
curl: (28) Failed to connect to rubygems.org port 443 after 4701 ms: Connection timed out
```

If this is the case, then go take a quick peak over at my other post on how to prioritize IPv4 over IPv6 on Linux. You can find it [here](/how-to-prioritize-ipv4-over-ipv6-on-linux).

## Conclusion

I hope this post helped you install Ruby. Happy coding!