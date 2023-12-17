---
title: Install Custom Python Version
author: xransum
date: 2023-05-19 02:19:01 -0500
categories:
  - Development
  - Version Management
tags:
  - environments
  - programming
  - python
image:
  path: /commons/beard-02.jpg
  lqip: null
  alt: null
---

Similarly to [Node.js](https://nodejs.org/en/), Python is a popular programming language that is used for a variety of applications. It is known for its simplicity, versatility, and ease of use. Python is also a great language for beginners to learn, as it is easy to read and understand.
Python is available on most, if not all, Shared, VPS, and Dedicated Servers. However, some of these servers may be installed as the root user, which can cause issues when installing Python packages. To avoid these issues, you can install Python locally under your Shell user.

So this post will walk you through the steps of installing a custom Python version on your server or any other Linux-based machine.

Don't want to read through the whole post? You can jump to the [TLDR](#tldr) section.

## Installation

The first step is to determine what version of Python you want to install. Personally, I'd recommend the most stable version of Python 3 (3.8.10 at the time of writing this post). You can check the latest version of Python on the [Python website](https://www.python.org/downloads/).

Change to your home directory:
```bash
$ cd ~
```

Create a temporary directory:
```bash
$ mkdir tmp
```

Change to the temporary directory:
```bash
$ cd tmp/
```

<div class="alert alert-primary">
    <strong>Note</strong>:
    To make it easier to not have to go through the list of versions trying to find the downloadable files for the version you want, you can use the following commands to list and download the tarball for the version of your choosing.
</div>

List all available versions of Python:
```bash
$ curl -sKL "https://www.python.org/ftp/python/" | sed -n 's!.*href="\([0-9]\+\.[0-9]\+\.[0-9]\+\)/".*!\1!p' | sort -V | while read -r version; do echo "- $version"; done
```

<div class="alert alert-warning">
    <strong>Warning</strong>:
    From this point on, I'll be using
    <strong>Python 3.8.10</strong>
    as an example. However, you can replace this with the version that you have selected/chosen.
</div>

Once you've determined a version, use the following command to download the tarball:
```bash
$ wget "https://www.python.org/ftp/python/3.8.10/Python-3.8.10.tgz"
```

Extract the Python source code:
```bash
$ tar -zxvf Python-3.8.10.tgz 
```

Remove the Python source code archive:
```bash
$ cd Python-3.8.10/
```

```bash
$ ./configure --prefix=$HOME/opt/python-3.8.10
```

```bash
$ make
```

```bash
$ make install
```

Add the following to your `~/.bashrc` file:
```bash
export PATH="$HOME/opt/python-3.8.10/bin:$PATH"
```

Load the changes to your `~/.bashrc` file:
```bash
$ source ~/.bashrc
```

Check which Python version is being used:
```bash
$ which python3
```

Check the Python version:
```bash
$ python3 --version
```

Optionally, you can remove the temporary directory:
```bash
$ cd ~
$ rm -rf tmp/
```

For those who would like to use a virtual environment, take a look at [Setting Up Python Virtual Environment]({{ base.url | prepend: site.url }}/setting-up-python-virtual-environment/).

## TLDR

```bash
$ cd ~                      # Change to your home directory
$ mkdir tmp                 # Create a temporary directory
$ cd tmp/                   # Change to the temporary directory
$ wget "https://www.python.org/ftp/python/3.8.10/Python-3.8.10.tgz"  # Download the tarball
$ tar -zxvf Python-3.8.10.tgz  # Extract the Python source code
$ rm Python-3.8.10.tgz      # Remove the Python source code archive
$ cd Python-3.8.10/         # Change to the Python source code directory
$ ./configure --prefix=$HOME/opt/python-3.8.10  # Configure the Python source code
$ make                      # Compile the Python source code
$ make install              # Install the Python source code
$ echo 'export PATH="$HOME/opt/python-3.8.10/bin:$PATH"' >> ~/.bashrc  # Add the Python path to your ~/.bashrc file
$ source ~/.bashrc          # Load the changes to your ~/.bashrc file
$ which python3             # Check which Python version is being used
$ python3 --version         # Check the Python version
$ cd ~                      # Change to your home directory
$ rm -rf tmp/               # Remove the temporary directory
```


## Conclusion

That's it! You've successfully installed a custom Python version on your server or any other Linux-based machine.

**Happy Coding!**