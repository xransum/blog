---
title: Introduction to Python
author: xransum
date: 2025-12-23 10:00:00 -0500
categories:
  - Tutorial
tags:
  - learning
  - python
pin: false
image:
  path: /commons/python-code-logo.png
  lqip: null
  alt: null
---

## What's the Purpose of This?

I frequently encounter individuals interested in programming but uncertain about where to begin. Python is my default recommendation due to its simplicity and versatility.

## Why Python?

Python is an accessible language due to its readable syntax and reduced emphasis on low-level concerns when compared to languages such as C, C++, or Java. This makes it approachable for beginners while still remaining expressive and productive.

Despite its accessibility, Python is not a limited or niche language. It is widely adopted across web development, data engineering, automation, data science, and machine learning. Its ecosystem and maturity make it suitable for both small scripts and large-scale systems.

Python is currently one of the most widely adopted languages in production environments, ranking #2 in [Stack Share](https://stackshare.io/python) integrations, with over 260,000 services reporting its use.

## Your First Python Program, "Hello, World!"

There is a long tradition in programming tutorials to start with the simplest of programs that outputs "Hello, World!" to the screen. This program serves as a gentle introduction to the syntax and structure of a programming language.

The `print()` function in Python is used to display output to the console. For simplicity, anything you put between the parentheses and prints it to the screen.

For the start of these tutorials, we're just going to run the code from the browser. Later down the line, we will learn how to download and setup Python locally on your machine.

> Anytime you want to write or test Python code, you can use the [Python Playground](https://crumb.sh/F65R4QZRHmo) provided below. Whenever you type code into the field and press the **Play Button**, the code will be executed and the output will be displayed right within the editor.
{: .prompt-info }

{% include embed/python-training/crumbs/python-playground.html id='python-playground' %}

If you are ever interested, you can check out the [Hello World Collection](https://helloworldcollection.de/) which showcases how to write this simple program in over 1,000 different programming languages.

## How to Install Python

### Windows

#### Using Official Installer

You can navigate to the official Python website and download the installer for Windows at [Python downloads page](https://www.python.org/downloads/). Once you have opened the page, find the text that says **Or get the standalone installer for Python 3.X.X** and click the **Python 3.X.X** link.

After you've clicked the link it will download the installer for your system. Launch the downloaded executable file to start the installation process.

> ![Python Windows Installer - Including Path](/commons/python-tutorials/python-installer-path-highlight.png){:.w-25 .right}
> **IMPORTANT NOTE** - <br />
> At the start of the installation process, make sure you check the box that says **"Add python.exe to PATH"**, as this will allow you to run Python from the command line.
> 
> View the screenshot on the right for reference.
{: .prompt-danger }

Follow the prompts in the installer to complete the installation. You can generally keep the default settings unless you have specific requirements.

#### Video Tutorial

{% include embed/python-training/how-to-install-python-3-on-windows.html id='how-to-install-python-3-on-windows' %}


### MacOS

#### Using Homebrew

On macOS, Python 2.x is pre-installed, but it's recommended to install the latest version of Python 3.x.

If you don't know or have Homebrew installed, you can install it by following the installation instructions on the [Homebrew website](https://brew.sh/). Once you have Homebrew installed, you can install Python by opening the Terminal application and running the following command:

```bash
brew install python
```

> If you run into an issue `command not found, you'll need to add Python to your PATH.`, you can do so by adding the following line to your shell configuration file (e.g., `~/.bash_profile`, `~/.zshrc`, etc.):
> 
> ```bash
> export PATH="/usr/local/opt/python/libexec/bin:$PATH"
> ```
>
> After adding the line, make sure to restart your terminal or run `source ~/.zshrc` (or the appropriate file for your shell) to apply the changes.
{: .prompt-warning }

#### Using the Official Installer

You can also download the official Python installer for macOS from the [Python downloads page](https://www.python.org/downloads/). Look for the macOS installer and download the latest version.

#### Video Tutorial

{% include embed/python-training/how-to-install-python-3-on-macos.html id='how-to-install-python-3-on-macos' %}

### Linux

#### Using Package Manager

Most Linux distributions come with Python pre-installed. However, if you need to install or upgrade Python, you can use your distribution's package manager.

For Debian-based distributions (like Ubuntu), you can use the following commands:

```bash
sudo apt update
sudo apt install python3
```

For Red Hat-based distributions (like Fedora), you can use:

```bash
sudo dnf install python3
```

## Conclusion

You should have a very basic understanding about Python and how to install it on your machine. The next will be a rundown of all the basics of Python programming language.
