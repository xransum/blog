---
title: "Setting Up an Isolated Python Installation"
categories:
  - Programming
---

Python is a popular programming language that is used for a variety of applications. It is known for its simplicity, versatility, and ease of use. Python is also a great language for beginners to learn, as it is easy to read and understand.

Python is available on most, if not all, Shared, VPS, and Dedicated Servers. However, some of these servers may be installed as the root user, which can cause issues when installing Python packages. To avoid these issues, you can install Python locally under your Shell user.

So this post will walk you through the steps of setting up an isolated Python installation on your server or any other Linux-based machine.

## Installation

First, you'll need to determine what version of Python you want to install. Personally, I'd recommend the most stable version of Python 3 (3.9.5 at the time of writing this post). You can check the latest version of Python on the [Python website](https://www.python.org/downloads/).

You can use either of the below methods to install Python locally under your Shell user:

- [Installation](#installation)
  - [Automated Installation](#automated-installation)
  - [Manual Installation](#manual-installation)
- [Usage](#usage)
- [Conclusion](#conclusion)

### Automated Installation

I've made a script that will automatically install any given Python version locally under your Shell user. You can use this script to install Python 3.9.5 by running the following command:

```bash
$ bash <(curl -skL https://raw.githubusercontent.com/xransum/pydev/main/pyinstall.sh) --list
```

Once you've determined what version of Python you want to install, you can run the following command to install it locally under your Shell user:

```bash
$ bash <(curl -skL https://raw.githubusercontent.com/xransum/pydev/main/pyinstall.sh) 3.9.5
```

You can also specify a custom installation directory by using the `-d` flag:

```bash
$ bash <(curl -skL https://raw.githubusercontent.com/xransum/pydev/main/pyinstall.sh) 3.9.5 -d ./opt/python
```


```bash
$ bash <(curl -skL https://raw.githubusercontent.com/xransum/pydev/main/pyinstall.sh) 3.9.1 -d ./opt/python
```

### Manual Installation

```bash
$ cd ~
$ mkdir tmp
$ cd tmp
$ wget "https://www.python.org/ftp/python/3.9.5/Python-3.9.5.tgz"
$ tar -xzf tmp/Python-3.9.5.tgz
$ rm Python-3.9.5.tgz
$ cd Python-3.9.5/
$ ./configure --prefix="$HOME/opt/python-3.9.5" --enable-optimizations
$ make
$ make install
$ cd ~
```

## Usage

Once you've installed Python locally under your Shell user, you can use it by running the following command:

```bash
$ ~/opt/python-3.9.5/bin/python3
```

You can also add the following alias to your `.bashrc` file to make it easier to use:

```bash
$ echo "export PATH=\$HOME/opt/python-3.9.5/bin:\$PATH" >> ~/.bashrc
$ source ~/.bashrc
```

Now you can use Python by running the following command:

```bash
$ python3
```

## Conclusion

In conclusion, installing Python locally under your Shell user can help you avoid issues when installing Python packages. This post has walked you through the steps of setting up an isolated Python installation on your server or any other Linux-based machine. I hope this post has been helpful and informative. If you have any questions or comments, please leave them below.

Happy hacking!
